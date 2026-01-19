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
    <div className="glass-card p-6 transition-smooth hover:border-blue-500/30 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-zinc-400">{kpi.name}</p>
          <p className="text-3xl font-bold text-white mt-1">
            {formatValue(kpi.value)}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
            isPositive
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
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
            className={`sparkline-bar ${
              i === kpi.trend.length - 1
                ? isPositive
                  ? "bg-gradient-to-t from-emerald-500/30 to-emerald-400"
                  : "bg-gradient-to-t from-red-500/30 to-red-400"
                : ""
            }`}
            style={{ height: `${(value / maxTrend) * 100}%` }}
          />
        ))}
      </div>

      {/* Explanation */}
      <p className="text-xs text-zinc-500 line-clamp-2 group-hover:text-zinc-400 transition-colors">
        {kpi.explanation}
      </p>
    </div>
  );
}
