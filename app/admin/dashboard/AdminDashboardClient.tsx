"use client";

import { FormEvent, useState } from "react";

type UserType = "Business" | "Content Creator";

type RegisterResponse = {
  ok: boolean;
  error?: string;
  user?: {
    username: string;
    email: string;
    type: UserType;
  };
};

export type AdminOverviewData = {
  totalUsers: number;
  businessUsers: number;
  creatorUsers: number;
  recentUsers: Array<{
    username: string;
    email: string;
    type: UserType;
    createdAt: string;
  }>;
};

type AdminOverviewResponse = {
  ok: boolean;
  error?: string;
  overview?: AdminOverviewData;
};

type AdminDashboardClientProps = {
  initialOverview: AdminOverviewData | null;
  initialOverviewError: string;
};

export default function AdminDashboardClient({
  initialOverview,
  initialOverviewError,
}: AdminDashboardClientProps) {
  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("Business");
  const [password, setPassword] = useState("");

  // UI state
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOverviewLoading, setIsOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState(initialOverviewError);
  const [overview, setOverview] = useState<AdminOverviewData | null>(initialOverview);

  // Refresh dashboard stats
  async function loadOverview() {
    setOverviewError("");
    setIsOverviewLoading(true);

    try {
      const response = await fetch("/api/admin/users/overview", {
        method: "GET",
      });

      const data = (await response.json()) as AdminOverviewResponse;

      if (!response.ok || !data.ok || !data.overview) {
        setOverviewError(data.error ?? "Failed to load dashboard data.");
        return;
      }

      setOverview(data.overview);
    } catch {
      setOverviewError("Unable to load dashboard data.");
    } finally {
      setIsOverviewLoading(false);
    }
  }

  // Submit manual registration
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          type: userType,
          password,
        }),
      });

      const data = (await response.json()) as RegisterResponse;

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Failed to register user.");
        return;
      }

      setNotice(`User ${data.user?.username ?? username} registered as ${userType}.`);
      setUsername("");
      setEmail("");
      setUserType("Business");
      setPassword("");
      await loadOverview();
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-brand-dark px-4 py-8 text-brand-light md:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-10 right-0 h-80 w-80 rounded-full bg-brand-purple/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-cyan/15 blur-[140px]" />

      {/* Sidebar + main content */}
      <section className="relative grid min-h-[calc(100vh-4rem)] w-full gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-3xl border border-white/10 bg-brand-surface/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-cyan/80 uppercase">Admin Panel</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">Dashboard</h1>

          <nav className="mt-6 space-y-2">
            <div className="rounded-xl border border-brand-cyan/35 bg-brand-cyan/10 px-4 py-3 text-sm font-semibold text-brand-cyan">
              Overview
            </div>
          </nav>
        </aside>

        {/* Main dashboard */}
        <div className="flex min-w-0 flex-col gap-6 xl:h-[calc(100vh-4rem)] xl:overflow-hidden">
          {/* Header */}
          <header className="rounded-3xl border border-white/10 bg-brand-surface/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8 xl:shrink-0">
            <h2 className="text-3xl font-bold tracking-tight">Admin Overview</h2>
            <p className="mt-2 text-sm text-brand-light/70">Monitor registrations and manage screened users from one place.</p>
          </header>

          {/* Stats cards */}
          <section className="grid gap-4 md:grid-cols-3 xl:shrink-0">
            <article className="rounded-2xl border border-brand-cyan/30 bg-brand-surface/70 p-5">
              <p className="text-sm text-brand-light/70">Total Registered</p>
              <p className="mt-2 text-3xl font-bold text-brand-cyan">
                {isOverviewLoading ? "..." : overview?.totalUsers ?? 0}
              </p>
            </article>
            <article className="rounded-2xl border border-brand-purple/30 bg-brand-surface/70 p-5">
              <p className="text-sm text-brand-light/70">Business Accounts</p>
              <p className="mt-2 text-3xl font-bold text-brand-purple">
                {isOverviewLoading ? "..." : overview?.businessUsers ?? 0}
              </p>
            </article>
            <article className="rounded-2xl border border-brand-pink/30 bg-brand-surface/70 p-5">
              <p className="text-sm text-brand-light/70">Creator Accounts</p>
              <p className="mt-2 text-3xl font-bold text-brand-pink">
                {isOverviewLoading ? "..." : overview?.creatorUsers ?? 0}
              </p>
            </article>
          </section>

          {/* Recent users + registration form */}
          <section className="grid gap-6 xl:grid-cols-2 xl:flex-1 xl:min-h-0 xl:items-stretch">
            {/* Recent users */}
            <article className="flex min-w-0 flex-col rounded-3xl border border-white/10 bg-brand-surface/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:h-full xl:min-h-0 xl:overflow-hidden">
              <h3 className="text-xl font-semibold">Recent Registered Users</h3>
              {overviewError ? (
                <p className="mt-4 rounded-xl border border-brand-pink/40 bg-brand-pink/10 px-3 py-2 text-sm text-brand-pink">
                  {overviewError}
                </p>
              ) : null}

              <div className="mt-4 max-h-[20rem] space-y-3 overflow-y-auto pr-2 sm:max-h-[24rem] xl:flex-1 xl:min-h-0 xl:max-h-none [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(229,229,229,0.28)_rgba(255,255,255,0.04)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[rgba(10,10,10,0.9)] [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,rgba(0,240,255,0.55),rgba(176,38,255,0.55))] [&::-webkit-scrollbar-thumb:hover]:bg-[linear-gradient(180deg,rgba(0,240,255,0.75),rgba(176,38,255,0.75))]">
                {!isOverviewLoading && (overview?.recentUsers.length ?? 0) === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-brand-dark/50 px-4 py-3 text-sm text-brand-light/70">
                    No registered users yet.
                  </p>
                ) : null}

                {(overview?.recentUsers ?? []).map((user) => (
                  <div
                    key={`${user.email}-${user.createdAt}`}
                    className="rounded-xl border border-white/10 bg-brand-dark/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 break-words font-semibold text-white">{user.username}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.type === "Business"
                            ? "bg-brand-cyan/15 text-brand-cyan"
                            : "bg-brand-purple/15 text-brand-purple"
                        }`}
                      >
                        {user.type}
                      </span>
                    </div>
                    <p className="mt-1 break-words text-sm text-brand-light/70">{user.email}</p>
                    <p className="mt-1 text-xs text-brand-light/50">
                      {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Manual registration */}
            <article className="flex min-w-0 flex-col rounded-3xl border border-white/10 bg-brand-surface/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:h-full xl:min-h-0 xl:overflow-hidden">
              <h3 className="text-xl font-semibold">Manual Registration</h3>
              <p className="mt-2 text-sm text-brand-light/70">For approved candidates only.</p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col xl:flex-1 xl:min-h-0">
                <div className="space-y-2">
                  <div>
                    <label htmlFor="username" className="mb-2 block text-sm font-medium text-brand-light/85">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      required
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-brand-dark/80 px-4 py-3 text-brand-light placeholder-brand-light/30 transition-colors focus:border-brand-cyan focus:outline-none"
                      placeholder="Input username"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-brand-light/85">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-brand-dark/80 px-4 py-3 text-brand-light placeholder-brand-light/30 transition-colors focus:border-brand-cyan focus:outline-none"
                      placeholder="name@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="mb-2 block text-sm font-medium text-brand-light/85">
                      Type
                    </label>
                    <div className="relative">
                      <select
                        id="type"
                        value={userType}
                        onChange={(event) => setUserType(event.target.value as UserType)}
                        className="w-full appearance-none rounded-xl border border-white/12 bg-brand-dark/80 px-4 py-3 text-brand-light transition-colors focus:border-brand-cyan focus:outline-none"
                      >
                        <option value="Business">Business</option>
                        <option value="Content Creator">Content Creator</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-light/50">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-brand-light/85">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-brand-dark/80 px-4 py-3 text-brand-light placeholder-brand-light/30 transition-colors focus:border-brand-cyan focus:outline-none"
                      placeholder="Create temporary password"
                    />
                  </div>
                </div>

                <div className="mt-4 min-h-[4.75rem] xl:mt-auto xl:pt-4">
                  {notice ? (
                    <p className="rounded-xl border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-2 text-sm text-brand-cyan">
                      {notice}
                    </p>
                  ) : null}

                  {error ? (
                    <p className="rounded-xl border border-brand-pink/40 bg-brand-pink/10 px-3 py-2 text-sm text-brand-pink">
                      {error}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple py-3.5 text-base font-semibold text-brand-dark shadow-[0_10px_30px_rgba(0,240,255,0.22)] transition-all hover:brightness-110 active:scale-[0.99]"
                >
                  {isSubmitting ? "Registering..." : "Register User"}
                </button>
              </form>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
