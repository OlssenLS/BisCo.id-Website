"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AccountType = "Business" | "Content Creator";
type LoginResponse = {
  ok: boolean;
  error?: string;
  type?: AccountType;
};

export default function UserLoginPage() {
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<AccountType>("Business");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identity, password, type }),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.ok || !data.type) {
        setError(data.error ?? "Unable to login.");
        return;
      }

      if (data.type === "Business") {
        router.push("/business/dashboard");
      } else {
        router.push("/creator/dashboard");
      }
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark text-brand-light">
      <div className="pointer-events-none absolute -top-12 left-1/3 h-72 w-72 rounded-full bg-brand-cyan/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-brand-purple/15 blur-[150px]" />

      <Link
        href="/"
        className="absolute top-5 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/12 bg-brand-surface/70 px-4 py-2 text-sm font-semibold text-brand-light/90 backdrop-blur-xl transition-all hover:border-brand-cyan/50 hover:text-brand-cyan sm:top-6 sm:left-6"
      >
        <span aria-hidden="true">&larr;</span>
        Back to Home
      </Link>

      <section className="relative grid min-h-screen w-full overflow-hidden border-y border-white/10 bg-brand-surface/55 backdrop-blur-xl lg:grid-cols-2 lg:border-y-0">
        <aside className="relative overflow-hidden border-b border-white/10 p-8 sm:p-10 lg:border-r lg:border-b-0 lg:p-14 xl:p-16 lg:py-20 xl:py-20">
          <div className="pointer-events-none absolute -top-16 -left-16 h-52 w-52 rounded-full bg-brand-cyan/18 blur-[90px]" />
          <div className="pointer-events-none absolute right-2 bottom-0 h-52 w-52 rounded-full bg-brand-purple/18 blur-[90px]" />

          <div className="relative space-y-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-brand-cyan/80 uppercase">
                Member Access
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                Scale your collaboration impact.
              </h1>
              <p className="mt-4 max-w-md text-brand-light/70">
                One login gateway for vetted Business partners and Content Creators.
                Manage campaign workflows faster with role-based dashboards.
              </p>
            </div>

            <div className="space-y-3">
              <article className="rounded-2xl border border-white/10 bg-brand-dark/60 p-4">
                <p className="font-semibold text-white">Business Account</p>
                <p className="mt-1 text-sm text-brand-light/70">Launch and track creator-driven campaign outcomes.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-brand-dark/60 p-4">
                <p className="font-semibold text-white">Creator Account</p>
                <p className="mt-1 text-sm text-brand-light/70">Manage commission queue, delivery status, and payouts.</p>
              </article>
            </div>
          </div>
        </aside>

        <div className="p-8 sm:p-10 lg:p-14 xl:p-16 lg:py-20 xl:py-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Login</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-light/65">
              Use your approved account credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-light/85">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType("Business")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    type === "Business"
                      ? "border-brand-cyan bg-brand-cyan/15 text-brand-cyan"
                      : "border-white/12 bg-brand-dark/70 text-brand-light/80 hover:border-brand-cyan/40"
                  }`}
                >
                  Business
                </button>
                <button
                  type="button"
                  onClick={() => setType("Content Creator")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    type === "Content Creator"
                      ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                      : "border-white/12 bg-brand-dark/70 text-brand-light/80 hover:border-brand-purple/40"
                  }`}
                >
                  Content Creator
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="identity" className="mb-2 block text-sm font-medium text-brand-light/85">
                Email or Username
              </label>
              <input
                id="identity"
                type="text"
                required
                value={identity}
                onChange={(event) => setIdentity(event.target.value)}
                className="w-full rounded-xl border border-white/12 bg-brand-dark/80 px-4 py-3 text-brand-light placeholder-brand-light/30 focus:border-brand-cyan focus:outline-none"
                placeholder="Input email or username"
              />
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
                className="w-full rounded-xl border border-white/12 bg-brand-dark/80 px-4 py-3 text-brand-light placeholder-brand-light/30 focus:border-brand-cyan focus:outline-none"
                placeholder="Input password"
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-brand-pink/40 bg-brand-pink/10 px-3 py-2 text-sm text-brand-pink">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple py-3.5 text-base font-semibold text-brand-dark shadow-[0_10px_30px_rgba(0,240,255,0.22)] transition-all hover:brightness-110 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
