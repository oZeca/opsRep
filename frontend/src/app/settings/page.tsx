"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components";
import { api, type Anomaly } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  MessageSquare,
  Send,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";

export default function SettingsPage() {
  const [criticalAlerts, setCriticalAlerts] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingBrief, setSendingBrief] = useState(false);
  const [sendingSlack, setSendingSlack] = useState<string | null>(null);
  const [briefSent, setBriefSent] = useState(false);
  const [slackSent, setSlackSent] = useState<string[]>([]);
  const [emailRecipients, setEmailRecipients] = useState("exec@example.com");
  const [slackChannel, setSlackChannel] = useState("#ops-alerts");

  useEffect(() => {
    async function fetchData() {
      try {
        const alerts = await api.getCriticalAlerts();
        setCriticalAlerts(alerts);
      } catch (error) {
        console.error("Failed to fetch critical alerts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSendBrief = async () => {
    setSendingBrief(true);
    try {
      const recipients = emailRecipients.split(",").map((e) => e.trim());
      await api.sendWeeklyBrief(recipients);
      setBriefSent(true);
      setTimeout(() => setBriefSent(false), 5000);
    } catch (error) {
      console.error("Failed to send brief:", error);
    } finally {
      setSendingBrief(false);
    }
  };

  const handleSendSlackAlert = async (anomalyId: string) => {
    setSendingSlack(anomalyId);
    try {
      await api.sendSlackAlert(anomalyId, slackChannel);
      setSlackSent((prev) => [...prev, anomalyId]);
    } catch (error) {
      console.error("Failed to send Slack alert:", error);
    } finally {
      setSendingSlack(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow bg-info-bg">
            <Loader2 className="w-8 h-8 animate-spin text-info" />
          </div>
          <p className="text-foreground-muted">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Header
        title="Delivery Settings"
        subtitle="Configure email briefs and Slack alerts"
      />

      {/* Weekly Exec Brief */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info-bg">
            <Mail className="w-5 h-5 text-info" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Weekly Exec Brief
            </h2>
            <p className="text-xs text-foreground-muted">
              Send a summary email with KPIs, alerts, and decisions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground-muted block mb-2">
              Recipients (comma-separated)
            </label>
            <Input
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
              placeholder="exec@example.com, vp@example.com"
              className="max-w-md"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSendBrief}
              disabled={sendingBrief || !emailRecipients}
              className="gap-2"
            >
              {sendingBrief ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : briefSent ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {briefSent ? "Sent!" : "Send Now"}
            </Button>
            <a
              href="http://localhost:3001/api/delivery/weekly-brief/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-info hover:text-primary flex items-center gap-1"
            >
              Preview email
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Slack Alerts */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-warning-bg">
            <MessageSquare className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Critical Alerts → Slack
            </h2>
            <p className="text-xs text-foreground-muted">
              Send high-severity, high-confidence alerts to Slack
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-medium text-foreground-muted block mb-2">
            Slack Channel
          </label>
          <Input
            value={slackChannel}
            onChange={(e) => setSlackChannel(e.target.value)}
            placeholder="#ops-alerts"
            className="max-w-xs"
          />
        </div>

        <Separator className="my-4" />

        <p className="text-xs font-medium text-foreground-muted mb-3">
          Critical Alerts (high severity + high confidence)
        </p>

        {criticalAlerts.length === 0 ? (
          <div className="text-center py-8 text-foreground-muted">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
            <p>No critical alerts at this time</p>
          </div>
        ) : (
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 rounded-lg bg-danger-bg border border-danger-border"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-danger" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {alert.title}
                    </p>
                    {alert.impact && (
                      <p className="text-xs text-foreground-muted">
                        €{alert.impact.revenueAtRisk[0].toLocaleString()}–€
                        {alert.impact.revenueAtRisk[1].toLocaleString()} at risk
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSendSlackAlert(alert.id)}
                  disabled={
                    sendingSlack === alert.id || slackSent.includes(alert.id)
                  }
                  className="gap-1"
                >
                  {sendingSlack === alert.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : slackSent.includes(alert.id) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <MessageSquare className="w-3 h-3" />
                  )}
                  {slackSent.includes(alert.id) ? "Sent" : "Send to Slack"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
