// Entry point for local dev and any always-running host (Render, a VPS,
// etc.) — starts the persistent HTTP server. Vercel doesn't use this file;
// it calls the app directly per-request via api/index.js instead.
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

// DB connection failure no longer stops the server — routes that don't touch
// the database (like /api/chat) still work, and form-submission routes fail
// gracefully per-request instead of taking the whole API down.
connectDB().catch((err) => {
  console.error("MongoDB not connected:", err.message);
});

app.listen(PORT, () => console.log(`QuantEdge API listening on port ${PORT}`));
