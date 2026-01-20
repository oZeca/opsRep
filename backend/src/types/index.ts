// ===== Core Entity Types =====

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
  type:
    | "slack"
    | "notion"
    | "stripe"
    | "zendesk"
    | "hubspot"
    | "gsheet"
    | "email";
  status: "connected" | "disconnected" | "error";
  icon: string;
  description: string;
  lastSync: string | null;
  dataPoints: number;
}

export interface SummaryHighlight {
  type: "success" | "warning" | "info" | "danger";
  title: string;
  content: string;
}

export interface SummarySection {
  title: string;
  items: string[];
}

export interface Summary {
  id: string;
  type: "weekly" | "daily";
  period: string;
  dateRange: string;
  createdAt: string;
  status: "draft" | "delivered";
  deliveredVia?: "slack" | "email";
  highlights: SummaryHighlight[];
  sections: SummarySection[];
  aiInsight: string;
}

export interface KPI {
  id: string;
  name: string;
  shortName: string;
  category:
    | "revenue"
    | "retention"
    | "satisfaction"
    | "support"
    | "engagement"
    | "efficiency";
  value: number;
  previousValue: number;
  unit: string;
  format: "currency" | "percent" | "number" | "hours";
  change: number;
  changeType: "positive" | "negative" | "neutral";
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
  expectedRange?: [number, number];
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

// ===== API Types =====

export interface DeliveryResult {
  success: boolean;
  messageId?: string;
  sentAt?: string;
  sent?: number;
  results?: DeliveryResult[];
}

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface SlackMessagePayload {
  channel: string;
  text: string;
  blocks?: SlackBlock[];
}

// Slack blocks are flexible - using Record for API compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SlackBlock = Record<string, any>;

// ===== Config Types =====

export interface AppConfig {
  port: number;
  useMockData: boolean;
  appUrl: string;
  slack?: {
    webhookUrl: string;
    botToken: string;
  };
  email?: {
    provider: "sendgrid" | "ses" | "resend";
    apiKey: string;
    from: string;
  };
}
