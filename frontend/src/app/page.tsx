"use client";

import { useEffect, useState } from "react";
import { Header, KPICard, SummaryCard, AnomalyAlert } from "@/components";
import { api, type KPI, type Summary, type Anomaly } from "@/lib/api";

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
          <div
            className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow"
            style={{ backgroundColor: "var(--info-bg)" }}
          >
            <svg
              className="w-8 h-8 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              style={{ color: "var(--info)" }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
          <p style={{ color: "var(--foreground-muted)" }}>
            Loading dashboard...
          </p>
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
            <div
              className="p-1.5 rounded-lg"
              style={{ backgroundColor: "var(--danger-bg)" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--danger)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Active Alerts
            </h2>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "var(--danger-bg)",
                color: "var(--danger)",
              }}
            >
              {activeAnomalies.length}
            </span>
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
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Key Metrics
          </h2>
          <a
            href="/kpis"
            className="text-sm transition-colors"
            style={{ color: "var(--info)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--info)";
            }}
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
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Latest Summary
            </h2>
            <a
              href="/summaries"
              className="text-sm transition-colors"
              style={{ color: "var(--info)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--info)";
              }}
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
