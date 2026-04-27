"use client";

import { useState } from "react";

export function CampaignButton() {
  const [isSending, setIsSending] = useState(false);

  const handleSendCampaign = async () => {
    setIsSending(true);
    try {
      const response = await fetch("/api/campaigns/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Campaign sent to creators!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send campaign");
      }
    } catch (error) {
      console.error("Failed to send campaign:", error);
      alert("Failed to send campaign");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSendCampaign}
      disabled={isSending}
      className="mx-auto flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full border border-brand-cyan/40 bg-brand-dark/70 text-sm font-semibold text-brand-cyan shadow-[0_0_26px_rgba(0,240,255,0.22)] transition-all hover:scale-105 hover:border-brand-cyan/60 hover:shadow-[0_0_35px_rgba(0,240,255,0.35)] disabled:opacity-50 disabled:hover:scale-100 md:mx-0 md:h-34 md:w-34 md:text-base"
    >
      {isSending ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
          <span className="text-xs">Sending...</span>
        </>
      ) : (
        <>
          <span>Campaign</span>
          <span className="text-xs text-brand-cyan/70">Click Me!</span>
        </>
      )}
    </button>
  );
}
