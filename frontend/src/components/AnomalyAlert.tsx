"use client";

import type { Anomaly } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface AnomalyAlertProps {
  anomaly: Anomaly;
}

const severityConfig = {
  high: {
    variant: "danger" as const,
    bgClass: "bg-danger-bg",
    borderClass: "border-danger-border",
    colorClass: "text-danger",
  },
  medium: {
    variant: "warning" as const,
    bgClass: "bg-warning-bg",
    borderClass: "border-warning-border",
    colorClass: "text-warning",
  },
  low: {
    variant: "info" as const,
    bgClass: "bg-info-bg",
    borderClass: "border-info-border",
    colorClass: "text-info",
  },
};

const statusConfig = {
  investigating: {
    variant: "warning" as const,
  },
  acknowledged: {
    variant: "info" as const,
  },
  resolved: {
    variant: "success" as const,
  },
};

export function AnomalyAlert({ anomaly }: AnomalyAlertProps) {
  const severity = severityConfig[anomaly.severity];
  const status = statusConfig[anomaly.status];

  return (
    <div
      className={`glass-card p-5 transition-smooth border ${severity.bgClass} ${severity.borderClass}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${severity.bgClass} ${severity.colorClass}`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">{anomaly.title}</p>
            <p className="text-xs text-foreground-muted">{anomaly.metric}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={severity.variant} className="uppercase">
            {anomaly.severity}
          </Badge>
          <Badge variant={status.variant}>{anomaly.status}</Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 text-foreground">{anomaly.description}</p>

      {/* Current vs Expected */}
      {anomaly.currentValue !== undefined && anomaly.expectedRange && (
        <div className="flex items-center gap-4 p-3 rounded-lg mb-4 bg-black/20">
          <div>
            <p className="text-xs text-foreground-subtle">Current</p>
            <p className="text-lg font-bold text-foreground">
              {anomaly.currentValue}
            </p>
          </div>
          <div className="text-foreground-faint">→</div>
          <div>
            <p className="text-xs text-foreground-subtle">Expected Range</p>
            <p className="text-lg font-bold text-foreground-muted">
              {anomaly.expectedRange[0]} - {anomaly.expectedRange[1]}
            </p>
          </div>
        </div>
      )}

      {/* Possible Causes */}
      {anomaly.possibleCauses && anomaly.possibleCauses.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium mb-2 text-foreground-muted">
            Possible Causes
          </p>
          <ul className="space-y-1">
            {anomaly.possibleCauses.map((cause, i) => (
              <li
                key={i}
                className="text-xs flex items-start gap-2 text-foreground-muted"
              >
                <span className="text-foreground-subtle">•</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Actions */}
      {anomaly.recommendedActions && anomaly.recommendedActions.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-2 text-foreground-muted">
            Recommended Actions
          </p>
          <ul className="space-y-1">
            {anomaly.recommendedActions.map((action, i) => (
              <li
                key={i}
                className="text-xs flex items-start gap-2 text-foreground-muted"
              >
                <span className="text-info">→</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resolution */}
      {anomaly.status === "resolved" && anomaly.resolution && (
        <div className="mt-4 p-3 rounded-lg bg-success-bg border border-success-border">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-xs font-medium text-success">Resolution</p>
          </div>
          <p className="text-xs text-foreground">{anomaly.resolution}</p>
        </div>
      )}

      {/* Timestamp */}
      <p className="text-xs mt-4 text-foreground-faint">
        Detected: {new Date(anomaly.detectedAt).toLocaleString()}
      </p>
    </div>
  );
}
