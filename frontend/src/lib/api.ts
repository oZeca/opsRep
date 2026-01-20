const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar: string | null;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "pending";
  lastSync: string | null;
  icon: string;
  channelsConnected?: number;
  messagesIndexed?: number;
  pagesIndexed?: number;
  databasesConnected?: number;
  transactionsTracked?: number;
  mrr?: number;
  serversConnected?: number;
}

export interface SummaryHighlight {
  type: "success" | "warning" | "info";
  title: string;
  content: string;
}

export interface SummarySection {
  title: string;
  items: string[];
}

export interface Summary {
  id: string;
  type: "weekly" | "monthly";
  period: string;
  dateRange: string;
  createdAt: string;
  status: string;
  deliveredVia: string;
  highlights: SummaryHighlight[];
  sections: SummarySection[];
  aiInsight: string;
}

export interface KPI {
  id: string;
  name: string;
  shortName: string;
  category: string;
  value: number;
  previousValue: number;
  unit: string;
  format: string;
  change: number;
  changeType: "positive" | "negative";
  trend: number[];
  explanation: string;
}

export interface AnomalyImpact {
  revenueAtRisk: [number, number];
  confidence: "low" | "medium" | "high";
  consequence: string;
}

export interface Anomaly {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  metric: string;
  currentValue?: number;
  expectedRange?: number[];
  detectedAt: string;
  possibleCauses: string[];
  recommendedActions: string[];
  status: "investigating" | "acknowledged" | "resolved";
  resolvedAt?: string;
  resolution?: string;
  impact?: AnomalyImpact;
}

export interface QAResponse {
  id: string;
  question: string;
  answer: string;
  sources: string[];
  askedAt: string;
  confidence: number;
}

export interface DecisionImpact {
  revenueAtRisk: [number, number];
  confidence: "low" | "medium" | "high";
  consequence: string;
}

export interface DecisionSource {
  type: "anomaly" | "summary" | "ai";
  id: string;
  title: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  source: DecisionSource;
  status: "suggested" | "accepted" | "dismissed" | "done";
  suggestedAt: string;
  acceptedAt: string | null;
  completedAt: string | null;
  impact: DecisionImpact;
}

// API Functions
export const api = {
  getUser: () => fetchAPI<User>("/user"),

  getIntegrations: () => fetchAPI<Integration[]>("/integrations"),

  updateIntegration: (id: string, updates: Partial<Integration>) =>
    fetchAPI<Integration>(`/integrations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  getSummaries: (type?: string) =>
    fetchAPI<Summary[]>(`/summaries${type ? `?type=${type}` : ""}`),

  getSummary: (id: string) => fetchAPI<Summary>(`/summaries/${id}`),

  getKPIs: (category?: string) =>
    fetchAPI<KPI[]>(`/kpis${category ? `?category=${category}` : ""}`),

  getAnomalies: (status?: string) =>
    fetchAPI<Anomaly[]>(`/anomalies${status ? `?status=${status}` : ""}`),

  askQuestion: (question: string) =>
    fetchAPI<QAResponse>("/questions", {
      method: "POST",
      body: JSON.stringify({ question }),
    }),

  getQAHistory: () => fetchAPI<QAResponse[]>("/questions"),

  // Decision APIs
  getDecisions: (status?: string) =>
    fetchAPI<Decision[]>(`/decisions${status ? `?status=${status}` : ""}`),

  getDecisionsForAnomaly: (anomalyId: string) =>
    fetchAPI<Decision[]>(`/anomalies/${anomalyId}/decisions`),

  createDecision: (
    decision: Omit<
      Decision,
      "id" | "status" | "suggestedAt" | "acceptedAt" | "completedAt"
    >,
  ) =>
    fetchAPI<Decision>("/decisions", {
      method: "POST",
      body: JSON.stringify(decision),
    }),

  updateDecision: (id: string, updates: Partial<Decision>) =>
    fetchAPI<Decision>(`/decisions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  // Weekly Changelog
  getWeeklyChangelog: () => fetchAPI<WeeklyChangelog>("/changelog/weekly"),
};

// Weekly Changelog types
export interface ChangelogEvent {
  id: string;
  date: string;
  type: "decision" | "anomaly" | "kpi" | "release" | "customer";
  title: string;
  description: string;
  status: string;
  relatedId?: string;
}

export interface WeeklyChangelog {
  period: string;
  dateRange: string;
  generatedAt: string;
  events: ChangelogEvent[];
  summary: string;
}
