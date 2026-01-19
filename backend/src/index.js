const express = require("express");
const cors = require("cors");
const config = require("./config");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    useMockData: config.useMockData,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 OpsRep API running on http://localhost:${config.port}`);
  console.log(
    `📊 Mock data mode: ${config.useMockData ? "ENABLED" : "DISABLED"}`,
  );
});
