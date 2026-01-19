const express = require("express");
const cors = require("cors");
const config = require("./config");
const apiRoutes = require("./routes/api");

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    // Allow localhost for development
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return callback(null, true);
    }

    // Allow Vercel deployments
    if (origin.includes(".vercel.app") || origin.includes("vercel.app")) {
      return callback(null, true);
    }

    // Allow custom domain if set in environment
    if (process.env.ALLOWED_ORIGIN && origin === process.env.ALLOWED_ORIGIN) {
      return callback(null, true);
    }

    // Default: allow all in development, restrict in production
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
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
const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`🚀 OpsRep API running on port ${port}`);
  console.log(
    `📊 Mock data mode: ${config.useMockData ? "ENABLED" : "DISABLED"}`,
  );
});
