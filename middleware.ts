import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Ignore index page
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  } else {
    NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Ignore all these below routes from middleware
    "/((?!/logout|loading.svg|icon|manifest.json|scripts|_next/static|_next/image|favicon.ico).*)",
  ],
};
