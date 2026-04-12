import { NextResponse } from "next/server";
import { getAdminOverview } from "@/lib/auth-store";

function hasAdminSessionCookie(rawCookie: string | null) {
  return (
    rawCookie
      ?.split(";")
      .map((part) => part.trim())
      .some((part) => part.startsWith("admin_session=")) ?? false
  );
}

export async function GET(request: Request) {
  if (!hasAdminSessionCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const overview = await getAdminOverview();
    return NextResponse.json({ ok: true, overview });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error.";
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? `Supabase error: ${message}`
            : "Unable to load admin overview.",
      },
      { status: 500 }
    );
  }
}
