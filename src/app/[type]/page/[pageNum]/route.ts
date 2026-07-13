import { getArticlesByTypePaged, getArticleCountByType } from "../../../../../lib/db";
import { HEADER_HTML, FOOTER_HTML } from "../../../../../lib/templates";
import { getTypeSeo } from "../../../../../lib/type-seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ type: string; pageNum: string }> }) {
  const { type, pageNum } = await params;
  const page = parseInt(pageNum) || 1;
  const seo = getTypeSeo(type);

  try {
    const articles = await getArticlesByTypePaged(type, page);
    const total = await getArticleCountByType(type);
    const totalPages = Math.ceil(total / 20);

    if (page > totalPages && totalPages > 0) {
      return new Response("Not Found", { status: 404 });
    }

    const header = HEADER_HTML
      .replace(/{{TITLE}}/g, `${seo.label} - Page ${page} | NameverseHub`)
      .replace(/{{DESCRIPTION}}/g, `${seo.description} Page ${page}.`)
      .replace(/{{CANONICAL}}/g, `https://nameversehub.com/${type}/page/${page}`)
      .replace(/{{OG_IMAGE}}/g, "");

    let articlesHtml = '<div class="article-grid">';
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
    articlesHtml += '<div class="pagination">';
    if (page > 1) articlesHtml += `<a href="/${type}/page/${page - 1}">&larr;</a>`;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) {
      if (i === page) articlesHtml += `<span class="active">${i}</span>`;
      else articlesHtml += `<a href="/${type}/page/${i}">${i}</a>`;
    }
    if (page < totalPages) articlesHtml += `<a href="/${type}/page/${page + 1}">&rarr;</a>`;
    articlesHtml += "</div>";

    const html = header + `
      <div class="container">
        <div class="breadcrumb"><a href="/">Home</a><span class="sep">/</span><a href="/${type}">${seo.label}</a><span class="sep">/</span>Page ${page}</div>
        <div class="category-header">
          <h1>${seo.label}</h1>
          <p>Page ${page} of ${totalPages}</p>
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
