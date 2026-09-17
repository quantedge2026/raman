import { Router } from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

import ContactMessage from "../models/ContactMessage.js";
import { validate } from "../middleware/validate.js";
import { requireAdmin } from "../middleware/auth.js";
// Email notifications are disabled for now — re-enable by uncommenting this
// import and the sendEmail(...) call below once Resend is set up.
// import { sendEmail, renderNotificationHtml } from "../utils/sendEmail.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please try again later." },
});

// POST /api/contact — public submission from the Contact page form.
router.post(
  "/",
  submitLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("A valid email is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
    body("phone").optional().trim(),
    body("institution").optional().trim(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, phone, institution, message } = req.body;

      const doc = await ContactMessage.create({ name, email, phone, institution, message });

      // sendEmail({
      //   subject: `New Contact Message — ${name}`,
      //   html: renderNotificationHtml("New Contact Message", {
      //     Name: name,
      //     Email: email,
      //     Phone: phone,
      //     Institution: institution,
      //     Message: message,
      //   }),
      //   replyTo: email,
      // }).catch((err) => console.error("Failed to send contact notification email:", err));

      res.status(201).json({ id: doc._id, message: "Message received." });
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
      ContactMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      ContactMessage.countDocuments(filter),
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
    body("status").optional().isIn(["new", "contacted", "converted", "closed"]),
    body("notes").optional().isString(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const updates = {};
      if (req.body.status) updates.status = req.body.status;
      if (req.body.notes !== undefined) updates.notes = req.body.notes;

      const doc = await ContactMessage.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!doc) return res.status(404).json({ error: "Not found." });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const doc = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    next(err);
  }
});

export default router;
