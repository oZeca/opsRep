"use client";

import type { Summary } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Mail,
} from "lucide-react";

interface SummaryCardProps {
  summary: Summary;
  compact?: boolean;
}

const highlightConfig = {
  success: {
    bgClass: "bg-success-bg",
    borderClass: "border-success-border",
    colorClass: "text-success",
    Icon: CheckCircle2,
  },
  warning: {
    bgClass: "bg-warning-bg",
    borderClass: "border-warning-border",
    colorClass: "text-warning",
    Icon: AlertTriangle,
  },
  info: {
    bgClass: "bg-info-bg",
    borderClass: "border-info-border",
    colorClass: "text-info",
    Icon: Info,
  },
};

export function SummaryCard({ summary, compact = false }: SummaryCardProps) {
  return (
    <div className="glass-card p-6 transition-smooth hover:border-info-border">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info" className="uppercase">
              {summary.type}
            </Badge>
            <span className="text-sm text-foreground-subtle">•</span>
            <span className="text-sm text-foreground-muted">
              {summary.period}
            </span>
          </div>
          <p className="text-xs text-foreground-subtle">{summary.dateRange}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground-subtle">
          <span className="px-2 py-1 rounded-md flex items-center gap-1 bg-surface">
            {summary.deliveredVia === "slack" ? (
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
            ) : (
              <Mail className="w-3 h-3" />
            )}
            Delivered
          </span>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-3 mb-4">
        {summary.highlights
          .slice(0, compact ? 2 : undefined)
          .map((highlight, i) => {
            const config = highlightConfig[highlight.type];
            const IconComponent = config.Icon;
            return (
              <div
                key={i}
                className={`p-4 rounded-xl border ${config.bgClass} ${config.borderClass}`}
              >
                <div className="flex items-start gap-3">
                  <span className={config.colorClass}>
                    <IconComponent className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {highlight.title}
                    </p>
                    <p className="text-xs mt-1 text-foreground-muted">
                      {highlight.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* AI Insight */}
      {summary.aiInsight && !compact && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-info-bg to-accent/10 border border-info-border">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-info-bg">
              <Sparkles className="w-4 h-4 text-info" />
            </div>
            <div>
              <p className="text-xs font-medium mb-1 text-info">AI Insight</p>
              <p className="text-sm text-foreground">{summary.aiInsight}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      {!compact && summary.sections && (
        <>
          <Separator className="my-4" />
          <div className="space-y-4">
            {summary.sections.map((section, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium mb-2 text-foreground">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs flex items-start gap-2 text-foreground-muted"
                    >
                      <span className="mt-1 text-info">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
