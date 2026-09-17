// The Express app itself — middleware, CORS, and routes only. No
// app.listen() and no DB connection here, so this same app can be reused by
// both the always-running server (src/server.js, for local dev + Render) and
// the Vercel serverless entry point (api/index.js).
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

import proposalsRouter from "./routes/proposals.js";
import contactRouter from "./routes/contact.js";
import demoRouter from "./routes/demo.js";
import adminRouter from "./routes/admin.js";
import chatRouter from "./routes/chat.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "50kb" }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

const allowedOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow no-origin requests (server-to-server, curl, health checks).
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/proposals", proposalsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/demo", demoRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
