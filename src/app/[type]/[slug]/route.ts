import { getArticleBySlug, getRelatedArticles } from "../../../../lib/db";
import { HEADER_HTML, FOOTER_HTML } from "../../../../lib/templates";
import { getTypeSeo } from "../../../../lib/type-seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanContent(html: string): string {
  if (!html) return "";
  return html
    .replace(/<div[^>]*>/gi, "")
    .replace(/<\/div>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
}

export async function GET(_req: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;

  try {
    const article = await getArticleBySlug(slug, type);
    if (!article) {
      return new Response("Not Found", { status: 404 });
    }

    const seo = getTypeSeo(type);
    const title = article.title || slug;
    const description = article.summary ? article.summary.substring(0, 160) : seo.description;
    const canonical = `https://nameversehub.com/${type}/${slug}`;
    const ogImage = article.cover_img || "";

    const header = HEADER_HTML
      .replace(/{{TITLE}}/g, title + " | NameverseHub")
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{CANONICAL}}/g, canonical)
      .replace(/{{OG_IMAGE}}/g, ogImage);

    const coverHtml = article.cover_img ? `<div class="article-cover"><img src="${article.cover_img}" alt="${title}"></div>` : "";
    const metaHtml = `<div class="article-meta">
      ${article.author_img ? `<img src="${article.author_img}" alt="${article.author_name || ""}">` : ""}
      <div>
        <div class="author-name"><a href="/author/${article.author_slug || ""}">${article.author_name || "NameverseHub"}</a></div>
        <div>${article.modified_time ? new Date(article.modified_time).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}</div>
      </div>
    </div>`;

    const content = cleanContent(article.body || "");
    const breadcrumb = `<div class="container"><div class="breadcrumb"><a href="/">Home</a><span class="sep">/</span><a href="/${type}">${seo.label}</a><span class="sep">/</span>${title}</div></div>`;

    // Related articles
    const related = await getRelatedArticles(type, slug);
    let relatedHtml = "";
    if (related.length > 0) {
      relatedHtml = '<div class="related-section"><h2>Related Articles</h2><div class="related-grid">';
      for (const r of related) {
        relatedHtml += `<a href="/${r.type}/${r.short_title}" class="related-card"><h3>${r.title}</h3></a>`;
      }
      relatedHtml += "</div></div>";
    }

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      url: canonical,
      author: { "@type": "Person", name: article.author_name || "NameverseHub" },
      dateModified: article.modified_time,
      image: ogImage || undefined,
    };

    const html = header + breadcrumb + metaHtml + coverHtml +
      `<article class="article-content">${content}</article>` +
      relatedHtml +
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` +
      FOOTER_HTML;

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
