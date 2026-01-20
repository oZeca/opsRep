import "dotenv/config";
import type { AppConfig } from "../types/index.js";

const config: AppConfig = {
  useMockData: process.env.USE_MOCK_DATA !== "false",
  port: parseInt(process.env.PORT || "3001", 10),
  appUrl: process.env.APP_URL || "http://localhost:3003",
  slack: process.env.SLACK_WEBHOOK_URL
    ? {
        webhookUrl: process.env.SLACK_WEBHOOK_URL,
        botToken: process.env.SLACK_BOT_TOKEN || "",
      }
    : undefined,
  email: process.env.EMAIL_API_KEY
    ? {
        provider:
          (process.env.EMAIL_PROVIDER as "sendgrid" | "ses" | "resend") ||
          "sendgrid",
        apiKey: process.env.EMAIL_API_KEY,
        from: process.env.EMAIL_FROM || "noreply@opsrep.app",
      }
    : undefined,
};

export default config;
