"use client";

import type { KPI } from "@/lib/api";

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const isPositive = kpi.changeType === "positive";
  const maxTrend = Math.max(...kpi.trend);

  const formatValue = (value: number) => {
    if (kpi.format === "currency") {
      return `€${value.toLocaleString()}`;
    }
    if (kpi.format === "percentage") {
      return `${value}%`;
    }
    if (kpi.format === "duration") {
      return `${value}h`;
    }
    return value.toLocaleString();
  };

  return (
    <div
      className="glass-card p-6 transition-smooth group"
      style={{
        ["--hover-border" as string]: "var(--info-border)",
      }}
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
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            {kpi.name}
          </p>
          <p
            className="text-3xl font-bold mt-1"
            style={{ color: "var(--foreground)" }}
          >
            {formatValue(kpi.value)}
          </p>
        </div>
        <div
          className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
          style={{
            backgroundColor: isPositive
              ? "var(--success-bg)"
              : "var(--danger-bg)",
            color: isPositive ? "var(--success)" : "var(--danger)",
          }}
        >
          <svg
            className={`w-4 h-4 ${isPositive ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          {Math.abs(kpi.change).toFixed(1)}%
        </div>
      </div>

      {/* Sparkline */}
      <div className="sparkline-container mb-4">
        {kpi.trend.map((value, i) => (
          <div
            key={i}
            className="sparkline-bar"
            style={{
              height: `${(value / maxTrend) * 100}%`,
              background:
                i === kpi.trend.length - 1
                  ? isPositive
                    ? `linear-gradient(to top, var(--success-bg) 0%, var(--success) 100%)`
                    : `linear-gradient(to top, var(--danger-bg) 0%, var(--danger) 100%)`
                  : undefined,
            }}
          />
        ))}
      </div>

      {/* Explanation */}
      <p
        className="text-xs line-clamp-2 transition-colors"
        style={{ color: "var(--foreground-subtle)" }}
      >
        {kpi.explanation}
      </p>
    </div>
  );
}
