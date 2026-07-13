import * as mysql from "mysql2/promise";

export const SITE = "nameversehub";
export const BASE_URL = "https://nameversehub.com";

function getConnectionConfig() {
  const url = process.env.MYSQL_URL;
  if (!url) throw new Error("MYSQL_URL is not set");
  const lastAt = url.lastIndexOf("@");
  const protocolEnd = url.indexOf("://") + 3;
  const creds = url.substring(protocolEnd, lastAt);
  const hostDb = url.substring(lastAt + 1);
  const colonIdx = creds.indexOf(":");
  const user = decodeURIComponent(creds.substring(0, colonIdx));
  const password = decodeURIComponent(creds.substring(colonIdx + 1));
  const slashIdx = hostDb.indexOf("/");
  const hostPort = hostDb.substring(0, slashIdx);
  const database = hostDb.substring(slashIdx + 1);
  const portColon = hostPort.lastIndexOf(":");
  const host = hostPort.substring(0, portColon);
  const port = parseInt(hostPort.substring(portColon + 1)) || 3306;
  return { host, port, user, password, database, connectTimeout: 10000, disableEval: true };
}

export async function query(text: string, params: unknown[] = []): Promise<any[]> {
  const conn = await mysql.createConnection(getConnectionConfig());
  try {
    const [rows] = await conn.query(text, params);
    if (Array.isArray(rows)) return rows.map((row: any) => ({ ...row }));
    return [rows];
  } finally {
    await conn.end();
  }
}

export async function getArticlesByTypePaged(type: string, page: number, pageSize: number = 20) {
  const offset = (page - 1) * pageSize;
  const rows = await query(
    "SELECT a.*, au.name as author_name, au.slug as author_slug, au.img as author_img, au.description as author_bio FROM articles a LEFT JOIN authors au ON a.author = au.name AND au.site = a.site WHERE a.site = ? AND a.type = ? AND a.is_online = 'Y' ORDER BY a.modified_time DESC LIMIT ? OFFSET ?",
    [SITE, type, pageSize, offset]
  );
  return rows;
}

export async function getArticleCountByType(type: string) {
  const rows = await query(
    "SELECT COUNT(*) as cnt FROM articles WHERE site = ? AND type = ? AND is_online = 'Y'",
    [SITE, type]
  );
  return rows[0]?.cnt || 0;
}

export async function getArticleBySlug(slug: string, type: string) {
  const rows = await query(
    "SELECT a.*, au.name as author_name, au.slug as author_slug, au.img as author_img, au.description as author_bio FROM articles a LEFT JOIN authors au ON a.author = au.name AND au.site = a.site WHERE a.site = ? AND a.short_title = ? AND a.type = ? AND a.is_online = 'Y'",
    [SITE, slug, type]
  );
  return rows[0] || null;
}

export async function getRelatedArticles(type: string, slug: string, limit: number = 4) {
  const rows = await query(
    "SELECT a.short_title, a.title, a.type, a.url, a.cover_img FROM articles a WHERE a.site = ? AND a.type = ? AND a.short_title != ? AND a.is_online = 'Y' ORDER BY RAND() LIMIT ?",
    [SITE, type, slug, limit]
  );
  return rows;
}

export async function getAuthorBySlug(slug: string) {
  const rows = await query(
    "SELECT * FROM authors WHERE site = ? AND slug = ?",
    [SITE, slug]
  );
  return rows[0] || null;
}

export async function getAllAuthors() {
  return query("SELECT * FROM authors WHERE site = ? ORDER BY name", [SITE]);
}

export async function getAuthorArticles(authorName: string, limit: number = 20) {
  return query(
    "SELECT * FROM articles WHERE site = ? AND author = ? AND is_online = 'Y' ORDER BY modified_time DESC LIMIT ?",
    [SITE, authorName, limit]
  );
}

export async function getAllTypes() {
  const rows = await query(
    "SELECT DISTINCT type FROM articles WHERE site = ? AND is_online = 'Y'",
    [SITE]
  );
  return rows.map((r: any) => r.type);
}

export async function getArticleCountsByType() {
  return query(
    "SELECT type, COUNT(*) as count FROM articles WHERE site = ? AND is_online = 'Y' GROUP BY type ORDER BY count DESC",
    [SITE]
  );
}

export async function getTotalArticleCount() {
  const rows = await query(
    "SELECT COUNT(*) as cnt FROM articles WHERE site = ? AND is_online = 'Y'",
    [SITE]
  );
  return rows[0]?.cnt || 0;
}

export async function getAllArticlesForSitemap() {
  return query(
    "SELECT url, modified_time, type FROM articles WHERE site = ? AND is_online = 'Y' ORDER BY modified_time DESC",
    [SITE]
  );
}
