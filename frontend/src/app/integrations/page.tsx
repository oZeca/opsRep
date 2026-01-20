"use client";

import { useEffect, useState } from "react";
import { Header, IntegrationTile } from "@/components";
import { api, type Integration } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus, Loader2 } from "lucide-react";

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.getIntegrations();
        setIntegrations(data);
      } catch (error) {
        console.error("Failed to fetch integrations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleToggle = async (id: string) => {
    const integration = integrations.find((i) => i.id === id);
    if (!integration) return;

    const newStatus =
      integration.status === "connected" ? "disconnected" : "connected";

    try {
      await api.updateIntegration(id, {
        status: newStatus,
        lastSync: newStatus === "connected" ? new Date().toISOString() : null,
      });

      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                status: newStatus,
                lastSync:
                  newStatus === "connected" ? new Date().toISOString() : null,
              }
            : i,
        ),
      );
    } catch (error) {
      console.error("Failed to update integration:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow bg-info-bg">
            <Loader2 className="w-8 h-8 animate-spin text-info" />
          </div>
          <p className="text-foreground-muted">Loading integrations...</p>
        </div>
      </div>
    );
  }

  const connected = integrations.filter((i) => i.status === "connected");
  const available = integrations.filter((i) => i.status !== "connected");

  return (
    <div className="max-w-6xl mx-auto">
      <Header
        title="Integrations"
        subtitle="Connect your data sources for automated reporting"
      />

      {/* Connected Integrations */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-success-bg">
            <CheckCircle className="w-4 h-4 text-success" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Connected</h2>
          <Badge variant="success">{connected.length}</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {connected.map((integration) => (
            <IntegrationTile
              key={integration.id}
              integration={integration}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </section>

      {/* Available Integrations */}
      {available.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-muted-bg">
              <Plus className="w-4 h-4 text-muted" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Available</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {available.map((integration) => (
              <IntegrationTile
                key={integration.id}
                integration={integration}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
