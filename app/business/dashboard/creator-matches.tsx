"use client";

import { useState, useEffect } from "react";

export function CreatorMatches() {
  const [matchCount, setMatchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/business/matches");
      const data = await response.json();
      setMatchCount(data.count);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <article className="rounded-2xl border border-white/10 bg-brand-dark/65 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <p className="text-lg font-semibold text-white">Creator Matches Ready</p>
      <p className="mt-2 text-brand-light/70">
        {isLoading ? "..." : matchCount} candidate{matchCount !== 1 ? "s" : ""} filtered by niche, city, audience quality, and expected ROI.
      </p>
    </article>
  );
}
