import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Assuming getUrl is defined elsewhere
function getUrl(path: string): string {
  // Return full URL, e.g., process.env.NEXT_PUBLIC_SITE_URL + path
  return process.env.NEXT_PUBLIC_SITE_URL + path;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;

  const redirects = [
    {
      condition: pathname === "/" && !token,
      destination: "/auth",
    },
    {
      condition: pathname === "/auth" && token,
      destination: "/app",
    },
    {
      condition: pathname.startsWith("/app") && !token,
      destination: "/auth",
    },
  ];

  for (const redirect of redirects) {
    if (redirect.condition) {
      return NextResponse.redirect(new URL(getUrl(redirect.destination)));
    }
  }

  // Optional: Add headers or other modifications
  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "true");
  return response;
}

export const config = {
  // More explicit matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
