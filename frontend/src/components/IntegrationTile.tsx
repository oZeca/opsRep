"use client";

import type { Integration } from "@/lib/api";
import { JSX } from "react";

interface IntegrationTileProps {
  integration: Integration;
  onToggle?: (id: string) => void;
}

const integrationIcons: Record<string, JSX.Element> = {
  slack: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  ),
  notion: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.449.327s0 .84-1.168.84l-3.22.186c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.932zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.448-1.632z" />
    </svg>
  ),
  stripe: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
    </svg>
  ),
  hubspot: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.198 2.198 0 0017.23.836h-.066a2.198 2.198 0 00-2.198 2.198v.066c0 .9.54 1.67 1.313 2.008v2.822a6.23 6.23 0 00-2.936 1.323l-7.75-6.033a2.573 2.573 0 00.077-.618v-.066a2.573 2.573 0 10-2.573 2.573h.066c.327 0 .637-.068.924-.182l7.6 5.916a6.279 6.279 0 00-.69 2.873 6.24 6.24 0 00.81 3.087l-2.378 2.378a2.121 2.121 0 00-.63-.1h-.066a2.122 2.122 0 100 4.245h.066a2.122 2.122 0 002.122-2.122v-.066a2.1 2.1 0 00-.099-.63l2.378-2.378a6.262 6.262 0 107.094-10.2zm-1.014 8.12a3.46 3.46 0 11.001-6.92 3.46 3.46 0 01-.001 6.92z" />
    </svg>
  ),
  zendesk: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.089 0v14.4L0 0h11.089zm1.822 9.6V24l11.089-14.4H12.911zM11.089 24c0-3.975-3.214-7.2-7.178-7.2v7.2h7.178zM12.911 0c0 3.975 3.214 7.2 7.178 7.2V0H12.911z" />
    </svg>
  ),
  discord: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
};

const statusConfig = {
  connected: {
    colorClass: "text-success",
    bgClass: "bg-success-bg",
    label: "Connected",
    dotClass: "bg-success",
  },
  disconnected: {
    colorClass: "text-muted",
    bgClass: "bg-muted-bg",
    label: "Disconnected",
    dotClass: "bg-muted",
  },
  pending: {
    colorClass: "text-warning",
    bgClass: "bg-warning-bg",
    label: "Pending",
    dotClass: "bg-warning animate-pulse",
  },
};

export function IntegrationTile({
  integration,
  onToggle,
}: IntegrationTileProps) {
  const status = statusConfig[integration.status];
  const Icon = integrationIcons[integration.icon] || integrationIcons.slack;

  const formatDate = (date: string | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="glass-card p-6 transition-smooth group hover:border-info-border">
      <div className="flex flex-col xl:flex-row items-start justify-between mb-4 gap-2">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl transition-smooth group-hover:scale-110 ${status.bgClass} ${status.colorClass}`}
          >
            {Icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {integration.name}
            </h3>
            <p className="text-xs capitalize text-foreground-subtle">
              {integration.type}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.dotClass}`} />
          <span className={`text-xs font-medium ${status.colorClass}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Stats */}
      {integration.status === "connected" && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {integration.channelsConnected !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-foreground-subtle">Channels</p>
              <p className="text-lg font-bold text-foreground">
                {integration.channelsConnected}
              </p>
            </div>
          )}
          {integration.messagesIndexed !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-foreground-subtle">Messages</p>
              <p className="text-lg font-bold text-foreground">
                {integration.messagesIndexed.toLocaleString()}
              </p>
            </div>
          )}
          {integration.pagesIndexed !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-foreground-subtle">Pages</p>
              <p className="text-lg font-bold text-foreground">
                {integration.pagesIndexed}
              </p>
            </div>
          )}
          {integration.databasesConnected !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-foreground-subtle">Databases</p>
              <p className="text-lg font-bold text-foreground">
                {integration.databasesConnected}
              </p>
            </div>
          )}
          {integration.transactionsTracked !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-foreground-subtle">Transactions</p>
              <p className="text-lg font-bold text-foreground">
                {integration.transactionsTracked.toLocaleString()}
              </p>
            </div>
          )}
          {integration.mrr !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-foreground-subtle">MRR Tracked</p>
              <p className="text-lg font-bold text-foreground">
                €{integration.mrr.toLocaleString()}
              </p>
            </div>
          )}
          {integration.serversConnected !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-foreground-subtle">Servers</p>
              <p className="text-lg font-bold text-foreground">
                {integration.serversConnected}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-surface-border">
        <p className="text-xs text-foreground-subtle">
          Last sync: {formatDate(integration.lastSync)}
        </p>
        <button
          onClick={() => onToggle?.(integration.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            integration.status === "connected"
              ? "bg-surface text-foreground hover:bg-surface-hover"
              : "bg-info-bg text-info hover:bg-info-bg-hover"
          }`}
        >
          {integration.status === "connected" ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
}
