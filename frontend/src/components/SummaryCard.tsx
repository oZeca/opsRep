"use client";

import type { Summary } from "@/lib/api";

interface SummaryCardProps {
  summary: Summary;
  compact?: boolean;
}

const highlightStyles = {
  success: {
    bg: "var(--success-bg)",
    border: "var(--success-border)",
    color: "var(--success)",
  },
  warning: {
    bg: "var(--warning-bg)",
    border: "var(--warning-border)",
    color: "var(--warning)",
  },
  info: {
    bg: "var(--info-bg)",
    border: "var(--info-border)",
    color: "var(--info)",
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
    <div
      className="glass-card p-6 transition-smooth"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--info-border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--card-border)";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium uppercase"
              style={{
                backgroundColor: "var(--info-bg)",
                color: "var(--info)",
              }}
            >
              {summary.type}
            </span>
            <span
              style={{ color: "var(--foreground-subtle)" }}
              className="text-sm"
            >
              •
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--foreground-muted)" }}
            >
              {summary.period}
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--foreground-subtle)" }}>
            {summary.dateRange}
          </p>
        </div>
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--foreground-subtle)" }}
        >
          <span
            className="px-2 py-1 rounded-md flex items-center gap-1"
            style={{ backgroundColor: "var(--surface)" }}
          >
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
            const styles = highlightStyles[highlight.type];
            return (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: styles.bg,
                  border: `1px solid ${styles.border}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <span style={{ color: styles.color }}>
                    {highlightIcons[highlight.type]}
                  </span>
                  <div>
                    <p
                      className="font-medium text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      {highlight.title}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--foreground-muted)" }}
                    >
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
        <div
          className="p-4 rounded-xl"
          style={{
            background: `linear-gradient(to right, var(--info-bg), rgba(236, 72, 153, 0.1))`,
            border: "1px solid var(--info-border)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "var(--info-bg)" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--info)" }}
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
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--info)" }}
              >
                AI Insight
              </p>
              <p className="text-sm" style={{ color: "var(--foreground)" }}>
                {summary.aiInsight}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      {!compact && summary.sections && (
        <div
          className="mt-4 pt-4 space-y-4"
          style={{ borderTop: "1px solid var(--surface-border)" }}
        >
          {summary.sections.map((section, i) => (
            <div key={i}>
              <h4
                className="text-sm font-medium mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-xs flex items-start gap-2"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <span className="mt-1" style={{ color: "var(--info)" }}>
                      •
                    </span>
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
