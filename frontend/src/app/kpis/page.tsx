"use client";

import { useEffect, useState } from "react";
import { Header, KPICard, AnomalyAlert } from "@/components";
import { api, type KPI, type Anomaly } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function KPIsPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");

  const categories = [
    "all",
    "revenue",
    "retention",
    "satisfaction",
    "support",
    "engagement",
    "efficiency",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [kpiData, anomalyData] = await Promise.all([
          api.getKPIs(category === "all" ? undefined : category),
          api.getAnomalies(),
        ]);
        setKpis(kpiData);
        setAnomalies(anomalyData);
      } catch (error) {
        console.error("Failed to fetch KPIs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow bg-info-bg">
            <Loader2 className="w-8 h-8 animate-spin text-info" />
          </div>
          <p className="text-foreground-muted">Loading KPIs...</p>
        </div>
      </div>
    );
  }

  const activeAnomalies = anomalies.filter((a) => a.status !== "resolved");

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="KPIs"
        subtitle="Key performance indicators with AI-powered explanations"
      />

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setCategory(cat)}
            variant={category === cat ? "info" : "secondary"}
            size="sm"
            className="capitalize"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Anomalies Section */}
      {activeAnomalies.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-warning-bg">
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Detected Anomalies
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {activeAnomalies.map((anomaly) => (
              <AnomalyAlert key={anomaly.id} anomaly={anomaly} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
