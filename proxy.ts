import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type SessionPayload = {
  username: string;
  type: "Business" | "Content Creator";
};

function parseUserSession(value?: string): SessionPayload | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf-8")) as SessionPayload;
    if (
      typeof parsed?.username === "string" &&
      (parsed?.type === "Business" || parsed?.type === "Content Creator")
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session")?.value;

    if (!adminSession) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/business") || pathname.startsWith("/creator")) {
    const session = parseUserSession(request.cookies.get("user_session")?.value);

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/business") && session.type !== "Business") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/creator") && session.type !== "Content Creator") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/business/:path*", "/creator/:path*"],
};
