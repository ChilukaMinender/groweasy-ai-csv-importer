import express, { Application } from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.routes";
import importRoutes from "./routes/import.routes";

const app: Application = express();

// Enable CORS for local development and production
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GrowEasy Backend is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api", uploadRoutes);
app.use("/api", importRoutes);

export default app;