"use client";

import type { Anomaly } from "@/lib/api";

interface AnomalyAlertProps {
  anomaly: Anomaly;
}

const severityStyles = {
  high: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    badge: "bg-red-500/20 text-red-400",
    icon: "text-red-400",
  },
  medium: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-400",
    icon: "text-amber-400",
  },
  low: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-400",
    icon: "text-blue-400",
  },
};

const statusStyles = {
  investigating: "bg-amber-500/20 text-amber-400",
  acknowledged: "bg-blue-500/20 text-blue-400",
  resolved: "bg-emerald-500/20 text-emerald-400",
};

export function AnomalyAlert({ anomaly }: AnomalyAlertProps) {
  const styles = severityStyles[anomaly.severity];

  return (
    <div
      className={`glass-card p-5 ${styles.bg} border ${styles.border} transition-smooth hover:border-opacity-50`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${styles.bg} ${styles.icon}`}>
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
          </div>
          <div>
            <p className="font-medium text-white">{anomaly.title}</p>
            <p className="text-xs text-zinc-400">{anomaly.metric}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${styles.badge}`}
          >
            {anomaly.severity}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[anomaly.status]}`}
          >
            {anomaly.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-300 mb-4">{anomaly.description}</p>

      {/* Current vs Expected */}
      {anomaly.currentValue !== undefined && anomaly.expectedRange && (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-black/20 mb-4">
          <div>
            <p className="text-xs text-zinc-500">Current</p>
            <p className="text-lg font-bold text-white">
              {anomaly.currentValue}
            </p>
          </div>
          <div className="text-zinc-600">→</div>
          <div>
            <p className="text-xs text-zinc-500">Expected Range</p>
            <p className="text-lg font-bold text-zinc-400">
              {anomaly.expectedRange[0]} - {anomaly.expectedRange[1]}
            </p>
          </div>
        </div>
      )}

      {/* Possible Causes */}
      {anomaly.possibleCauses && anomaly.possibleCauses.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-zinc-400 mb-2">
            Possible Causes
          </p>
          <ul className="space-y-1">
            {anomaly.possibleCauses.map((cause, i) => (
              <li
                key={i}
                className="text-xs text-zinc-400 flex items-start gap-2"
              >
                <span className="text-zinc-500">•</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Actions */}
      {anomaly.recommendedActions && anomaly.recommendedActions.length > 0 && (
        <div>
          <p className="text-xs font-medium text-zinc-400 mb-2">
            Recommended Actions
          </p>
          <ul className="space-y-1">
            {anomaly.recommendedActions.map((action, i) => (
              <li
                key={i}
                className="text-xs text-zinc-400 flex items-start gap-2"
              >
                <span className="text-blue-400">→</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resolution */}
      {anomaly.status === "resolved" && anomaly.resolution && (
        <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-xs font-medium text-emerald-400 mb-1">
            Resolution
          </p>
          <p className="text-xs text-zinc-300">{anomaly.resolution}</p>
        </div>
      )}

      {/* Timestamp */}
      <p className="text-xs text-zinc-600 mt-4">
        Detected: {new Date(anomaly.detectedAt).toLocaleString()}
      </p>
    </div>
  );
}
