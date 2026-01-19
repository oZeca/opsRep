// Data Service Layer
// Switches between mock and real data based on configuration

const config = require("../config");
const mockData = require("../data/mockData");

// Real data service stubs - implement these when connecting to actual sources
const realDataService = {
  async getUser() {
    throw new Error(
      "Real data service not implemented - connect to your auth provider",
    );
  },
  async getIntegrations() {
    throw new Error(
      "Real data service not implemented - connect to your integration manager",
    );
  },
  async getSummaries() {
    throw new Error(
      "Real data service not implemented - connect to AI summary generator",
    );
  },
  async getKPIs() {
    throw new Error(
      "Real data service not implemented - connect to your data sources",
    );
  },
  async getAnomalies() {
    throw new Error(
      "Real data service not implemented - connect to anomaly detection service",
    );
  },
  async askQuestion(question) {
    throw new Error(
      "Real data service not implemented - connect to RAG pipeline",
    );
  },
};

// Public API
const dataService = {
  async getUser() {
    if (config.useMockData) {
      return mockData.mockUser;
    }
    return realDataService.getUser();
  },

  async getIntegrations() {
    if (config.useMockData) {
      return mockData.mockIntegrations;
    }
    return realDataService.getIntegrations();
  },

  async updateIntegration(integrationId, updates) {
    if (config.useMockData) {
      const integration = mockData.mockIntegrations.find(
        (i) => i.id === integrationId,
      );
      if (integration) {
        Object.assign(integration, updates);
        return integration;
      }
      throw new Error("Integration not found");
    }
    return realDataService.updateIntegration(integrationId, updates);
  },

  async getSummaries(type = "all") {
    if (config.useMockData) {
      if (type === "all") {
        return mockData.mockSummaries;
      }
      return mockData.mockSummaries.filter((s) => s.type === type);
    }
    return realDataService.getSummaries(type);
  },

  async getSummaryById(id) {
    if (config.useMockData) {
      return mockData.mockSummaries.find((s) => s.id === id) || null;
    }
    return realDataService.getSummaryById(id);
  },

  async getKPIs(category = "all") {
    if (config.useMockData) {
      if (category === "all") {
        return mockData.mockKPIs;
      }
      return mockData.mockKPIs.filter((k) => k.category === category);
    }
    return realDataService.getKPIs(category);
  },

  async getAnomalies(status = "all") {
    if (config.useMockData) {
      if (status === "all") {
        return mockData.mockAnomalies;
      }
      return mockData.mockAnomalies.filter((a) => a.status === status);
    }
    return realDataService.getAnomalies(status);
  },

  async askQuestion(question) {
    if (config.useMockData) {
      // Simulate AI response with mock data
      const similarQuestion = mockData.mockQAHistory.find((qa) =>
        qa.question
          .toLowerCase()
          .includes(question.toLowerCase().split(" ")[0]),
      );

      if (similarQuestion) {
        return {
          ...similarQuestion,
          id: `qa_${Date.now()}`,
          question,
          askedAt: new Date().toISOString(),
        };
      }

      // Generate a generic response for questions not in mock data
      return {
        id: `qa_${Date.now()}`,
        question,
        answer: `Based on the available data from Slack, Notion, and Stripe integrations, I analyzed your question: "${question}"\n\n**Summary**: This is a mock response. In production, this would query your integrated data sources using RAG (Retrieval Augmented Generation) to provide accurate, contextual answers based on your actual business data.\n\n**Data Sources Checked**:\n- Slack: 12 channels, 4,523 messages\n- Notion: 156 pages, 8 databases\n- Stripe: 892 transactions`,
        sources: ["Slack", "Notion", "Stripe"],
        askedAt: new Date().toISOString(),
        confidence: 0.85,
      };
    }
    return realDataService.askQuestion(question);
  },

  async getQAHistory() {
    if (config.useMockData) {
      return mockData.mockQAHistory;
    }
    return realDataService.getQAHistory();
  },
};

module.exports = dataService;
