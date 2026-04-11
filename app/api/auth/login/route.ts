import { NextResponse } from "next/server";
import { findUserForLogin, type AccountType } from "@/lib/auth-store";

type LoginBody = {
  identity?: string;
  password?: string;
  type?: AccountType;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LoginBody | null;

  const identity = body?.identity?.trim() ?? "";
  const password = body?.password?.trim() ?? "";
  const type = body?.type;

  if (!identity || !password || !type) {
    return NextResponse.json(
      { ok: false, error: "All fields are required." },
      { status: 400 }
    );
  }

  if (type !== "Business" && type !== "Content Creator") {
    return NextResponse.json(
      { ok: false, error: "Invalid account type." },
      { status: 400 }
    );
  }

  let user: Awaited<ReturnType<typeof findUserForLogin>>;

  try {
    user = await findUserForLogin({ identity, password, type });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error.";
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? `Supabase error: ${message}`
            : "Login is temporarily unavailable.",
      },
      { status: 500 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true, type: user.type });
  const payload = JSON.stringify({ username: user.username, type: user.type });

  response.cookies.set({
    name: "user_session",
    value: Buffer.from(payload, "utf-8").toString("base64url"),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
