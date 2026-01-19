"use client";

import type { Anomaly } from "@/lib/api";

interface AnomalyAlertProps {
  anomaly: Anomaly;
}

const severityStyles = {
  high: {
    bg: "var(--danger-bg)",
    border: "var(--danger-border)",
    color: "var(--danger)",
  },
  medium: {
    bg: "var(--warning-bg)",
    border: "var(--warning-border)",
    color: "var(--warning)",
  },
  low: {
    bg: "var(--info-bg)",
    border: "var(--info-border)",
    color: "var(--info)",
  },
};

const statusStyles = {
  investigating: {
    bg: "var(--warning-bg)",
    color: "var(--warning)",
  },
  acknowledged: {
    bg: "var(--info-bg)",
    color: "var(--info)",
  },
  resolved: {
    bg: "var(--success-bg)",
    color: "var(--success)",
  },
};

export function AnomalyAlert({ anomaly }: AnomalyAlertProps) {
  const styles = severityStyles[anomaly.severity];
  const status = statusStyles[anomaly.status];

  return (
    <div
      className="glass-card p-5 transition-smooth"
      style={{
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: styles.bg, color: styles.color }}
          >
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
            <p className="font-medium" style={{ color: "var(--foreground)" }}>
              {anomaly.title}
            </p>
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {anomaly.metric}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-1 rounded-full text-xs font-medium uppercase"
            style={{ backgroundColor: styles.bg, color: styles.color }}
          >
            {anomaly.severity}
          </span>
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: status.bg, color: status.color }}
          >
            {anomaly.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4" style={{ color: "var(--foreground)" }}>
        {anomaly.description}
      </p>

      {/* Current vs Expected */}
      {anomaly.currentValue !== undefined && anomaly.expectedRange && (
        <div
          className="flex items-center gap-4 p-3 rounded-lg mb-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <div>
            <p
              className="text-xs"
              style={{ color: "var(--foreground-subtle)" }}
            >
              Current
            </p>
            <p
              className="text-lg font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {anomaly.currentValue}
            </p>
          </div>
          <div style={{ color: "var(--foreground-faint)" }}>→</div>
          <div>
            <p
              className="text-xs"
              style={{ color: "var(--foreground-subtle)" }}
            >
              Expected Range
            </p>
            <p
              className="text-lg font-bold"
              style={{ color: "var(--foreground-muted)" }}
            >
              {anomaly.expectedRange[0]} - {anomaly.expectedRange[1]}
            </p>
          </div>
        </div>
      )}

      {/* Possible Causes */}
      {anomaly.possibleCauses && anomaly.possibleCauses.length > 0 && (
        <div className="mb-3">
          <p
            className="text-xs font-medium mb-2"
            style={{ color: "var(--foreground-muted)" }}
          >
            Possible Causes
          </p>
          <ul className="space-y-1">
            {anomaly.possibleCauses.map((cause, i) => (
              <li
                key={i}
                className="text-xs flex items-start gap-2"
                style={{ color: "var(--foreground-muted)" }}
              >
                <span style={{ color: "var(--foreground-subtle)" }}>•</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Actions */}
      {anomaly.recommendedActions && anomaly.recommendedActions.length > 0 && (
        <div>
          <p
            className="text-xs font-medium mb-2"
            style={{ color: "var(--foreground-muted)" }}
          >
            Recommended Actions
          </p>
          <ul className="space-y-1">
            {anomaly.recommendedActions.map((action, i) => (
              <li
                key={i}
                className="text-xs flex items-start gap-2"
                style={{ color: "var(--foreground-muted)" }}
              >
                <span style={{ color: "var(--info)" }}>→</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resolution */}
      {anomaly.status === "resolved" && anomaly.resolution && (
        <div
          className="mt-4 p-3 rounded-lg"
          style={{
            backgroundColor: "var(--success-bg)",
            border: "1px solid var(--success-border)",
          }}
        >
          <p
            className="text-xs font-medium mb-1"
            style={{ color: "var(--success)" }}
          >
            Resolution
          </p>
          <p className="text-xs" style={{ color: "var(--foreground)" }}>
            {anomaly.resolution}
          </p>
        </div>
      )}

      {/* Timestamp */}
      <p className="text-xs mt-4" style={{ color: "var(--foreground-faint)" }}>
        Detected: {new Date(anomaly.detectedAt).toLocaleString()}
      </p>
    </div>
  );
}
