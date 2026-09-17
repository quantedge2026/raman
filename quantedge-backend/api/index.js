// Vercel serverless entry point — wraps the same Express app used locally
// and on Render. vercel.json routes every request here.
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    // Routes that don't touch the database (like /api/chat) still work;
    // DB-backed routes will fail per-request instead of the whole function
    // crashing.
    console.error("MongoDB not connected:", err.message);
  }
  return app(req, res);
}
