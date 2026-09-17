// Creates (or updates the password of) an admin user directly in the
// database. There is intentionally no public "sign up" route for admin
// accounts — this script is the only way to create one.
//
// Usage:
//   npm run create-admin -- "Raman Tiwari" raman@quantedgecs.com "a-strong-password"

import "dotenv/config";
import { connectDB } from "../config/db.js";
import AdminUser from "../models/AdminUser.js";
import mongoose from "mongoose";

async function main() {
  const [name, email, password] = process.argv.slice(2);

  if (!name || !email || !password) {
    console.error('Usage: npm run create-admin -- "Full Name" email@example.com "password"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await AdminUser.hashPassword(password);
  const user = await AdminUser.findOneAndUpdate(
    { email: email.toLowerCase() },
    { name, email: email.toLowerCase(), passwordHash },
    { upsert: true, new: true }
  );

  console.log(`Admin ready: ${user.email} (${user.name})`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
