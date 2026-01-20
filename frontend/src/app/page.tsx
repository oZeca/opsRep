"use client";

import { useEffect, useState } from "react";
import { Header, KPICard, SummaryCard, AnomalyAlert } from "@/components";
import { api, type KPI, type Summary, type Anomaly } from "@/lib/api";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [kpiData, summaryData, anomalyData] = await Promise.all([
          api.getKPIs(),
          api.getSummaries(),
          api.getAnomalies(),
        ]);
        setKpis(kpiData);
        setSummaries(summaryData);
        setAnomalies(anomalyData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow bg-info-bg">
            <Loader2 className="w-8 h-8 animate-spin text-info" />
          </div>
          <p className="text-foreground-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const latestSummary = summaries[0];
  const activeAnomalies = anomalies.filter((a) => a.status !== "resolved");
  const topKpis = kpis.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto">
      <Header title="Dashboard" subtitle="Your business at a glance" />

      {/* Active Anomalies */}
      {activeAnomalies.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-danger-bg">
              <AlertTriangle className="w-4 h-4 text-danger" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Active Alerts
            </h2>
            <Badge variant="danger">{activeAnomalies.length}</Badge>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {activeAnomalies.slice(0, 2).map((anomaly) => (
              <AnomalyAlert key={anomaly.id} anomaly={anomaly} />
            ))}
          </div>
        </section>
      )}

      {/* KPIs */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Key Metrics</h2>
          <a
            href="/kpis"
            className="text-sm transition-colors text-info hover:text-primary"
          >
            View all →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topKpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* Latest Summary */}
      {latestSummary && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Latest Summary
            </h2>
            <a
              href="/summaries"
              className="text-sm transition-colors text-info hover:text-primary"
            >
              View all →
            </a>
          </div>
          <SummaryCard summary={latestSummary} />
        </section>
      )}
    </div>
  );
}
