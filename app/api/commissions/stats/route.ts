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

  const creatorUsername = await getUserFromSession();
  if (!creatorUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: commissions, error } = await supabase
    .from("commissions")
    .select("*")
    .eq("creator_username", creatorUsername);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const activeCommissions = commissions?.filter(
    (c) => c.status !== "Completed" && c.status !== "Approved"
  ).length ?? 0;

  const awaitingApproval = commissions?.filter(
    (c) => c.status === "Ready to Submit" || c.status === "Awaiting Approval"
  ).length ?? 0;

  const completedCommissions = commissions?.filter(
    (c) => c.status === "Completed"
  ).length ?? 0;

  // Calculate pending payout from completed commissions
  const pendingPayout = commissions
    ?.filter((c) => c.status === "Completed")
    .reduce((sum, c) => sum + (c.price || 0), 0) ?? 0;

  return NextResponse.json({
    activeCommissions,
    awaitingApproval,
    completedCommissions,
    pendingPayout,
  });
}
