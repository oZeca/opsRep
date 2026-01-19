"use client";

import { useEffect, useState } from "react";
import { Header, SummaryCard } from "@/components";
import { api, type Summary } from "@/lib/api";

export default function SummariesPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "weekly" | "monthly">("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.getSummaries(
          filter === "all" ? undefined : filter,
        );
        setSummaries(data);
      } catch (error) {
        console.error("Failed to fetch summaries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-blue-500/10 mb-4 animate-pulse-glow">
            <svg
              className="w-8 h-8 text-blue-400 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
          <p className="text-zinc-400">Loading summaries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Header
        title="Summaries"
        subtitle="AI-generated weekly and monthly reports"
      />

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        {(["all", "weekly", "monthly"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              filter === type
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Summaries */}
      <div className="space-y-6">
        {summaries.map((summary) => (
          <SummaryCard key={summary.id} summary={summary} />
        ))}
      </div>

      {summaries.length === 0 && (
        <div className="text-center py-12 glass-card">
          <p className="text-zinc-400">
            No summaries found for the selected filter.
          </p>
        </div>
      )}
    </div>
  );
}
