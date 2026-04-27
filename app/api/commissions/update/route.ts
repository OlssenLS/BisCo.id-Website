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

export async function PATCH(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const creatorUsername = await getUserFromSession();
  if (!creatorUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, progress, status } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing commission id" }, { status: 400 });
  }

  const updateData: Record<string, string | number> = {
    updated_at: new Date().toISOString(),
  };
  if (progress !== undefined) updateData.progress = progress;
  if (status !== undefined) updateData.status = status;

  const { data, error } = await supabase
    .from("commissions")
    .update(updateData)
    .eq("id", id)
    .eq("creator_username", creatorUsername)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Commission not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
