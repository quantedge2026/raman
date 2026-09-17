// One-time setup: explicitly creates every collection this API uses, so they
// show up in Atlas immediately instead of only appearing after the first
// real form submission. Safe to re-run — creating an existing collection is
// a no-op (caught and skipped below).
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

import ProposalRequest from "../models/ProposalRequest.js";
import ContactMessage from "../models/ContactMessage.js";
import DemoRequest from "../models/DemoRequest.js";
import AdminUser from "../models/AdminUser.js";

const models = [ProposalRequest, ContactMessage, DemoRequest, AdminUser];

async function main() {
  await connectDB();

  for (const Model of models) {
    try {
      await Model.createCollection();
      console.log(`Created collection: ${Model.collection.name}`);
    } catch (err) {
      if (err.codeName === "NamespaceExists") {
        console.log(`Already exists: ${Model.collection.name}`);
      } else {
        throw err;
      }
    }
  }

  console.log("Done.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
