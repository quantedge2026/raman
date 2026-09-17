import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
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

const PORT = process.env.PORT || 5000;

// DB connection failure no longer stops the server — routes that don't touch
// the database (like /api/chat) still work, and form-submission routes fail
// gracefully per-request instead of taking the whole API down.
connectDB().catch((err) => {
  console.error("MongoDB not connected:", err.message);
});

app.listen(PORT, () => console.log(`QuantEdge API listening on port ${PORT}`));
