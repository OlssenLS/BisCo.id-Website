import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export type AccountType = "Business" | "Content Creator";

export type StoredUser = {
  username: string;
  email: string;
  type: AccountType;
  passwordHash: string;
  createdAt: string;
};

export type RecentUser = {
  username: string;
  email: string;
  type: AccountType;
  createdAt: string;
};

export type AdminOverview = {
  totalUsers: number;
  businessUsers: number;
  creatorUsers: number;
  recentUsers: RecentUser[];
};

type SupabaseUserRow = {
  username: string;
  email: string;
  type: AccountType;
  password_hash: string;
  created_at: string;
};

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

function normalizeIdentity(value: string) {
  return value.trim().toLowerCase();
}

function assertSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return supabase;
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export async function addUser(input: {
  username: string;
  email: string;
  type: AccountType;
  password: string;
}) {
  const supabaseClient = assertSupabase();

  const normalizedUsername = normalizeIdentity(input.username);
  const normalizedEmail = normalizeIdentity(input.email);

  const duplicateCheck = await supabaseClient
    .from("app_users")
    .select("username, email")
    .or(`username.eq.${normalizedUsername},email.eq.${normalizedEmail}`)
    .limit(1);

  if (duplicateCheck.error) {
    throw duplicateCheck.error;
  }

  if (duplicateCheck.data.length > 0) {
    return { ok: false as const, error: "Username or email already exists." };
  }

  const rowToInsert: SupabaseUserRow = {
    username: normalizedUsername,
    email: normalizedEmail,
    type: input.type,
    password_hash: hashPassword(input.password),
    created_at: new Date().toISOString(),
  };

  const insertResult = await supabaseClient
    .from("app_users")
    .insert(rowToInsert)
    .select("username, email, type, password_hash, created_at")
    .single();

  if (insertResult.error) {
    throw insertResult.error;
  }

  const insertedUser: StoredUser = {
    username: insertResult.data.username,
    email: insertResult.data.email,
    type: insertResult.data.type,
    passwordHash: insertResult.data.password_hash,
    createdAt: insertResult.data.created_at,
  };

  return { ok: true as const, user: insertedUser };
}

export async function findUserForLogin(input: {
  identity: string;
  type: AccountType;
  password: string;
}) {
  const supabaseClient = assertSupabase();
  const normalizedIdentity = normalizeIdentity(input.identity);
  const passwordHash = hashPassword(input.password);

  const byUsernameResult = await supabaseClient
    .from("app_users")
    .select("username, email, type, password_hash, created_at")
    .eq("username", normalizedIdentity)
    .eq("type", input.type)
    .maybeSingle();

  if (byUsernameResult.error) {
    throw byUsernameResult.error;
  }

  const byEmailResult = byUsernameResult.data
    ? { data: null, error: null }
    : await supabaseClient
        .from("app_users")
        .select("username, email, type, password_hash, created_at")
        .eq("email", normalizedIdentity)
        .eq("type", input.type)
        .maybeSingle();

  if (byEmailResult.error) {
    throw byEmailResult.error;
  }

  const row = byUsernameResult.data ?? byEmailResult.data;

  if (!row) {
    return null;
  }

  if (row.password_hash !== passwordHash) {
    return null;
  }

  const user: StoredUser = {
    username: row.username,
    email: row.email,
    type: row.type,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };

  return user;
}

export async function getAdminOverview(): Promise<AdminOverview> {
  const supabaseClient = assertSupabase();

  const [totalRes, businessRes, creatorRes, recentRes] = await Promise.all([
    supabaseClient.from("app_users").select("id", { count: "exact", head: true }),
    supabaseClient
      .from("app_users")
      .select("id", { count: "exact", head: true })
      .eq("type", "Business"),
    supabaseClient
      .from("app_users")
      .select("id", { count: "exact", head: true })
      .eq("type", "Content Creator"),
    supabaseClient
      .from("app_users")
      .select("username, email, type, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  if (totalRes.error) throw totalRes.error;
  if (businessRes.error) throw businessRes.error;
  if (creatorRes.error) throw creatorRes.error;
  if (recentRes.error) throw recentRes.error;

  const recentUsers: RecentUser[] = recentRes.data.map((row) => ({
    username: row.username,
    email: row.email,
    type: row.type,
    createdAt: row.created_at,
  }));

  return {
    totalUsers: totalRes.count ?? 0,
    businessUsers: businessRes.count ?? 0,
    creatorUsers: creatorRes.count ?? 0,
    recentUsers,
  };
}
