import { getArticlesByTypePaged, getArticleCountByType } from "../../../lib/db";
import { HEADER_HTML, FOOTER_HTML } from "../../../lib/templates";
import { getTypeSeo } from "../../../lib/type-seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const seo = getTypeSeo(type);

  try {
    const articles = await getArticlesByTypePaged(type, 1);
    const total = await getArticleCountByType(type);
    const totalPages = Math.ceil(total / 20);

    const header = HEADER_HTML
      .replace(/{{TITLE}}/g, seo.title)
      .replace(/{{DESCRIPTION}}/g, seo.description)
      .replace(/{{CANONICAL}}/g, `https://nameversehub.com/${type}`)
      .replace(/{{OG_IMAGE}}/g, "");

    let articlesHtml = "";
    if (articles.length === 0) {
      articlesHtml = '<div style="text-align:center;padding:64px 24px;color:var(--text-light)"><h2>Coming Soon</h2><p>Articles in this category are being prepared. Check back soon!</p></div>';
    } else {
      articlesHtml = '<div class="article-grid">';
      for (const a of articles) {
        const coverImg = a.cover_img ? `<img src="${a.cover_img}" alt="${a.title}" loading="lazy">` : "";
        const excerpt = a.summary ? a.summary.substring(0, 120) + "..." : "";
        articlesHtml += `<a href="/${type}/${a.short_title}" class="article-card">
          ${coverImg}
          <div class="card-body">
            <h2>${a.title}</h2>
            <p>${excerpt}</p>
            <div class="card-meta"><span>${a.author || ""}</span><span>${a.modified_time ? new Date(a.modified_time).toLocaleDateString() : ""}</span></div>
          </div>
        </a>`;
      }
      articlesHtml += "</div>";

      // Pagination
      if (totalPages > 1) {
        articlesHtml += '<div class="pagination">';
        articlesHtml += '<span class="active">1</span>';
        for (let i = 2; i <= Math.min(totalPages, 5); i++) {
          articlesHtml += `<a href="/${type}/page/${i}">${i}</a>`;
        }
        if (totalPages > 5) articlesHtml += `<a href="/${type}/page/2">&rarr;</a>`;
        articlesHtml += "</div>";
      }
    }

    const html = header + `
      <div class="container">
        <div class="breadcrumb"><a href="/">Home</a><span class="sep">/</span>${seo.label}</div>
        <div class="category-header">
          <h1>${seo.label}</h1>
          <p>${seo.description}</p>
        </div>
        ${articlesHtml}
      </div>
    ` + FOOTER_HTML;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
