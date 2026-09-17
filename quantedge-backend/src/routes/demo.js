import { Router } from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

import DemoRequest from "../models/DemoRequest.js";
import { validate } from "../middleware/validate.js";
import { requireAdmin } from "../middleware/auth.js";
import { sendEmail, renderNotificationHtml } from "../utils/sendEmail.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please try again later." },
});

// POST /api/demo — public submission for "Book a Demo Session".
router.post(
  "/",
  submitLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("A valid email is required"),
    body("phone").trim().isLength({ min: 7 }).withMessage("A valid phone number is required"),
    body("institution").optional().trim(),
    body("preferredDate").optional().trim(),
    body("preferredTimeSlot").optional().trim(),
    body("attendees").optional({ values: "falsy" }).isInt({ min: 1 }).toInt(),
    body("message").optional().trim(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        institution,
        preferredDate,
        preferredTimeSlot,
        attendees,
        message,
      } = req.body;

      const doc = await DemoRequest.create({
        name,
        email,
        phone,
        institution,
        preferredDate,
        preferredTimeSlot,
        attendees: attendees || null,
        message,
      });

      sendEmail({
        subject: `New Demo Request — ${name}`,
        html: renderNotificationHtml("New Demo Session Request", {
          Name: name,
          Email: email,
          Phone: phone,
          Institution: institution,
          "Preferred Date": preferredDate,
          "Preferred Time Slot": preferredTimeSlot,
          Attendees: attendees,
          Message: message,
        }),
        replyTo: email,
      }).catch((err) => console.error("Failed to send demo notification email:", err));

      res.status(201).json({ id: doc._id, message: "Demo request received." });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      DemoRequest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      DemoRequest.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:id",
  requireAdmin,
  [
    body("status").optional().isIn(["new", "scheduled", "completed", "closed"]),
    body("notes").optional().isString(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const updates = {};
      if (req.body.status) updates.status = req.body.status;
      if (req.body.notes !== undefined) updates.notes = req.body.notes;

      const doc = await DemoRequest.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!doc) return res.status(404).json({ error: "Not found." });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const doc = await DemoRequest.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    next(err);
  }
});

export default router;
