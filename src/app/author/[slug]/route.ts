import { getAuthorBySlug, getAllAuthors, getAuthorArticles } from "../../../../lib/db";
import { HEADER_HTML, FOOTER_HTML } from "../../../../lib/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    // Team page
    if (slug === "team") {
      const authors = await getAllAuthors();
      const header = HEADER_HTML
        .replace(/{{TITLE}}/g, "Our Team | NameverseHub")
        .replace(/{{DESCRIPTION}}/g, "Meet the NameverseHub editorial team.")
        .replace(/{{CANONICAL}}/g, "https://nameversehub.com/author/team")
        .replace(/{{OG_IMAGE}}/g, "");

      let gridHtml = '<div class="container" style="padding:48px 24px"><h1 style="font-family:Playfair Display,serif;font-size:36px;color:var(--navy);text-align:center;margin-bottom:32px">Our Team</h1><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:24px">';
      for (const a of authors) {
        gridHtml += `<a href="/author/${a.slug}" style="background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;text-decoration:none">
          ${a.img ? `<img src="${a.img}" alt="${a.name}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:12px">` : '<div style="width:80px;height:80px;border-radius:50%;background:var(--cream);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:32px;color:var(--gold)">' + (a.name?.[0] || "?") + '</div>'}
          <h3 style="font-size:16px;color:var(--navy);margin-bottom:4px">${a.name}</h3>
          <p style="font-size:13px;color:var(--text-light)">${a.description ? a.description.substring(0, 80) + "..." : ""}</p>
        </a>`;
      }
      gridHtml += "</div></div>";

      return new Response(header + gridHtml + FOOTER_HTML, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
      });
    }

    // Individual author page
    const author = await getAuthorBySlug(slug);
    if (!author) {
      return new Response("Not Found", { status: 404 });
    }

    const articles = await getAuthorArticles(author.name, 20);
    const header = HEADER_HTML
      .replace(/{{TITLE}}/g, `${author.name} - Author | NameverseHub`)
      .replace(/{{DESCRIPTION}}/g, author.description ? author.description.substring(0, 160) : `Articles by ${author.name}`)
      .replace(/{{CANONICAL}}/g, `https://nameversehub.com/author/${slug}`)
      .replace(/{{OG_IMAGE}}/g, author.img || "");

    let authorHtml = `<div class="container" style="padding:48px 24px">
      <div style="display:flex;align-items:center;gap:24px;margin-bottom:48px">
        ${author.img ? `<img src="${author.img}" alt="${author.name}" style="width:100px;height:100px;border-radius:50%;object-fit:cover">` : ""}
        <div>
          <h1 style="font-family:Playfair Display,serif;font-size:32px;color:var(--navy)">${author.name}</h1>
          <p style="font-size:15px;color:var(--text-light);margin-top:8px">${author.description || ""}</p>
        </div>
      </div>`;

    if (articles.length > 0) {
      authorHtml += '<div class="article-grid">';
      for (const a of articles) {
        const coverImg = a.cover_img ? `<img src="${a.cover_img}" alt="${a.title}" loading="lazy">` : "";
        authorHtml += `<a href="/${a.type}/${a.short_title}" class="article-card">
          ${coverImg}
          <div class="card-body"><h2>${a.title}</h2></div>
        </a>`;
      }
      authorHtml += "</div>";
    } else {
      authorHtml += '<p style="color:var(--text-light)">No articles published yet.</p>';
    }
    authorHtml += "</div>";

    return new Response(header + authorHtml + FOOTER_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
    });
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
