import express from "express";
import cors from "cors";
import config from "./config/index.js";
import apiRoutes from "./routes/api.js";

const app = express();

// CORS - Allow all origins
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    useMockData: config.useMockData,
    timestamp: new Date().toISOString(),
  });
});

// Start server
const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`🚀 OpsRep API running on port ${port}`);
  console.log(
    `📊 Mock data mode: ${config.useMockData ? "ENABLED" : "DISABLED"}`,
  );
});
