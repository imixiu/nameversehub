import { MetadataRoute } from "next";
import * as mysql from "mysql2/promise";

export const dynamic = "force-dynamic";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://nameversehub.com";
  const SITE = "nameversehub";
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/names`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/origins`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/meanings`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/trends`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  try {
    const conn = await mysql.createConnection(getConnectionConfig());
    const [rows] = await conn.query(
      "SELECT url, modified_time FROM articles WHERE site = ? AND is_online = 'Y' ORDER BY modified_time DESC",
      [SITE]
    );
    await conn.end();

    for (const row of rows as any[]) {
      if (row.url) {
        entries.push({
          url: BASE_URL + row.url,
          lastModified: row.modified_time ? new Date(row.modified_time).toISOString() : now,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch (e) {
    // If DB fails, return static entries
  }

  return entries;
}
