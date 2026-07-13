import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // www -> bare domain redirect
  if (host.startsWith("www.")) {
    url.hostname = host.replace(/^www\./, "");
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // ?page=N -> /page/N redirect
  const page = url.searchParams.get("page");
  if (page && /^\d+$/.test(page)) {
    const pathname = url.pathname;
    url.searchParams.delete("page");
    const newPath = pathname.endsWith("/") ? pathname + "page/" + page : pathname + "/page/" + page;
    url.pathname = newPath;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|icon.png|robots.txt|sitemap.xml).*)"],
};
