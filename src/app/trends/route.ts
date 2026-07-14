import { renderTaxonomyIndex } from "../../../lib/taxonomy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return renderTaxonomyIndex("trends", req.url);
}
