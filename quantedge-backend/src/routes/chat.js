import { Router } from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

import { validate } from "../middleware/validate.js";
import { getChatReply } from "../utils/aiChat.js";

const router = Router();

const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: { error: "Too many messages. Please slow down and try again shortly." },
});

const MAX_HISTORY_TURNS = 12;

// POST /api/chat — { message, history? } -> { reply }
// history is the prior conversation as [{ role: "user"|"assistant", content }],
// oldest first; the widget sends it back each turn since this API is stateless.
router.post(
  "/",
  chatLimiter,
  [
    body("message").trim().isLength({ min: 1, max: 800 }).withMessage("Message must be 1-800 characters"),
    body("history").optional().isArray({ max: MAX_HISTORY_TURNS * 2 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { message, history = [] } = req.body;

      const cleanHistory = history
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.length <= 800
        )
        .slice(-MAX_HISTORY_TURNS * 2)
        .map((m) => ({ role: m.role, content: m.content }));

      const reply = await getChatReply([...cleanHistory, { role: "user", content: message }]);

      res.json({ reply });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
