import { NextResponse } from "next/server";
import { addUser, type AccountType } from "@/lib/auth-store";

type RegisterBody = {
  username?: string;
  email?: string;
  type?: AccountType;
  password?: string;
};

export async function POST(request: Request) {
  const adminSession = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("admin_session="));

  if (!adminSession) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as RegisterBody | null;

  const username = body?.username?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const type = body?.type;
  const password = body?.password?.trim() ?? "";

  if (!username || !email || !type || !password) {
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

  let created: Awaited<ReturnType<typeof addUser>>;

  try {
    created = await addUser({ username, email, type, password });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error.";
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? `Supabase error: ${message}`
            : "Registration is temporarily unavailable.",
      },
      { status: 500 }
    );
  }

  if (!created.ok) {
    return NextResponse.json({ ok: false, error: created.error }, { status: 409 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      username: created.user.username,
      email: created.user.email,
      type: created.user.type,
    },
  });
}
