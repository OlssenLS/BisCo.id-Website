"use client";

import { useState, useEffect } from "react";

type Invitation = {
  id: string;
  business_username: string;
  name: string;
  content_type: string;
  description: string;
  price: number;
  created_at: string;
};

type InvitationModalProps = {
  invitation: Invitation;
  onClose: () => void;
  onRespond: (id: string, action: "accept" | "dismiss") => void;
};

function InvitationModal({ invitation, onClose, onRespond }: InvitationModalProps) {
  const [isResponding, setIsResponding] = useState(false);

  const handleAccept = async () => {
    setIsResponding(true);
    await onRespond(invitation.id, "accept");
    setIsResponding(false);
  };

  const handleDismiss = async () => {
    setIsResponding(true);
    await onRespond(invitation.id, "dismiss");
    setIsResponding(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-brand-surface/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Campaign Invitation</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-brand-light/70 transition-colors hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-sm text-brand-light/70">From</p>
          <p className="font-medium text-brand-cyan">{invitation.business_username}</p>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-sm text-brand-light/70">Campaign Name</p>
          <p className="font-medium">{invitation.name}</p>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-sm text-brand-light/70">Content Type</p>
          <p className="font-medium">{invitation.content_type}</p>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-sm text-brand-light/70">Price</p>
          <p className="font-semibold text-green-500">Rp {invitation.price?.toLocaleString("id-ID") || 0}</p>
        </div>

        <div className="mb-6 space-y-2">
          <p className="text-sm text-brand-light/70">Description</p>
          <p className="text-sm text-brand-light/80">{invitation.description}</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleAccept}
            disabled={isResponding}
            className="flex-1 rounded-lg bg-brand-cyan px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-cyan/90 disabled:opacity-50"
          >
            {isResponding ? "Processing..." : "Accept"}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            disabled={isResponding}
            className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-brand-light transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            {isResponding ? "Processing..." : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Inbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchInvitations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/invitations");
      const data = await response.json();
      setInvitations(data);
      setUnreadCount(data.length);
    } catch (error) {
      console.error("Failed to fetch invitations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInvitations();
    }
  }, [isOpen]);

  const handleRespond = async (id: string, action: "accept" | "dismiss") => {
    try {
      const response = await fetch("/api/invitations/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitation_id: id, action }),
      });

      if (response.ok) {
        setInvitations((prev) => prev.filter((inv) => inv.id !== id));
        setUnreadCount((prev) => Math.max(0, prev - 1));
        setSelectedInvitation(null);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to respond");
      }
    } catch (error) {
      console.error("Failed to respond:", error);
      alert("Failed to respond");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-brand-light/70 transition-colors hover:bg-white/10"
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
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-cyan text-xs font-bold text-brand-dark">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 max-h-96 overflow-y-auto rounded-2xl border border-white/10 bg-brand-surface/95 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="sticky top-0 border-b border-white/10 bg-brand-surface/95 p-4 backdrop-blur-xl">
            <h3 className="font-semibold">Inbox</h3>
          </div>
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
              </div>
            ) : invitations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2 text-brand-light/30"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <p className="text-sm text-brand-light/50">No invitations</p>
              </div>
            ) : (
              invitations.map((invitation) => (
                <button
                  key={invitation.id}
                  type="button"
                  onClick={() => setSelectedInvitation(invitation)}
                  className="w-full rounded-xl border border-white/10 bg-brand-dark/50 p-3 text-left transition-colors hover:border-brand-cyan/50 hover:bg-brand-dark/70"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{invitation.name}</p>
                      <p className="mt-1 text-xs text-brand-light/70">
                        From {invitation.business_username}
                      </p>
                      <p className="mt-1 text-xs text-brand-cyan">{invitation.content_type}</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-brand-cyan" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {selectedInvitation && (
        <InvitationModal
          invitation={selectedInvitation}
          onClose={() => setSelectedInvitation(null)}
          onRespond={handleRespond}
        />
      )}
    </>
  );
}
