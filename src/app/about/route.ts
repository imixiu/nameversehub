import { readFileSync } from "fs";
import { join } from "path";
import { HEADER_HTML, FOOTER_HTML } from "../../../lib/templates";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  let aboutContent = "";
  try {
    aboutContent = readFileSync(join(process.cwd(), "public/about.html"), "utf-8");
  } catch {
    aboutContent = "<h1>About</h1><p>NameverseHub - Discover the Story Behind Every Name</p>";
  }

  const header = HEADER_HTML
    .replace(/{{TITLE}}/g, "About - NameverseHub")
    .replace(/{{DESCRIPTION}}/g, "Learn about NameverseHub's mission and data sources.")
    .replace(/{{CANONICAL}}/g, "https://nameversehub.com/about")
    .replace(/{{OG_IMAGE}}/g, "");

  const html = header + '<div class="article-content">' + aboutContent.replace(/<!DOCTYPE[^>]*>|<html[^>]*>|<head>.*?<\/head>|<body[^>]*>|<\/body>|<\/html>/gs, "") + '</div>' + FOOTER_HTML;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
