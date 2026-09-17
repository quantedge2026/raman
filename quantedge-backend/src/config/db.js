import mongoose from "mongoose";

// Idempotent: safe to call on every request. Local/Render call this once at
// startup; Vercel's serverless entry point calls it on every invocation, and
// this skips reconnecting when a warm Lambda instance already has a live
// connection (or one already in progress) from a previous invocation.
let connecting = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return; // already connected
  if (connecting) return connecting; // a connection attempt is already in flight

  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<user>")) {
    throw new Error(
      "MONGODB_URI is not set — copy .env.example to .env and fill in a real MongoDB Atlas connection string."
    );
  }

  mongoose.set("strictQuery", true);
  connecting = mongoose
    .connect(uri)
    .then(() => {
      console.log(`MongoDB connected: ${mongoose.connection.host}`);
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
      });
    })
    .catch((err) => {
      connecting = null; // allow retrying on the next invocation
      throw err;
    });

  return connecting;
}
