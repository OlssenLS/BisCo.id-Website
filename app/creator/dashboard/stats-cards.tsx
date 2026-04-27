"use client";

import { useState, useEffect } from "react";

type Stats = {
  activeCommissions: number;
  completedCommissions: number;
  pendingPayout: number;
};

export function StatsCards() {
  const [stats, setStats] = useState<Stats>({
    activeCommissions: 0,
    completedCommissions: 0,
    pendingPayout: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/commissions/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <article className="rounded-2xl border border-brand-cyan/30 bg-brand-surface/70 p-5">
        <p className="text-sm text-brand-light/70">Active Commissions</p>
        <p className="mt-2 text-3xl font-bold text-brand-cyan">
          {isLoading ? "..." : stats.activeCommissions}
        </p>
      </article>
      <article className="rounded-2xl border border-green-500/30 bg-brand-surface/70 p-5">
        <p className="text-sm text-brand-light/70">Completed</p>
        <p className="mt-2 text-3xl font-bold text-green-500">
          {isLoading ? "..." : stats.completedCommissions}
        </p>
      </article>
      <article className="rounded-2xl border border-yellow-500/30 bg-brand-surface/70 p-5">
        <p className="text-sm text-brand-light/70">Pending Payout</p>
        <p className="mt-2 text-3xl font-bold text-yellow-500">
          {isLoading ? "..." : `Rp ${stats.pendingPayout.toLocaleString("id-ID")}`}
        </p>
      </article>
    </div>
  );
}
