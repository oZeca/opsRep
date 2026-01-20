"use client";

import type { WeeklyChangelog, ChangelogEvent } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Rocket,
  Users,
  Calendar,
} from "lucide-react";

interface ChangelogTimelineProps {
  changelog: WeeklyChangelog;
}

const eventConfig = {
  decision: {
    icon: CheckCircle,
    bgClass: "bg-info-bg",
    colorClass: "text-info",
    borderClass: "border-info",
  },
  anomaly: {
    icon: AlertTriangle,
    bgClass: "bg-warning-bg",
    colorClass: "text-warning",
    borderClass: "border-warning",
  },
  kpi: {
    icon: TrendingUp,
    bgClass: "bg-success-bg",
    colorClass: "text-success",
    borderClass: "border-success",
  },
  release: {
    icon: Rocket,
    bgClass: "bg-accent/20",
    colorClass: "text-accent",
    borderClass: "border-accent",
  },
  customer: {
    icon: Users,
    bgClass: "bg-primary/20",
    colorClass: "text-primary",
    borderClass: "border-primary",
  },
};

const statusVariant = (type: string, status: string) => {
  if (status === "positive" || status === "done" || status === "completed") {
    return "success" as const;
  }
  if (status === "investigating" || status === "accepted") {
    return "warning" as const;
  }
  if (status === "acknowledged") {
    return "info" as const;
  }
  return "muted" as const;
};

export function ChangelogTimeline({ changelog }: ChangelogTimelineProps) {
  // Group events by date
  const eventsByDate = changelog.events.reduce(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    },
    {} as Record<string, ChangelogEvent[]>,
  );

  const dates = Object.keys(eventsByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            What changed this week
          </h3>
          <p className="text-xs text-foreground-muted">{changelog.dateRange}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-foreground-subtle">
          <Calendar className="w-3 h-3" />
          {changelog.period}
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-foreground-muted mb-6 p-3 rounded-lg bg-surface border border-surface-border">
        {changelog.summary}
      </p>

      {/* Timeline */}
      <div className="space-y-6">
        {dates.map((date) => (
          <div key={date}>
            {/* Date header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-foreground-muted"></div>
              <span className="text-xs font-medium text-foreground-muted">
                {formatDate(date)}
              </span>
              <div className="flex-1 h-px bg-surface-border"></div>
            </div>

            {/* Events for this date */}
            <div className="ml-4 space-y-3">
              {eventsByDate[date].map((event) => {
                const config = eventConfig[event.type];
                const Icon = config.icon;

                return (
                  <div
                    key={event.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${config.bgClass} ${config.borderClass}/30`}
                  >
                    <div
                      className={`p-1.5 rounded-md ${config.bgClass} ${config.colorClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {event.title}
                        </p>
                        <Badge
                          variant={statusVariant(event.type, event.status)}
                          className="text-[10px] shrink-0"
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
