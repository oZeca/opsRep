/**
 * Delivery Service - Handles email and Slack notifications
 */
import config from "../config/index.js";
import type {
  Anomaly,
  Summary,
  KPI,
  Decision,
  DeliveryResult,
  EmailPayload,
  SlackMessagePayload,
  SlackBlock,
} from "../types/index.js";

interface WeeklyBriefData {
  summary?: Summary;
  kpis: KPI[];
  anomalies: Anomaly[];
  decisions: Decision[];
}

interface GeneratedEmail {
  html: string;
  text: string;
}

interface SlackAlertMessage {
  text: string;
  blocks: SlackBlock[];
}

// Mock email sending (in production, use nodemailer/SendGrid/SES)
export async function sendEmail(
  payload: EmailPayload,
): Promise<DeliveryResult> {
  console.log("📧 Sending email:", {
    to: payload.to,
    subject: payload.subject,
  });
  // In production: await transporter.sendMail(payload);
  return {
    success: true,
    messageId: `email_${Date.now()}`,
    sentAt: new Date().toISOString(),
  };
}

// Mock Slack webhook (in production, use actual webhook URL)
export async function sendSlackMessage(
  payload: SlackMessagePayload,
): Promise<DeliveryResult> {
  console.log("💬 Sending Slack message:", {
    channel: payload.channel,
    text: payload.text?.substring(0, 50),
  });
  // In production: await fetch(webhookUrl, { method: 'POST', body: JSON.stringify(payload) });
  return {
    success: true,
    messageId: `slack_${Date.now()}`,
    sentAt: new Date().toISOString(),
  };
}

