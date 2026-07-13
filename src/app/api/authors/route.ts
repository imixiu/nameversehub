import { query, SITE } from "../../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM authors WHERE site = ? ORDER BY name", [SITE]);
    return Response.json(rows);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, description, img } = body;
    await query(
      "INSERT IGNORE INTO authors (site, name, slug, description, img) VALUES (?, ?, ?, ?, ?)",
      [SITE, name, slug, description, img]
    );
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
