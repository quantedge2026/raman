import { Router } from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

import ProposalRequest from "../models/ProposalRequest.js";
import { validate } from "../middleware/validate.js";
import { requireAdmin } from "../middleware/auth.js";
import { sendEmail, renderNotificationHtml } from "../utils/sendEmail.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please try again later." },
});

// POST /api/proposals — public submission from the College Solutions page form.
router.post(
  "/",
  submitLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("designation").trim().notEmpty().withMessage("Designation is required"),
    body("institution").trim().notEmpty().withMessage("Institution is required"),
    body("institutionType").trim().notEmpty().withMessage("Institution type is required"),
    body("email").trim().isEmail().withMessage("A valid email is required"),
    body("phone").trim().isLength({ min: 7 }).withMessage("A valid phone number is required"),
    body("students").isInt({ min: 1 }).withMessage("Number of students is required").toInt(),
    body("program").trim().notEmpty().withMessage("Program / course is required"),
    body("trainingRequirement")
      .isArray({ min: 1 })
      .withMessage("Select at least one training requirement"),
    body("mode").trim().notEmpty().withMessage("Preferred mode is required"),
    body("duration").trim().notEmpty().withMessage("Preferred duration is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const {
        name,
        designation,
        institution,
        institutionType,
        email,
        phone,
        students,
        program,
        trainingRequirement,
        mode,
        duration,
        message,
      } = req.body;

      const doc = await ProposalRequest.create({
        name,
        designation,
        institution,
        institutionType,
        email,
        phone,
        students: students || null,
        program,
        trainingRequirement: trainingRequirement || [],
        mode,
        duration,
        message,
      });

      sendEmail({
        subject: `New Proposal Request — ${institution}`,
        html: renderNotificationHtml("New Proposal Request", {
          Name: name,
          Designation: designation,
          Institution: institution,
          "Institution Type": institutionType,
          Email: email,
          Phone: phone,
          "Number of Students": students,
          "Program / Course": program,
          "Training Requirement": (trainingRequirement || []).join(", "),
          "Preferred Mode": mode,
          "Preferred Duration": duration,
          Message: message,
        }),
        replyTo: email,
      }).catch((err) => console.error("Failed to send proposal notification email:", err));

      res.status(201).json({ id: doc._id, message: "Proposal request received." });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/proposals — admin: list, newest first, optional ?status= filter.
router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      ProposalRequest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      ProposalRequest.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/proposals/:id — admin: update status/notes.
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

      const doc = await ProposalRequest.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      if (!doc) return res.status(404).json({ error: "Not found." });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/proposals/:id — admin.
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const doc = await ProposalRequest.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    next(err);
  }
});

export default router;
