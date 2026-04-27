import { cookies } from "next/headers";
import { LogoutButton } from "./logout-button";
import { CommissionQueue } from "./commission-queue";
import { Inbox } from "./inbox";
import { StatsCards } from "./stats-cards";

type SessionPayload = {
  username: string;
  type: "Business" | "Content Creator";
};

function parseUserSession(value?: string): SessionPayload | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf-8")) as SessionPayload;
    if (
      typeof parsed?.username === "string" &&
      (parsed?.type === "Business" || parsed?.type === "Content Creator")
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

function BlankProfile() {
  return (
    <div className="relative h-16 w-16 rounded-full border border-white/15 bg-gradient-to-b from-white/20 to-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <div className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-white/35" />
      <div className="absolute left-1/2 top-[1.7rem] h-[1.4rem] w-[2rem] -translate-x-1/2 rounded-t-[42%] rounded-b-[28%] bg-white/28" />
    </div>
  );
}

export default async function CreatorDashboardPage() {
  const session = parseUserSession((await cookies()).get("user_session")?.value);

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark px-4 py-10 text-brand-light md:px-8">
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-purple/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-cyan/15 blur-[140px]" />

      <section className="relative mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-cyan/80 uppercase">Creator Hub</p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">Commission Dashboard</h1>
              <p className="mt-2 text-brand-light/70">Track active campaigns, deliverables, and your pending payouts in one place.</p>
            </div>
            <div className="flex items-center gap-4">
              <Inbox />
              {session && (
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-brand-dark/50 p-4 backdrop-blur-sm">
                  <BlankProfile />
                  <div>
                    <p className="text-sm text-brand-light/50">Logged in as</p>
                    <p className="font-semibold text-brand-cyan">{session.username}</p>
                    <p className="text-sm text-brand-light/60">Reviewer • 15.218 followers</p>
                  </div>
                  <LogoutButton />
                </div>
              )}
            </div>
          </div>
        </header>

        <StatsCards />

        <section className="rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <h2 className="text-xl font-semibold">Current Commission Queue</h2>
          <div className="mt-4">
            <CommissionQueue />
          </div>
        </section>
      </section>
    </main>
  );
}
