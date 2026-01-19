// Mock data for Internal Ops / Reporting Automation Demo
// This data simulates a B2B SaaS company's operations

const mockUser = {
  id: "usr_001",
  name: "Sarah Chen",
  email: "sarah@acmesaas.com",
  company: "Acme SaaS",
  role: "VP Operations",
  avatar: null,
};

const mockIntegrations = [
  {
    id: "int_slack",
    name: "Slack",
    type: "communication",
    status: "connected",
    lastSync: "2026-01-19T14:30:00Z",
    channelsConnected: 12,
    messagesIndexed: 4523,
    icon: "slack",
  },
  {
    id: "int_notion",
    name: "Notion",
    type: "documentation",
    status: "connected",
    lastSync: "2026-01-19T14:25:00Z",
    pagesIndexed: 156,
    databasesConnected: 8,
    icon: "notion",
  },
  {
    id: "int_stripe",
    name: "Stripe",
    type: "payments",
    status: "connected",
    lastSync: "2026-01-19T14:35:00Z",
    transactionsTracked: 892,
    mrr: 47500,
    icon: "stripe",
  },
  {
    id: "int_hubspot",
    name: "HubSpot",
    type: "crm",
    status: "disconnected",
    lastSync: null,
    icon: "hubspot",
  },
  {
    id: "int_zendesk",
    name: "Zendesk",
    type: "support",
    status: "pending",
    lastSync: null,
    icon: "zendesk",
  },
  {
    id: "int_discord",
    name: "Discord",
    type: "communication",
    status: "disconnected",
    lastSync: null,
    serversConnected: 0,
    messagesIndexed: 0,
    icon: "discord",
  },
];

const mockSummaries = [
  {
    id: "sum_w03_2026",
    type: "weekly",
    period: "Week 3, 2026",
    dateRange: "Jan 13 - Jan 19, 2026",
    createdAt: "2026-01-19T08:00:00Z",
    status: "delivered",
    deliveredVia: "slack",
    highlights: [
      {
        type: "success",
        title: "MRR Growth",
        content:
          "Monthly Recurring Revenue increased by 12% this week, driven by 3 new Enterprise deals closed by the sales team.",
      },
      {
        type: "warning",
        title: "Support Ticket Spike",
        content:
          "Support tickets increased 34% compared to last week. Primary driver: API integration issues reported by 8 customers.",
      },
      {
        type: "info",
        title: "Product Launch Prep",
        content:
          "Engineering completed 87% of Sprint 14 goals. New dashboard feature on track for Jan 25 release.",
      },
    ],
    sections: [
      {
        title: "Key Decisions Made",
        items: [
          "Approved Q1 marketing budget increase of €15,000 for LinkedIn campaigns",
          "Decided to postpone mobile app development to Q2",
          "Greenlit hiring of 2 additional support engineers",
        ],
      },
      {
        title: "Customer Wins",
        items: [
          "Closed deal with TechCorp GmbH (€2,400/mo)",
          "Renewed annual contract with DataFlow Inc (+15% uplift)",
          "Received 5-star review from LogiSmart on G2",
        ],
      },
      {
        title: "Blockers & Risks",
        items: [
          "AWS costs trending 18% over budget - need optimization review",
          "Senior developer (Maria) on unexpected sick leave through Jan 24",
          "Competitor launched similar feature - market response being monitored",
        ],
      },
    ],
    aiInsight:
      "Based on this week's patterns, I recommend prioritizing the support backlog resolution before the product launch. Historical data shows feature releases typically increase support volume by 40% in the first week.",
  },
  {
    id: "sum_w02_2026",
    type: "weekly",
    period: "Week 2, 2026",
    dateRange: "Jan 6 - Jan 12, 2026",
    createdAt: "2026-01-12T08:00:00Z",
    status: "delivered",
    deliveredVia: "email",
    highlights: [
      {
        type: "success",
        title: "Team Expansion",
        content:
          "Successfully onboarded 2 new engineers. They completed orientation and are now contributing to Sprint 13.",
      },
      {
        type: "info",
        title: "Q4 Review Complete",
        content:
          "Annual review meetings completed. 92% of team met or exceeded goals. Bonuses to be processed by Jan 20.",
      },
    ],
    sections: [
      {
        title: "Key Decisions Made",
        items: [
          "Approved new pricing tier for SMB segment",
          "Selected AWS as primary cloud provider for 2026",
        ],
      },
    ],
    aiInsight:
      "The team expansion addresses the engineering capacity gap identified in Q4. Monitor velocity metrics over the next 3 weeks to validate impact.",
  },
];

