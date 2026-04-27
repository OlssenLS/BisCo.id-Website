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

  const businessUsername = await getUserFromSession();
  if (!businessUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the business's campaign
  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .select("*")
    .eq("username", businessUsername)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (campaignError) {
    return NextResponse.json({ error: campaignError.message }, { status: 500 });
  }

  if (!campaign) {
    return NextResponse.json({ error: "No campaign found. Please create a campaign first." }, { status: 404 });
  }

  // Get all content creators
  const { data: creators, error: creatorsError } = await supabase
    .from("app_users")
    .select("username")
    .eq("type", "Content Creator");

  if (creatorsError) {
    return NextResponse.json({ error: creatorsError.message }, { status: 500 });
  }

  if (!creators || creators.length === 0) {
    return NextResponse.json({ error: "No creators found" }, { status: 404 });
  }

  // Create invitations for all creators
  const invitations = creators.map((creator) => ({
    business_username: businessUsername,
    creator_username: creator.username,
    campaign_id: campaign.id,
    name: campaign.name,
    content_type: campaign.content_type,
    description: campaign.description,
    price: campaign.price || 0,
    status: "pending",
    created_at: new Date().toISOString(),
  }));

  const { error: insertError } = await supabase
    .from("campaign_invitations")
    .insert(invitations);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: `Campaign sent to ${creators.length} creators`,
  });
}
