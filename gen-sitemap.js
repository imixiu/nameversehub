#!/usr/bin/env node
/**
 * Sitemap generator for nameversehub.
 * Includes: static pages + 105K article pages + taxonomy sub-pages (origins/meanings/trends).
 */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://nameversehub.com';
const SITE = 'nameversehub';
const SITEMAP_DIR = path.join(__dirname, 'public', 'sitemap');
const MAX_PER_FILE = 5000;

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSitemapXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(u.loc)}</loc>\n`;
    if (u.lastmod) xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq || 'weekly'}</changefreq>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

function buildSitemapIndexXml(files) {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const f of files) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${DOMAIN}/sitemap/${f}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  }
  xml += '</sitemapindex>\n';
  return xml;
}

// Parse MYSQL_URL (password contains @)
function getConnConfig() {
  const raw = process.env.MYSQL_URL;
  if (!raw) throw new Error('MYSQL_URL not set');
  const lastAt = raw.lastIndexOf('@');
  const protoEnd = raw.indexOf('://') + 3;
  const creds = raw.substring(protoEnd, lastAt);
  const hostDb = raw.substring(lastAt + 1);
  const colonIdx = creds.indexOf(':');
  const user = decodeURIComponent(creds.substring(0, colonIdx));
  const password = decodeURIComponent(creds.substring(colonIdx + 1));
  const slashIdx = hostDb.indexOf('/');
  const hostPort = hostDb.substring(0, slashIdx);
  const database = hostDb.substring(slashIdx + 1);
  const portColon = hostPort.lastIndexOf(':');
  const host = hostPort.substring(0, portColon);
  const port = parseInt(hostPort.substring(portColon + 1)) || 3306;
  return { host, port, user, password, database, connectTimeout: 30000 };
}

(async () => {
  const conn = await mysql.createConnection(getConnConfig());
  const today = new Date().toISOString().split('T')[0];

  // 1. Static pages
  const urls = [
    { loc: `${DOMAIN}/`, changefreq: 'daily' },
    { loc: `${DOMAIN}/about`, changefreq: 'monthly' },
    { loc: `${DOMAIN}/names`, changefreq: 'daily' },
    { loc: `${DOMAIN}/origins`, changefreq: 'weekly' },
    { loc: `${DOMAIN}/meanings`, changefreq: 'weekly' },
    { loc: `${DOMAIN}/trends`, changefreq: 'weekly' },
  ];

  // 2. Taxonomy sub-pages from tag field
  const [tagRows] = await conn.query(
    `SELECT DISTINCT
       SUBSTRING_INDEX(SUBSTRING_INDEX(t.val, ':', -1), '|', 1) AS value,
       CASE WHEN t.val LIKE 'origin:%' THEN 'origins'
            WHEN t.val LIKE 'meaning:%' THEN 'meanings'
            WHEN t.val LIKE 'trend:%' THEN 'trends'
       END AS dimension
     FROM (
       SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(tag, '|', n.n), '|', -1) AS val
       FROM articles
       JOIN (
         SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
         UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
       ) n ON n.n <= 1 + LENGTH(tag) - LENGTH(REPLACE(tag, '|', ''))
       WHERE site = ? AND is_online = 'Y'
     ) t
     WHERE t.val LIKE 'origin:%' OR t.val LIKE 'meaning:%' OR t.val LIKE 'trend:%'`,
    [SITE]
  );
  for (const row of tagRows) {
    if (row.value && row.dimension) {
      urls.push({ loc: `${DOMAIN}/${row.dimension}/${row.value}`, changefreq: 'weekly' });
    }
  }
  console.log(`Taxonomy pages: ${tagRows.length}`);

  // 3. Article pages (all type=names)
  const [articles] = await conn.query(
    "SELECT short_title, modified_time FROM articles WHERE site=? AND is_online='Y' ORDER BY modified_time DESC",
    [SITE]
  );
  for (const a of articles) {
    const lastmod = a.modified_time ? new Date(a.modified_time).toISOString().split('T')[0] : today;
    urls.push({ loc: `${DOMAIN}/names/${a.short_title}`, lastmod, changefreq: 'monthly' });
  }
  console.log(`Article pages: ${articles.length}`);
  console.log(`Total URLs: ${urls.length}`);

  // 4. Split into chunks
  if (!fs.existsSync(SITEMAP_DIR)) fs.mkdirSync(SITEMAP_DIR, { recursive: true });

  // Clean old files
  for (const f of fs.readdirSync(SITEMAP_DIR)) {
    if (f.startsWith('sitemap') && f.endsWith('.xml')) {
      fs.unlinkSync(path.join(SITEMAP_DIR, f));
    }
  }

  const chunks = [];
  for (let i = 0; i < urls.length; i += MAX_PER_FILE) {
    chunks.push(urls.slice(i, i + MAX_PER_FILE));
  }

  const sitemapFiles = [];
  for (let i = 0; i < chunks.length; i++) {
    const filename = `sitemap${i + 1}.xml`;
    fs.writeFileSync(path.join(SITEMAP_DIR, filename), buildSitemapXml(chunks[i]));
    sitemapFiles.push(filename);
    console.log(`  ${filename}: ${chunks[i].length} URLs`);
  }

  // 5. Write sitemapindex
  fs.writeFileSync(path.join(SITEMAP_DIR, 'sitemapindex.xml'), buildSitemapIndexXml(sitemapFiles));
  console.log(`\nsitemapindex.xml → ${sitemapFiles.length} sitemaps`);

  await conn.end();
  console.log('Done!');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
