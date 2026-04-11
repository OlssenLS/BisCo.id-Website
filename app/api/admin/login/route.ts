import { NextResponse } from "next/server";

type LoginBody = {
  securityCode?: string;
};

export async function POST(request: Request) {
  const expectedSecurityCode = process.env.ADMIN_SECURITY_CODE?.trim();

  if (!expectedSecurityCode) {
    return NextResponse.json(
      { ok: false, error: "Server is not configured." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as LoginBody | null;
  const providedSecurityCode = body?.securityCode?.trim();

  if (!providedSecurityCode) {
    return NextResponse.json(
      { ok: false, error: "Security code is required." },
      { status: 400 }
    );
  }

  if (providedSecurityCode !== expectedSecurityCode) {
    return NextResponse.json(
      { ok: false, error: "Invalid security code." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: "admin_session",
    value: "authenticated",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
