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

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const creatorUsername = await getUserFromSession();
  if (!creatorUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { invitation_id, action } = body;

  if (!invitation_id || !action || (action !== "accept" && action !== "dismiss")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Get the invitation
  const { data: invitation, error: fetchError } = await supabase
    .from("campaign_invitations")
    .select("*")
    .eq("id", invitation_id)
    .eq("creator_username", creatorUsername)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!invitation) {
    return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
  }

  if (action === "dismiss") {
    // Update invitation status to dismissed
    const { error: updateError } = await supabase
      .from("campaign_invitations")
      .update({ status: "dismissed" })
      .eq("id", invitation_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  if (action === "accept") {
    // Create commission
    const { error: commissionError } = await supabase
      .from("commissions")
      .insert({
        creator_username: creatorUsername,
        business_username: invitation.business_username,
        campaign_id: invitation.campaign_id,
        brand: invitation.business_username,
        task: invitation.name,
        content_type: invitation.content_type,
        description: invitation.description,
        price: invitation.price || 0,
        status: "In Progress",
        progress: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (commissionError) {
      return NextResponse.json({ error: commissionError.message }, { status: 500 });
    }

    // Update invitation status to accepted
    const { error: updateError } = await supabase
      .from("campaign_invitations")
      .update({ status: "accepted" })
      .eq("id", invitation_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
