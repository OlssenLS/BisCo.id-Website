"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type LoginResponse = {
  ok: boolean;
  error?: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [securityCode, setSecurityCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ securityCode }),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.ok) {
        setErrorMessage(data.error ?? "Login failed.");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark px-4 text-brand-light">
      <div className="pointer-events-none absolute top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-cyan/15 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-72 w-72 rounded-full bg-brand-purple/15 blur-[120px]" />

      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_18px_90px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-9">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold tracking-[0.24em] text-brand-cyan/80 uppercase">
            Restricted Area
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Admin Access</h1>
          <p className="mt-2 text-sm leading-relaxed text-brand-light/65">
            Enter your security code to unlock dashboard access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="securityCode" className="mb-2 block text-sm font-medium text-brand-light/85">
              Security Code
            </label>
            <div className="group flex items-center gap-3 rounded-2xl border border-white/12 bg-brand-dark/80 px-4 py-3 transition-all focus-within:border-brand-cyan/70 focus-within:shadow-[0_0_0_3px_rgba(0,240,255,0.15)]">
              <svg className="h-5 w-5 text-brand-light/45 transition-colors group-focus-within:text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.761 0-5 2.239-5 5h10c0-2.761-2.239-5-5-5z" />
              </svg>
              <input
                id="securityCode"
                type="password"
                autoComplete="current-password"
                required
                value={securityCode}
                onChange={(event) => setSecurityCode(event.target.value)}
                className="w-full bg-transparent text-brand-light placeholder-brand-light/30 outline-none"
                placeholder="Enter security code"
              />
            </div>
          </div>

          {errorMessage ? (
            <p className="rounded-xl border border-brand-pink/40 bg-brand-pink/12 px-3.5 py-2.5 text-sm text-brand-pink">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-purple py-3.5 font-semibold text-brand-dark shadow-[0_10px_40px_rgba(0,240,255,0.25)] transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading ? (
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            ) : null}
          </button>
        </form>
      </section>
    </main>
  );
}
