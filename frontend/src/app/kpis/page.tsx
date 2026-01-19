"use client";

import { useEffect, useState } from "react";
import { Header, KPICard, AnomalyAlert } from "@/components";
import { api, type KPI, type Anomaly } from "@/lib/api";

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
          <div className="inline-flex p-4 rounded-2xl bg-blue-500/10 mb-4 animate-pulse-glow">
            <svg
              className="w-8 h-8 text-blue-400 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
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
          <p className="text-zinc-400">Loading KPIs...</p>
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
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-smooth ${
              category === cat
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
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
            <div className="p-1.5 rounded-lg bg-amber-500/20">
              <svg
                className="w-4 h-4 text-amber-400"
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
            <h2 className="text-lg font-semibold text-white">
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
