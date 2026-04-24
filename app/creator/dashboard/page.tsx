import { cookies } from "next/headers";

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

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button
        type="submit"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-light/70 transition-colors hover:bg-white/10 hover:text-brand-light"
        aria-label="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      </button>
    </form>
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
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-brand-cyan/30 bg-brand-surface/70 p-5">
            <p className="text-sm text-brand-light/70">Active Commissions</p>
            <p className="mt-2 text-3xl font-bold text-brand-cyan">4</p>
          </article>
          <article className="rounded-2xl border border-brand-purple/30 bg-brand-surface/70 p-5">
            <p className="text-sm text-brand-light/70">Awaiting Approval</p>
            <p className="mt-2 text-3xl font-bold text-brand-purple">2</p>
          </article>
          <article className="rounded-2xl border border-green-500 bg-brand-surface/70 p-5">
            <p className="text-sm text-brand-light/70">Pending Payout</p>
            <p className="mt-2 text-3xl font-bold text-green-500">Rp 3.250.000</p>
          </article>
        </div>

        <section className="rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <h2 className="text-xl font-semibold">Current Commission Queue</h2>
          <div className="mt-4 space-y-3">
            {[
              {
                brand: "LocalBite",
                task: "1x TikTok Review + 1x Story",
                due: "Due in 2 days",
                status: "In Progress",
              },
              {
                brand: "KopiKenangan",
                task: "UGC Product Reel",
                due: "Due in 4 days",
                status: "Script Review",
              },
              {
                brand: "Majoo",
                task: "YouTube Shorts Mention",
                due: "Due in 6 days",
                status: "Ready to Submit",
              },
            ].map((item) => (
              <article
                key={item.brand}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-brand-dark/70 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{item.brand}</p>
                  <p className="text-sm text-brand-light/70">{item.task}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-brand-light/70">{item.due}</p>
                  <p className="text-sm font-semibold text-brand-cyan">{item.status}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
