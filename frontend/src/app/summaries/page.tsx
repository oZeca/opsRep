"use client";

import { useEffect, useState } from "react";
import { Header, SummaryCard } from "@/components";
import { api, type Summary } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
          <div className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow bg-info-bg">
            <Loader2 className="w-8 h-8 animate-spin text-info" />
          </div>
          <p className="text-foreground-muted">Loading summaries...</p>
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
          <Button
            key={type}
            onClick={() => setFilter(type)}
            variant={filter === type ? "info" : "secondary"}
            size="sm"
            className="capitalize"
          >
            {type}
          </Button>
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
          <p className="text-foreground-muted">
            No summaries found for the selected filter.
          </p>
        </div>
      )}
    </div>
  );
}
