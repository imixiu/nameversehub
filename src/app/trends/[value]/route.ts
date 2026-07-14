import { renderTaxonomyValuePage } from "../../../../lib/taxonomy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ value: string }> }) {
  const { value } = await params;
  return renderTaxonomyValuePage("trends", value, 1);
}
