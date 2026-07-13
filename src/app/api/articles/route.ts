import { query, SITE } from "../../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    if (slug && type) {
      const rows = await query(
        "SELECT * FROM articles WHERE site = ? AND short_title = ? AND type = ? AND is_online = 'Y'",
        [SITE, slug, type]
      );
      return Response.json(rows[0] || null);
    }
    const offset = (page - 1) * limit;
    const rows = type
      ? await query("SELECT * FROM articles WHERE site = ? AND type = ? AND is_online = 'Y' ORDER BY modified_time DESC LIMIT ? OFFSET ?", [SITE, type, limit, offset])
      : await query("SELECT * FROM articles WHERE site = ? AND is_online = 'Y' ORDER BY modified_time DESC LIMIT ? OFFSET ?", [SITE, limit, offset]);
    return Response.json(rows);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, short_title, type, body: content, author, summary, cover_img, url, is_online } = body;
    await query(
      "INSERT IGNORE INTO articles (site, title, short_title, type, body, author, summary, cover_img, url, is_online, modified_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
      [SITE, title, short_title, type, content, author, summary, cover_img, url, is_online || "Y"]
    );
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
