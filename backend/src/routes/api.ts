import { Router, Request, Response } from "express";
import dataService from "../services/dataService.js";
import * as deliveryService from "../services/deliveryService.js";

// Request with typed params
interface IdParams {
  id: string;
}

const router = Router();

// Get current user
router.get("/user", async (_req: Request, res: Response) => {
  try {
    const user = await dataService.getUser();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get all integrations
router.get("/integrations", async (_req: Request, res: Response) => {
  try {
    const integrations = await dataService.getIntegrations();
    res.json(integrations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update integration
router.patch(
  "/integrations/:id",
  async (req: Request<IdParams>, res: Response) => {
    try {
      const integration = await dataService.updateIntegration(
        req.params.id,
        req.body,
      );
      res.json(integration);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

// Get summaries
router.get("/summaries", async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const summaries = await dataService.getSummaries(
      type as string | undefined,
    );
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get single summary
router.get("/summaries/:id", async (req: Request<IdParams>, res: Response) => {
  try {
    const summary = await dataService.getSummaryById(req.params.id);
    if (!summary) {
      return res.status(404).json({ error: "Summary not found" });
    }
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get KPIs
router.get("/kpis", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const kpis = await dataService.getKPIs(category as string | undefined);
    res.json(kpis);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get anomalies
router.get("/anomalies", async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const anomalies = await dataService.getAnomalies(
      status as string | undefined,
    );
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Ask a question (Q&A endpoint)
router.post("/questions", async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }
    const answer = await dataService.askQuestion(question);
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get Q&A history
router.get("/questions", async (_req: Request, res: Response) => {
  try {
    const history = await dataService.getQAHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get all decisions
router.get("/decisions", async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const decisions = await dataService.getDecisions(
      status as string | undefined,
    );
    res.json(decisions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get decisions for a specific anomaly
router.get(
  "/anomalies/:id/decisions",
  async (req: Request<IdParams>, res: Response) => {
    try {
      const decisions = await dataService.getDecisionsForAnomaly(req.params.id);
      res.json(decisions);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

// Create a new decision
router.post("/decisions", async (req: Request, res: Response) => {
  try {
    const decision = await dataService.createDecision(req.body);
    res.status(201).json(decision);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update a decision (status, owner, etc.)
router.patch(
  "/decisions/:id",
  async (req: Request<IdParams>, res: Response) => {
    try {
      const decision = await dataService.updateDecision(
        req.params.id,
        req.body,
      );
      res.json(decision);
    } catch (error) {
      if ((error as Error).message === "Decision not found") {
        return res.status(404).json({ error: (error as Error).message });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

// Get weekly changelog (what changed this week)
router.get("/changelog/weekly", async (_req: Request, res: Response) => {
  try {
    const changelog = await dataService.getWeeklyChangelog();
    res.json(changelog);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ===== DELIVERY ROUTES =====

// Send weekly exec brief email
router.post("/delivery/weekly-brief", async (req: Request, res: Response) => {
  try {
    const { recipients } = req.body;

    // Gather all data for the brief
    const [summary, kpis, anomalies, decisions] = await Promise.all([
      dataService.getSummaries().then((s) => s[0]),
      dataService.getKPIs(),
      dataService.getAnomalies(),
      dataService.getDecisions(),
    ]);

    const result = await deliveryService.sendWeeklyBrief(
      { summary, kpis, anomalies, decisions },
      recipients || ["exec@example.com"],
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Preview weekly brief (returns HTML)
router.get(
  "/delivery/weekly-brief/preview",
  async (_req: Request, res: Response) => {
    try {
      const [summary, kpis, anomalies, decisions] = await Promise.all([
        dataService.getSummaries().then((s) => s[0]),
        dataService.getKPIs(),
        dataService.getAnomalies(),
        dataService.getDecisions(),
      ]);

      const { html } = deliveryService.generateWeeklyBriefEmail({
        summary,
        kpis,
        anomalies,
        decisions,
      });

      res.send(html);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

// Send critical alert to Slack
router.post("/delivery/slack-alert", async (req: Request, res: Response) => {
  try {
    const { anomalyId, channel } = req.body;

    const anomalies = await dataService.getAnomalies();
    const anomaly = anomalies.find((a) => a.id === anomalyId);

    if (!anomaly) {
      return res.status(404).json({ error: "Anomaly not found" });
    }

    const result = await deliveryService.sendCriticalAlertToSlack(
      anomaly,
      channel || "#ops-alerts",
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get critical alerts (high severity + high confidence)
router.get(
  "/delivery/critical-alerts",
  async (_req: Request, res: Response) => {
    try {
      const anomalies = await dataService.getAnomalies();
      const critical = anomalies.filter(deliveryService.isCriticalAlert);
      res.json(critical);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

export default router;