// Generate Weekly Exec Brief HTML email
export function generateWeeklyBriefEmail(
  data: WeeklyBriefData,
): GeneratedEmail {
  const { summary, kpis, anomalies, decisions } = data;

  const kpiHtml = kpis
    .slice(0, 4)
    .map(
      (kpi) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #333;">
          <strong>${kpi.shortName}</strong><br/>
          <span style="color: #888; font-size: 12px;">${kpi.name}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #333; text-align: right;">
          <span style="font-size: 18px; font-weight: bold;">${kpi.format === "currency" ? "€" : ""}${kpi.value.toLocaleString()}${kpi.format === "percent" ? "%" : ""}</span>
          <br/>
          <span style="color: ${kpi.changeType === "positive" ? "#10b981" : kpi.changeType === "negative" ? "#ef4444" : "#888"}; font-size: 12px;">
            ${kpi.change > 0 ? "↑" : kpi.change < 0 ? "↓" : "→"} ${Math.abs(kpi.change).toFixed(1)}%
          </span>
        </td>
      </tr>
    `,
    )
    .join("");

  const alertsHtml = anomalies
    .filter((a) => a.status !== "resolved")
    .slice(0, 3)
    .map(
      (a) => `
      <div style="background: ${a.severity === "high" ? "#7f1d1d" : a.severity === "medium" ? "#78350f" : "#1e3a5f"}; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
        <strong style="color: ${a.severity === "high" ? "#fca5a5" : a.severity === "medium" ? "#fcd34d" : "#93c5fd"};">${a.title}</strong>
        ${a.impact ? `<br/><span style="color: #888; font-size: 12px;">€${a.impact.revenueAtRisk[0].toLocaleString()}–€${a.impact.revenueAtRisk[1].toLocaleString()} at risk</span>` : ""}
      </div>
    `,
    )
    .join("");

  const decisionsHtml = decisions
    .filter((d) => d.status === "accepted" || d.status === "done")
    .slice(0, 3)
    .map(
      (d) => `
      <div style="background: #1e3a5f; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
        <span style="color: ${d.status === "done" ? "#10b981" : "#3b82f6"};">${d.status === "done" ? "✓" : "→"}</span>
        <strong style="color: #e0f2fe;"> ${d.title}</strong>
        <br/><span style="color: #888; font-size: 12px;">Owner: ${d.owner}</span>
      </div>
    `,
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #e0f2fe; margin: 0; font-size: 24px;">Weekly Exec Brief</h1>
      <p style="color: #64748b; margin: 8px 0 0 0;">${summary?.period || "This Week"}</p>
    </div>

    <!-- AI Summary -->
    ${
      summary?.aiInsight
        ? `
    <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">AI Insight</p>
      <p style="color: #e0f2fe; margin: 0; line-height: 1.5;">${summary.aiInsight}</p>
    </div>
    `
        : ""
    }

    <!-- KPIs -->
    <div style="background: #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <h2 style="color: #e0f2fe; margin: 0 0 16px 0; font-size: 16px;">Key Metrics</h2>
      <table style="width: 100%; border-collapse: collapse; color: #e0f2fe;">
        ${kpiHtml}
      </table>
    </div>

    <!-- Active Alerts -->
    ${
      alertsHtml
        ? `
    <div style="margin-bottom: 24px;">
      <h2 style="color: #e0f2fe; margin: 0 0 12px 0; font-size: 16px;">⚠️ Active Alerts</h2>
      ${alertsHtml}
    </div>
    `
        : ""
    }

    <!-- Decisions -->
    ${
      decisionsHtml
        ? `
    <div style="margin-bottom: 24px;">
      <h2 style="color: #e0f2fe; margin: 0 0 12px 0; font-size: 16px;">📋 Decisions This Week</h2>
      ${decisionsHtml}
    </div>
    `
        : ""
    }

    <!-- Footer -->
    <div style="text-align: center; border-top: 1px solid #334155; padding-top: 24px; margin-top: 32px;">
      <a href="${config.appUrl}" style="display: inline-block; background: #3b82f6; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500;">View Dashboard</a>
      <p style="color: #64748b; margin: 16px 0 0 0; font-size: 12px;">OpsRep • Your AI Operations Assistant</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Weekly Exec Brief - ${summary?.period || "This Week"}

${summary?.aiInsight ? `AI INSIGHT: ${summary.aiInsight}\n\n` : ""}

KEY METRICS:
${kpis
  .slice(0, 4)
  .map(
    (k) =>
      `• ${k.shortName}: ${k.format === "currency" ? "€" : ""}${k.value.toLocaleString()} (${k.change > 0 ? "+" : ""}${k.change.toFixed(1)}%)`,
  )
  .join("\n")}

${
  anomalies.filter((a) => a.status !== "resolved").length > 0
    ? `ACTIVE ALERTS:\n${anomalies
        .filter((a) => a.status !== "resolved")
        .slice(0, 3)
        .map((a) => `• ${a.title}`)
        .join("\n")}\n\n`
    : ""
}

${
  decisions.filter((d) => d.status === "accepted" || d.status === "done")
    .length > 0
    ? `DECISIONS:\n${decisions
        .filter((d) => d.status === "accepted" || d.status === "done")
        .slice(0, 3)
        .map((d) => `• ${d.title} (${d.status})`)
        .join("\n")}\n\n`
    : ""
}

View dashboard: ${config.appUrl}
  `.trim();

  return { html, text };
}

// Generate Slack message blocks for critical alert
export function generateSlackAlertBlocks(anomaly: Anomaly): SlackAlertMessage {
  const severityEmoji: Record<Anomaly["severity"], string> = {
    high: "🔴",
    medium: "🟠",
    low: "🟡",
  };

  return {
    text: `${severityEmoji[anomaly.severity]} Critical Alert: ${anomaly.title}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${severityEmoji[anomaly.severity]} ${anomaly.title}`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: anomaly.description,
        },
      },
      ...(anomaly.impact
        ? [
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*Revenue at Risk:*\n€${anomaly.impact.revenueAtRisk[0].toLocaleString()}–€${anomaly.impact.revenueAtRisk[1].toLocaleString()}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Confidence:*\n${anomaly.impact.confidence}`,
                },
              ],
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `⚠️ _${anomaly.impact.consequence}_`,
                },
              ],
            },
          ]
        : []),
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "View in Dashboard",
              emoji: true,
            },
            url: `${config.appUrl}/kpis`,
            action_id: "view_dashboard",
          },
        ],
      },
    ],
  };
}

// Send weekly brief to configured recipients
export async function sendWeeklyBrief(
  data: WeeklyBriefData,
  recipients: string[] = [],
): Promise<DeliveryResult> {
  const { html, text } = generateWeeklyBriefEmail(data);

  const results = await Promise.all(
    recipients.map((email) =>
      sendEmail({
        to: email,
        subject: `Weekly Exec Brief - ${data.summary?.period || "This Week"}`,
        html,
        text,
      }),
    ),
  );

  return {
    success: results.every((r) => r.success),
    sent: results.length,
    results,
  };
}

// Send critical alert to Slack
export async function sendCriticalAlertToSlack(
  anomaly: Anomaly,
  channel = "#ops-alerts",
): Promise<DeliveryResult> {
  const message = generateSlackAlertBlocks(anomaly);
  return sendSlackMessage({ channel, ...message });
}

// Check if anomaly qualifies as critical (high severity + high confidence)
export function isCriticalAlert(anomaly: Anomaly): boolean {
  return (
    anomaly.severity === "high" &&
    anomaly.impact?.confidence === "high" &&
    anomaly.status !== "resolved"
  );
}
