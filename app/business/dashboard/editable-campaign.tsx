"use client";

import { useState, useEffect } from "react";

type Campaign = {
  id?: string;
  name: string;
  content_type: string;
  description: string;
  price: number;
} | null;

const CONTENT_TYPES = [
  "TikTok UGC",
  "Instagram Reels",
  "YouTube Shorts",
  "TikTok + Instagram",
  "Instagram Story",
  "YouTube Long-form",
  "TikTok Review",
  "UGC Product Reel",
] as const;

export function EditableCampaign() {
  const [campaign, setCampaign] = useState<Campaign>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [editName, setEditName] = useState("");
  const [editContentType, setEditContentType] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState(0);

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      if (data) {
        setCampaign(data);
        setEditName(data.name);
        setEditContentType(data.content_type);
        setEditDescription(data.description);
        setEditPrice(data.price || 0);
      } else {
        setCampaign({
          name: "This is your campaign. Click the edit button to customize it.",
          content_type: "TikTok UGC",
          description: "Basically a description of your campaign.",
          price: 0,
        });
        setEditName("This is your campaign. Click the edit button to customize it.");
        setEditContentType("TikTok UGC");
        setEditDescription("Basically a description of your campaign.");
        setEditPrice(0);
      }
    } catch (error) {
      console.error("Failed to fetch campaign:", error);
      setCampaign({
        name: "This is your campaign. Click the edit button to customize it.",
        content_type: "TikTok UGC",
        description: "Basically a description of your campaign.",
        price: 0,
      });
      setEditName("This is your campaign. Click the edit button to customize it.");
      setEditContentType("TikTok UGC");
      setEditDescription("Basically a description of your campaign.");
      setEditPrice(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name: editName,
        content_type: editContentType,
        description: editDescription,
        price: editPrice,
      };

      let response;
      if (campaign?.id) {
        response = await fetch("/api/campaigns", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: campaign.id, ...payload }),
        });
      } else {
        response = await fetch("/api/campaigns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      setCampaign(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save campaign:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (campaign) {
      setEditName(campaign.name);
      setEditContentType(campaign.content_type);
      setEditDescription(campaign.description);
      setEditPrice(campaign.price);
    }
    setIsEditing(false);
  };

  const handleSendCampaign = async () => {
    if (!campaign) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/campaigns/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: campaign.id,
          name: campaign.name,
          content_type: campaign.content_type,
          description: campaign.description,
          price: campaign.price,
        }),
      });

      if (response.ok) {
        alert("Campaign sent to creators!");
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

  if (isLoading) {
    return (
      <article className="rounded-2xl border border-white/10 bg-brand-dark/65 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-1/2 rounded bg-white/10" />
          <div className="h-4 w-3/4 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-brand-dark/65 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-light/70">Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-brand-dark/50 px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-light/70">Type of content</label>
            <select
              value={editContentType}
              onChange={(e) => setEditContentType(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-brand-dark/50 px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
            >
              <option value="">Select content type</option>
              {CONTENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-light/70">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-white/20 bg-brand-dark/50 px-3 py-2 text-white focus:border-brand-cyan focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-light/70">Price (Rp)</label>
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
              min="0"
              step="1000"
              className="w-full rounded-lg border border-white/20 bg-brand-dark/50 px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-brand-cyan px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-cyan/90 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-brand-light transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-lg font-semibold text-white">Name: {campaign?.name}</p>
              <p className="mt-2 text-brand-light/75">Type of content: {campaign?.content_type}</p>
              <p className="mt-2 text-brand-light/65">Description: {campaign?.description}</p>
              <p className="mt-2 text-brand-light/65">Price: Rp {campaign?.price?.toLocaleString("id-ID") || 0}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSendCampaign}
                disabled={isSending || !campaign?.id}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan transition-colors hover:bg-brand-cyan/20 disabled:opacity-50"
                aria-label="Send campaign"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-brand-light/70 transition-colors hover:bg-white/10 hover:text-brand-light"
                aria-label="Edit campaign"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
