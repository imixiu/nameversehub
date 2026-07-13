import { INDEX_HTML } from "../../lib/index-html";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  return new Response(INDEX_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
