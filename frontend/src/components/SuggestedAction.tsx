"use client";

import type { Decision } from "@/lib/api";
import { api } from "@/lib/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Check,
  X,
  Pencil,
  Calendar,
  User,
  AlertTriangle,
} from "lucide-react";

interface SuggestedActionProps {
  decision: Decision;
  onUpdate?: (decision: Decision) => void;
  compact?: boolean;
}

const confidenceConfig = {
  low: { variant: "muted" as const, label: "Low" },
  medium: { variant: "warning" as const, label: "Medium" },
  high: { variant: "success" as const, label: "High" },
};

export function SuggestedAction({
  decision,
  onUpdate,
  compact = false,
}: SuggestedActionProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(decision.title);

  const handleAccept = async () => {
    setIsUpdating(true);
    try {
      const updated = await api.updateDecision(decision.id, {
        status: "accepted",
      });
      onUpdate?.(updated);
    } catch (error) {
      console.error("Failed to accept decision:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDismiss = async () => {
    setIsUpdating(true);
    try {
      const updated = await api.updateDecision(decision.id, {
        status: "dismissed",
      });
      onUpdate?.(updated);
    } catch (error) {
      console.error("Failed to dismiss decision:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveEdit = async () => {
    setIsUpdating(true);
    try {
      const updated = await api.updateDecision(decision.id, {
        title: editedTitle,
      });
      onUpdate?.(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update decision:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Already actioned - show compact status
  if (decision.status !== "suggested") {
    return (
      <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-surface">
        <Badge
          variant={
            decision.status === "accepted"
              ? "info"
              : decision.status === "done"
                ? "success"
                : "muted"
          }
        >
          {decision.status === "accepted"
            ? "Accepted"
            : decision.status === "done"
              ? "Completed"
              : "Dismissed"}
        </Badge>
        <span className="text-xs text-foreground-muted truncate flex-1">
          {decision.title}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 rounded-xl border border-info-border bg-gradient-to-r from-info-bg/50 to-transparent">
      {/* Header */}
      <div className="flex items-start gap-2 mb-3">
        <ArrowRight className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-medium text-info mb-1">Suggested action</p>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-1 px-2 py-1 text-sm rounded bg-surface border border-card-border text-foreground"
              />
              <Button size="sm" onClick={handleSaveEdit} disabled={isUpdating}>
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <p className="text-sm font-medium text-foreground">
              {decision.title}
            </p>
          )}
        </div>
      </div>

      {/* Description (if not compact) */}
      {!compact && !isEditing && (
        <p className="text-xs text-foreground-muted ml-6 mb-3">
          {decision.description}
        </p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-3 ml-6 mb-3">
        <div className="flex items-center gap-1 text-xs text-foreground-subtle">
          <User className="w-3 h-3" />
          {decision.owner}
        </div>
        <div className="flex items-center gap-1 text-xs text-foreground-subtle">
          <Calendar className="w-3 h-3" />
          Due {formatDate(decision.dueDate)}
        </div>
      </div>

      {/* Impact (if not compact) */}
      {!compact && decision.impact && (
        <div className="ml-6 mb-3 p-2 rounded-lg bg-black/20">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-3 h-3 text-warning" />
            <span className="text-xs text-foreground-muted">Impact:</span>
            <span className="text-xs font-medium text-foreground">
              €{decision.impact.revenueAtRisk[0].toLocaleString()}–€
              {decision.impact.revenueAtRisk[1].toLocaleString()} at risk
            </span>
            <Badge
              variant={confidenceConfig[decision.impact.confidence].variant}
              className="text-[10px] px-1.5 py-0"
            >
              {confidenceConfig[decision.impact.confidence].label}
            </Badge>
          </div>
          <p className="text-xs text-foreground-subtle italic">
            {decision.impact.consequence}
          </p>
        </div>
      )}

      {/* Actions */}
      {!isEditing && (
        <>
          <Separator className="my-3 ml-6" />
          <div className="flex items-center gap-2 ml-6">
            <Button
              size="sm"
              variant="info"
              onClick={handleAccept}
              disabled={isUpdating}
              className="gap-1"
            >
              <Check className="w-3 h-3" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              disabled={isUpdating}
              className="gap-1"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              disabled={isUpdating}
              className="gap-1 text-foreground-muted hover:text-danger"
            >
              <X className="w-3 h-3" />
              Dismiss
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
