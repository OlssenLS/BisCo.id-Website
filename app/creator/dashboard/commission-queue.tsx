"use client";

import { useState, useEffect } from "react";

type CommissionItem = {
  id: string;
  brand: string;
  task: string;
  content_type: string;
  description: string;
  price: number;
  status: string;
  progress: number;
  created_at: string;
};

type CommissionModalProps = {
  item: CommissionItem;
  onClose: () => void;
  onUpdateProgress: (id: string, progress: number, status: string) => void;
};

function CommissionModal({ item, onClose, onUpdateProgress }: CommissionModalProps) {
  const [progress, setProgress] = useState(item.progress);
  const [status, setStatus] = useState(item.status);

  const handleSave = () => {
    onUpdateProgress(item.id, progress, status);
    onClose();
  };

  const handleFinish = () => {
    onUpdateProgress(item.id, 100, "Completed");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-brand-surface/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{item.brand}</h3>
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
          <p className="text-sm text-brand-light/70">Task</p>
          <p className="font-medium">{item.task}</p>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-sm text-brand-light/70">Content Type</p>
          <p className="font-medium">{item.content_type}</p>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-sm text-brand-light/70">Price</p>
          <p className="font-semibold text-green-500">Rp {item.price?.toLocaleString("id-ID") || 0}</p>
        </div>

        <div className="mb-4 space-y-2">
          <label className="text-sm text-brand-light/70">Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-brand-dark/50 px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-brand-light/70">Progress</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-brand-cyan">{progress}%</p>
              {progress === 100 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
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
          </div>
          <div className="h-2 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full accent-brand-cyan"
          />
        </div>

        <div className="flex gap-3">
          {progress === 100 ? (
            <button
              type="button"
              onClick={handleFinish}
              className="flex-1 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              Finish & Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-lg bg-brand-cyan px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-cyan/90"
            >
              Update Progress
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-brand-light transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

type CommissionQueueProps = {
  items?: CommissionItem[];
};

export function CommissionQueue({ items: initialItems }: CommissionQueueProps) {
  const [items, setItems] = useState<CommissionItem[]>(initialItems ?? []);
  const [selectedItem, setSelectedItem] = useState<CommissionItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/commissions");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch commissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialItems === undefined) {
      fetchCommissions();
    }
  }, [initialItems]);

  const handleUpdateProgress = async (id: string, progress: number, status: string) => {
    try {
      const response = await fetch("/api/commissions/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, progress, status }),
      });

      if (response.ok) {
        const data = await response.json();
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, progress, status } : item
          )
        );
      } else {
        const data = await response.json();
        console.error("Update failed:", data);
        alert(data.error || "Failed to update progress");
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
      alert("Failed to update progress");
    }
  };

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
    <>
      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border border-white/10 bg-brand-dark/50 p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-brand-dark/50 p-8 text-center">
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
          <p className="text-xs text-brand-light/30">Commissions will appear here when businesses assign tasks to you</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`cursor-pointer rounded-xl border p-4 transition-colors hover:border-brand-cyan/50 hover:bg-brand-dark/80 ${
                item.status === "Completed"
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-white/10 bg-brand-dark/70"
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.brand}</p>
                  <p className="text-sm text-brand-light/70">{item.task}</p>
                  <p className="text-sm font-semibold text-green-500">Rp {item.price?.toLocaleString("id-ID") || 0}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-brand-light/70">{item.content_type}</p>
                  <p className={`text-sm font-semibold ${getStatusColor(item.status)}`}>{item.status}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(item.progress)} transition-all duration-300`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-brand-light/80 w-12 text-right">
                  {item.progress}%
                </p>
                {item.status === "Completed" && (
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

      {selectedItem && (
        <CommissionModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdateProgress={handleUpdateProgress}
        />
      )}
    </>
  );
}