const mockKPIs = [
  {
    id: "kpi_mrr",
    name: "Monthly Recurring Revenue",
    shortName: "MRR",
    category: "revenue",
    value: 47500,
    previousValue: 42400,
    unit: "EUR",
    format: "currency",
    change: 12.03,
    changeType: "positive",
    trend: [38000, 39500, 41000, 42400, 47500],
    explanation:
      "MRR grew €5,100 this week primarily due to 3 new Enterprise customers (€3,200) and expansion revenue from existing accounts (€1,900).",
  },
  {
    id: "kpi_arr",
    name: "Annual Recurring Revenue",
    shortName: "ARR",
    category: "revenue",
    value: 570000,
    previousValue: 508800,
    unit: "EUR",
    format: "currency",
    change: 12.03,
    changeType: "positive",
    trend: [456000, 474000, 492000, 508800, 570000],
    explanation: "ARR projection updated based on current MRR performance.",
  },
  {
    id: "kpi_churn",
    name: "Monthly Churn Rate",
    shortName: "Churn",
    category: "retention",
    value: 2.1,
    previousValue: 2.8,
    unit: "%",
    format: "percentage",
    change: -25.0,
    changeType: "positive",
    trend: [3.2, 2.9, 2.6, 2.8, 2.1],
    explanation:
      "Churn decreased significantly this month due to improved onboarding process implemented in December.",
  },
  {
    id: "kpi_nps",
    name: "Net Promoter Score",
    shortName: "NPS",
    category: "satisfaction",
    value: 62,
    previousValue: 58,
    unit: "points",
    format: "number",
    change: 6.9,
    changeType: "positive",
    trend: [52, 55, 56, 58, 62],
    explanation:
      "NPS improved by 4 points following the release of the new reporting dashboard which received positive customer feedback.",
  },
  {
    id: "kpi_tickets",
    name: "Open Support Tickets",
    shortName: "Tickets",
    category: "support",
    value: 47,
    previousValue: 35,
    unit: "tickets",
    format: "number",
    change: 34.3,
    changeType: "negative",
    trend: [28, 31, 29, 35, 47],
    explanation:
      "Support tickets spiked due to API integration issues affecting 8 enterprise customers. Root cause identified, fix scheduled for Jan 21.",
  },
  {
    id: "kpi_response_time",
    name: "Avg Response Time",
    shortName: "Response",
    category: "support",
    value: 4.2,
    previousValue: 2.8,
    unit: "hours",
    format: "duration",
    change: 50.0,
    changeType: "negative",
    trend: [2.1, 2.4, 2.5, 2.8, 4.2],
    explanation:
      "Response time increased due to ticket volume spike. Team is prioritizing critical issues. Consider temporary support reinforcement.",
  },
  {
    id: "kpi_active_users",
    name: "Daily Active Users",
    shortName: "DAU",
    category: "engagement",
    value: 1247,
    previousValue: 1189,
    unit: "users",
    format: "number",
    change: 4.9,
    changeType: "positive",
    trend: [1102, 1145, 1156, 1189, 1247],
    explanation:
      "DAU continues steady growth. New onboarding flow improving activation rates by 18%.",
  },
  {
    id: "kpi_cac",
    name: "Customer Acquisition Cost",
    shortName: "CAC",
    category: "efficiency",
    value: 840,
    previousValue: 920,
    unit: "EUR",
    format: "currency",
    change: -8.7,
    changeType: "positive",
    trend: [1050, 980, 945, 920, 840],
    explanation:
      "CAC decreased as content marketing efforts mature. Organic leads now represent 34% of pipeline.",
  },
];

