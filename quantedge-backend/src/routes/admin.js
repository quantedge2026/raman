import { Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import rateLimit from "express-rate-limit";

import AdminUser from "../models/AdminUser.js";
import ProposalRequest from "../models/ProposalRequest.js";
import ContactMessage from "../models/ContactMessage.js";
import DemoRequest from "../models/DemoRequest.js";
import { validate } from "../middleware/validate.js";
import { requireAdmin } from "../middleware/auth.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Please try again later." },
});

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests. Please try again later." },
});

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// POST /api/admin/login
router.post(
  "/login",
  loginLimiter,
  [
    body("email").trim().isEmail(),
    body("password").notEmpty(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await AdminUser.findOne({ email: email.toLowerCase() });
      if (!user || !(await user.verifyPassword(password))) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const token = jwt.sign(
        { sub: user._id.toString(), email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      res.json({ token, admin: { name: user.name, email: user.email } });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/admin/forgot-password — { email } -> always a generic success
// response, so this endpoint never reveals whether an email is registered.
router.post(
  "/forgot-password",
  resetLimiter,
  [body("email").trim().isEmail().withMessage("A valid email is required")],
  validate,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await AdminUser.findOne({ email: email.toLowerCase() });

      if (user) {
        const rawToken = crypto.randomBytes(32).toString("hex");
        user.resetTokenHash = hashToken(rawToken);
        user.resetTokenExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
        await user.save();

        const siteUrl = (process.env.CLIENT_ORIGINS || "").split(",")[0] || "http://localhost:5173";
        const resetUrl = `${siteUrl}/admin/reset-password?token=${rawToken}`;

        const sent = await sendEmail({
          subject: "Reset your QuantEdge admin password",
          html: `<p>Someone requested a password reset for the QuantEdge admin panel.</p><p><a href="${resetUrl}">Click here to set a new password</a> — this link expires in 30 minutes.</p><p>If you didn't request this, you can ignore this email.</p>`,
        }).catch((err) => {
          console.error("Failed to send password reset email:", err);
          return { skipped: true };
        });

        // Resend isn't configured yet in this environment — print the link
        // so the reset flow is still testable end-to-end during development.
        if (sent?.skipped) {
          console.log(`[password reset link — email not configured] ${resetUrl}`);
        }
      }

      res.json({ message: "If that email is registered, a reset link has been sent." });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/admin/reset-password — { token, password } -> sets a new password.
router.post(
  "/reset-password",
  resetLimiter,
  [
    body("token").trim().notEmpty().withMessage("Reset token is required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const tokenHash = hashToken(token);

      const user = await AdminUser.findOne({
        resetTokenHash: tokenHash,
        resetTokenExpires: { $gt: new Date() },
      }).select("+resetTokenHash +resetTokenExpires");

      if (!user) {
        return res.status(400).json({ error: "This reset link is invalid or has expired." });
      }

      user.passwordHash = await AdminUser.hashPassword(password);
      user.resetTokenHash = undefined;
      user.resetTokenExpires = undefined;
      await user.save();

      res.json({ message: "Password updated. You can now log in." });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/admin/me — confirms a token is still valid, returns admin identity.
router.get("/me", requireAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

// GET /api/admin/dashboard-stats — counts across all three lead collections.
router.get("/dashboard-stats", requireAdmin, async (req, res, next) => {
  try {
    const [proposals, contacts, demos, newProposals, newContacts, newDemos] = await Promise.all([
      ProposalRequest.countDocuments(),
      ContactMessage.countDocuments(),
      DemoRequest.countDocuments(),
      ProposalRequest.countDocuments({ status: "new" }),
      ContactMessage.countDocuments({ status: "new" }),
      DemoRequest.countDocuments({ status: "new" }),
    ]);

    res.json({
      totals: { proposals, contacts, demos, all: proposals + contacts + demos },
      new: {
        proposals: newProposals,
        contacts: newContacts,
        demos: newDemos,
        all: newProposals + newContacts + newDemos,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
