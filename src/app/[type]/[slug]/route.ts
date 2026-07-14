import { getArticleBySlug, getRelatedArticles } from "../../../../lib/db";
import { HEADER_HTML, FOOTER_HTML } from "../../../../lib/templates";
import { getTypeSeo } from "../../../../lib/type-seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanContent(html: string): string {
  if (!html) return "";
  // Content from SmartBuy API is clean — no stripping needed
  return html;
}

const NAME_PAGE_ASSETS = `
  <link rel="stylesheet" href="/name.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
`;

const NAME_PAGE_SCRIPT = `
  <script src="/name.js"></script>
`;

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
    const ogImage = article.cover_image || "";

    const isNamePage = type === "names";

    let header = HEADER_HTML
      .replace(/{{TITLE}}/g, title + " | NameverseHub")
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{CANONICAL}}/g, canonical)
      .replace(/{{OG_IMAGE}}/g, ogImage);

    // Inject name.css + Chart.js CDN before </head> for names pages
    if (isNamePage) {
      header = header.replace("</head>", NAME_PAGE_ASSETS + "\n</head>");
    }

    const coverHtml = article.cover_image ? `<div class="article-cover"><img src="${article.cover_image}" alt="${title}"></div>` : "";
    const metaHtml = `<div class="article-meta">
      <div>
        <div class="author-name">${article.author_name || "NameverseHub"}</div>
        <div>${article.modified_time ? new Date(article.modified_time).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}</div>
      </div>
    </div>`;

    const content = cleanContent(article.body || "");
    const breadcrumb = `<div class="container"><div class="breadcrumbs"><a href="/">Home</a><span class="separator">/</span><a href="/${type}">${seo.label}</a><span class="separator">/</span>${title}</div></div>`;

    // Related articles
    const related = await getRelatedArticles(type, slug);
    let relatedHtml = "";
    if (related.length > 0) {
      if (isNamePage) {
        relatedHtml = '<div class="related-names"><h2>Related Names</h2><div class="related-grid">';
        for (const r of related) {
          relatedHtml += `<a href="/${r.type}/${r.short_title}" class="related-card"><div class="related-name">${r.title}</div></a>`;
        }
        relatedHtml += "</div></div>";
      } else {
        relatedHtml = '<div class="related-section"><h2>Related Articles</h2><div class="related-grid">';
        for (const r of related) {
          relatedHtml += `<a href="/${r.type}/${r.short_title}" class="related-card"><h3>${r.title}</h3></a>`;
        }
        relatedHtml += "</div></div>";
      }
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

    // Choose article body class based on type
    const bodyClass = isNamePage ? "name-page" : "";
    const bodyInnerClass = isNamePage ? "name-article" : "article-content";
    const bodyContentClass = isNamePage ? "name-body" : "";

    const html = header + breadcrumb +
      `<div class="${bodyClass}"><div class="${bodyInnerClass}">` +
      coverHtml +
      `<div class="${bodyContentClass}">${content}</div>` +
      relatedHtml +
      `</div></div>` +
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` +
      (isNamePage ? NAME_PAGE_SCRIPT : "") +
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