const mockAnomalies = [
  {
    id: "anom_001",
    severity: "high",
    title: "Support Ticket Spike Detected",
    description:
      "Support tickets increased 34% above the expected range based on historical patterns.",
    metric: "Open Support Tickets",
    currentValue: 47,
    expectedRange: [28, 38],
    detectedAt: "2026-01-18T10:30:00Z",
    possibleCauses: [
      "API integration issues reported by multiple customers",
      "Recent feature deployment may have introduced bugs",
    ],
    recommendedActions: [
      "Review API error logs from the past 48 hours",
      "Prioritize tickets from enterprise customers",
      "Consider temporary support staff augmentation",
    ],
    status: "investigating",
  },
  {
    id: "anom_002",
    severity: "medium",
    title: "Response Time Degradation",
    description:
      "Average response time increased 50% compared to the previous week.",
    metric: "Avg Response Time",
    currentValue: 4.2,
    expectedRange: [2.0, 3.0],
    detectedAt: "2026-01-18T14:00:00Z",
    possibleCauses: [
      "Correlated with support ticket spike",
      "Reduced support capacity due to staff absence",
    ],
    recommendedActions: [
      "Implement ticket triage to prioritize critical issues",
      "Enable auto-responses for common questions",
    ],
    status: "acknowledged",
  },
  {
    id: "anom_003",
    severity: "low",
    title: "Unusual Login Pattern",
    description:
      "Login attempts from new geographic region (Southeast Asia) increased 200%.",
    metric: "Login Attempts by Region",
    detectedAt: "2026-01-17T22:15:00Z",
    possibleCauses: [
      "New customer acquisition in the region",
      "Potential credential stuffing attempt",
    ],
    recommendedActions: [
      "Verify if new customers were onboarded in this region",
      "Review failed login attempts for suspicious patterns",
    ],
    status: "resolved",
    resolvedAt: "2026-01-18T09:00:00Z",
    resolution:
      "Confirmed as legitimate traffic from new Singapore-based customer.",
  },
];

const mockQAHistory = [
  {
    id: "qa_001",
    question: "What were the main customer complaints last week?",
    answer:
      "Based on Slack conversations and support tickets, the main customer complaints last week were:\n\n1. **API Rate Limiting** (12 mentions) - Enterprise customers hitting rate limits during peak hours\n2. **Dashboard Loading Speed** (8 mentions) - Reports taking >10 seconds to generate\n3. **Export Functionality** (5 mentions) - CSV exports missing some data columns\n\nThe engineering team has prioritized #1 and #2 for the next sprint.",
    sources: ["#support-escalations", "#customer-feedback", "Zendesk tickets"],
    askedAt: "2026-01-19T10:30:00Z",
    confidence: 0.92,
  },
  {
    id: "qa_002",
    question: "How is the Q1 hiring plan progressing?",
    answer:
      "The Q1 hiring plan is **on track** with the following status:\n\n- ✅ **2 Engineers** - Hired and onboarded (Week 2)\n- 🔄 **1 Product Manager** - Final interviews scheduled for Jan 22\n- 🔄 **2 Support Engineers** - Job posting live, 45 applications received\n- ⏳ **1 DevOps Engineer** - Recruiter engaged, sourcing in progress\n\nOverall, we're at 33% completion of the 6 planned hires.",
    sources: ["Notion HR Database", "#hiring channel", "Greenhouse ATS"],
    askedAt: "2026-01-18T15:20:00Z",
    confidence: 0.95,
  },
  {
    id: "qa_003",
    question: "What decisions were made about the mobile app?",
    answer:
      "In the leadership meeting on Jan 15, it was decided to **postpone mobile app development to Q2**. Key reasons:\n\n1. Engineering bandwidth needed for API stability improvements\n2. Customer research showed web app usage is 94% of total usage\n3. Q1 priority is reducing churn through better onboarding\n\nThe mobile app project will be re-evaluated in the March planning session.",
    sources: ["#leadership-decisions", "Notion Meeting Notes"],
    askedAt: "2026-01-17T09:45:00Z",
    confidence: 0.89,
  },
];

module.exports = {
  mockUser,
  mockIntegrations,
  mockSummaries,
  mockKPIs,
  mockAnomalies,
  mockQAHistory,
};
