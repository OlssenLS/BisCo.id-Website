import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

async function getUserFromSession() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("user_session");
  if (!sessionCookie) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(sessionCookie.value, "base64url").toString("utf-8")
    );
    return payload.username as string;
  } catch {
    return null;
  }
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const businessUsername = await getUserFromSession();
  if (!businessUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Count unique creators who accepted campaigns from this business
  const { data, error } = await supabase
    .from("commissions")
    .select("creator_username")
    .eq("business_username", businessUsername);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Count unique creators
  const uniqueCreators = new Set(data?.map((c) => c.creator_username) ?? []);

  return NextResponse.json({
    count: uniqueCreators.size,
  });
}
