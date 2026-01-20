"use client";

import type { AnomalyImpact } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, AlertTriangle } from "lucide-react";

interface ImpactBadgeProps {
  impact: AnomalyImpact;
  showConsequence?: boolean;
  compact?: boolean;
}

const confidenceConfig = {
  low: { variant: "muted" as const, label: "Low" },
  medium: { variant: "warning" as const, label: "Medium" },
  high: { variant: "danger" as const, label: "High" },
};

export function ImpactBadge({
  impact,
  showConsequence = true,
  compact = false,
}: ImpactBadgeProps) {
  const config = confidenceConfig[impact.confidence];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant={config.variant} className="text-xs">
          €{impact.revenueAtRisk[0].toLocaleString()}–€
          {impact.revenueAtRisk[1].toLocaleString()} at risk
        </Badge>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg bg-black/20 border border-card-border">
      {/* Impact Header */}
      <div className="flex items-center gap-2 mb-2">
        <TrendingDown className="w-4 h-4 text-warning" />
        <span className="text-xs font-medium text-foreground-muted">
          Impact Estimation
        </span>
      </div>

      {/* Revenue at Risk */}
      <div className="flex items-center gap-3 mb-2">
        <div>
          <p className="text-xs text-foreground-subtle">Revenue at Risk</p>
          <p className="text-lg font-bold text-foreground">
            €{impact.revenueAtRisk[0].toLocaleString()} – €
            {impact.revenueAtRisk[1].toLocaleString()}
          </p>
        </div>
        <Badge variant={config.variant} className="self-start">
          {config.label} confidence
        </Badge>
      </div>

      {/* Consequence */}
      {showConsequence && impact.consequence && (
        <div className="flex items-start gap-2 mt-3 p-2 rounded-md bg-warning-bg/30 border border-warning-border/50">
          <AlertTriangle className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
          <p className="text-xs text-foreground-muted italic">
            {impact.consequence}
          </p>
        </div>
      )}
    </div>
  );
}
