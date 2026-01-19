"use client";

import type { Integration } from "@/lib/api";

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
};

const statusConfig = {
  connected: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    label: "Connected",
    dot: "bg-emerald-400",
  },
  disconnected: {
    color: "text-zinc-500",
    bg: "bg-zinc-500/20",
    label: "Disconnected",
    dot: "bg-zinc-500",
  },
  pending: {
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    label: "Pending",
    dot: "bg-amber-400 animate-pulse",
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
    <div className="glass-card p-6 transition-smooth hover:border-blue-500/30 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl ${status.bg} ${status.color} transition-smooth group-hover:scale-110`}
          >
            {Icon}
          </div>
          <div>
            <h3 className="font-semibold text-white">{integration.name}</h3>
            <p className="text-xs text-zinc-500 capitalize">
              {integration.type}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span className={`text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Stats */}
      {integration.status === "connected" && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {integration.channelsConnected !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-zinc-500">Channels</p>
              <p className="text-lg font-bold text-white">
                {integration.channelsConnected}
              </p>
            </div>
          )}
          {integration.messagesIndexed !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-zinc-500">Messages</p>
              <p className="text-lg font-bold text-white">
                {integration.messagesIndexed.toLocaleString()}
              </p>
            </div>
          )}
          {integration.pagesIndexed !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-zinc-500">Pages</p>
              <p className="text-lg font-bold text-white">
                {integration.pagesIndexed}
              </p>
            </div>
          )}
          {integration.databasesConnected !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-zinc-500">Databases</p>
              <p className="text-lg font-bold text-white">
                {integration.databasesConnected}
              </p>
            </div>
          )}
          {integration.transactionsTracked !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-zinc-500">Transactions</p>
              <p className="text-lg font-bold text-white">
                {integration.transactionsTracked.toLocaleString()}
              </p>
            </div>
          )}
          {integration.mrr !== undefined && (
            <div className="p-3 rounded-lg bg-black/20">
              <p className="text-xs text-zinc-500">MRR Tracked</p>
              <p className="text-lg font-bold text-white">
                €{integration.mrr.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <p className="text-xs text-zinc-500">
          Last sync: {formatDate(integration.lastSync)}
        </p>
        <button
          onClick={() => onToggle?.(integration.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            integration.status === "connected"
              ? "bg-white/5 text-zinc-300 hover:bg-white/10"
              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          }`}
        >
          {integration.status === "connected" ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
}
