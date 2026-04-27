"use client";

import { useState, useEffect } from "react";

type BusinessCommission = {
  id: string;
  creator_username: string;
  brand: string;
  task: string;
  content_type: string;
  price: number;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string;
};

export function BusinessCommissions() {
  const [commissions, setCommissions] = useState<BusinessCommission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCommissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/business/commissions");
      const data = await response.json();
      setCommissions(data);
    } catch (error) {
      console.error("Failed to fetch commissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "from-green-500 to-green-400";
    if (progress >= 50) return "from-brand-cyan to-brand-purple";
    if (progress >= 25) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const getStatusColor = (status: string) => {
    if (status === "Completed") return "text-green-500";
    if (status === "Ready to Submit") return "text-yellow-500";
    return "text-brand-cyan";
  };

  return (
    <article className="rounded-2xl border border-white/10 bg-brand-dark/65 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg font-semibold text-white">Creator Progress</p>
        <button
          type="button"
          onClick={fetchCommissions}
          className="text-sm text-brand-light/50 hover:text-brand-light/70"
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
        </div>
      ) : commissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-3 text-brand-light/30"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <p className="text-sm text-brand-light/50">No commissions</p>
          <p className="text-xs text-brand-light/30">Creator progress will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {commissions.map((commission) => (
            <article
              key={commission.id}
              className={`rounded-xl border p-4 ${
                commission.status === "Completed"
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-white/10 bg-brand-dark/50"
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-brand-cyan">{commission.creator_username}</p>
                  <p className="text-sm text-brand-light/70">{commission.task}</p>
                  <p className="text-xs text-brand-light/50">{commission.content_type}</p>
                  <p className="text-sm font-semibold text-green-500">Rp {commission.price?.toLocaleString("id-ID") || 0}</p>
                </div>
                <div className="md:text-right">
                  <p className={`text-sm font-semibold ${getStatusColor(commission.status)}`}>{commission.status}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(commission.progress)} transition-all duration-300`}
                    style={{ width: `${commission.progress}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-brand-light/80 w-12 text-right">
                  {commission.progress}%
                </p>
                {commission.status === "Completed" && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  );
}
