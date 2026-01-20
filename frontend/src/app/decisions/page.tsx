"use client";

import { useEffect, useState } from "react";
import { Header, SuggestedAction } from "@/components";
import { api, type Decision } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  CheckCircle,
  Clock,
  Lightbulb,
  XCircle,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react";

const statusConfig = {
  suggested: {
    icon: Lightbulb,
    variant: "info" as const,
    label: "Suggested",
  },
  accepted: {
    icon: Clock,
    variant: "warning" as const,
    label: "Accepted",
  },
  done: {
    icon: CheckCircle,
    variant: "success" as const,
    label: "Done",
  },
  dismissed: {
    icon: XCircle,
    variant: "muted" as const,
    label: "Dismissed",
  },
};

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const filters = ["all", "suggested", "accepted", "done", "dismissed"];

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.getDecisions(
          filter === "all" ? undefined : filter,
        );
        setDecisions(data);
      } catch (error) {
        console.error("Failed to fetch decisions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  const handleDecisionUpdate = (updated: Decision) => {
    setDecisions((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d)),
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow bg-info-bg">
            <Loader2 className="w-8 h-8 animate-spin text-info" />
          </div>
          <p className="text-foreground-muted">Loading decisions...</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Count by status
  const counts = {
    suggested: decisions.filter((d) => d.status === "suggested").length,
    accepted: decisions.filter((d) => d.status === "accepted").length,
    done: decisions.filter((d) => d.status === "done").length,
    dismissed: decisions.filter((d) => d.status === "dismissed").length,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Header
        title="Decisions"
        subtitle="Suggested and accepted decisions from alerts"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-info">{counts.suggested}</p>
          <p className="text-xs text-foreground-muted">Pending Review</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-warning">{counts.accepted}</p>
          <p className="text-xs text-foreground-muted">In Progress</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-success">{counts.done}</p>
          <p className="text-xs text-foreground-muted">Completed</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground-muted">
            {counts.dismissed}
          </p>
          <p className="text-xs text-foreground-muted">Dismissed</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        {filters.map((f) => (
          <Button
            key={f}
            onClick={() => setFilter(f)}
            variant={filter === f ? "info" : "secondary"}
            size="sm"
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Decisions List */}
      <div className="space-y-4">
        {decisions.map((decision) => {
          const config = statusConfig[decision.status];
          const Icon = config.icon;

          return (
            <div
              key={decision.id}
              className="glass-card p-5 transition-smooth hover:border-info-border"
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div
                  className={`p-2 rounded-lg ${
                    decision.status === "suggested"
                      ? "bg-info-bg text-info"
                      : decision.status === "accepted"
                        ? "bg-warning-bg text-warning"
                        : decision.status === "done"
                          ? "bg-success-bg text-success"
                          : "bg-muted-bg text-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">
                        {decision.title}
                      </h3>
                      <p className="text-sm text-foreground-muted mt-1">
                        {decision.description}
                      </p>
                    </div>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-xs text-foreground-subtle">
                      <User className="w-3 h-3" />
                      {decision.owner}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground-subtle">
                      <Calendar className="w-3 h-3" />
                      Due {formatDate(decision.dueDate)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-info">
                      <ExternalLink className="w-3 h-3" />
                      From: {decision.source.title}
                    </div>
                  </div>

                  {/* Impact */}
                  {decision.impact && (
                    <div className="mt-3 p-2 rounded-lg bg-black/20 text-xs">
                      <span className="text-foreground-muted">Impact: </span>
                      <span className="font-medium text-foreground">
                        €{decision.impact.revenueAtRisk[0].toLocaleString()}–€
                        {decision.impact.revenueAtRisk[1].toLocaleString()} at
                        risk
                      </span>
                      <span className="text-foreground-subtle">
                        {" "}
                        ({decision.impact.confidence} confidence)
                      </span>
                    </div>
                  )}

                  {/* Actions for suggested */}
                  {decision.status === "suggested" && (
                    <>
                      <Separator className="my-3" />
                      <SuggestedAction
                        decision={decision}
                        onUpdate={handleDecisionUpdate}
                        compact
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {decisions.length === 0 && (
          <div className="text-center py-12 glass-card">
            <p className="text-foreground-muted">
              No decisions found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
