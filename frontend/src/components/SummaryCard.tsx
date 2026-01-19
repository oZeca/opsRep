"use client";

import type { Summary } from "@/lib/api";

interface SummaryCardProps {
  summary: Summary;
  compact?: boolean;
}

const highlightConfig = {
  success: {
    bgClass: "bg-success-bg",
    borderClass: "border-success-border",
    colorClass: "text-success",
  },
  warning: {
    bgClass: "bg-warning-bg",
    borderClass: "border-warning-border",
    colorClass: "text-warning",
  },
  info: {
    bgClass: "bg-info-bg",
    borderClass: "border-info-border",
    colorClass: "text-info",
  },
};

const highlightIcons = {
  success: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export function SummaryCard({ summary, compact = false }: SummaryCardProps) {
  return (
    <div className="glass-card p-6 transition-smooth hover:border-info-border">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium uppercase bg-info-bg text-info">
              {summary.type}
            </span>
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
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
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
            return (
              <div
                key={i}
                className={`p-4 rounded-xl border ${config.bgClass} ${config.borderClass}`}
              >
                <div className="flex items-start gap-3">
                  <span className={config.colorClass}>
                    {highlightIcons[highlight.type]}
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
              <svg
                className="w-4 h-4 text-info"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
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
        <div className="mt-4 pt-4 space-y-4 border-t border-surface-border">
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
      )}
    </div>
  );
}
