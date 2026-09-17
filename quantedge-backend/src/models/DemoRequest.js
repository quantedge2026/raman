import mongoose from "mongoose";

const demoRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    institution: { type: String, trim: true, default: "" },
    preferredDate: { type: String, trim: true, default: "" },
    preferredTimeSlot: { type: String, trim: true, default: "" },
    attendees: { type: Number, default: null },
    message: { type: String, trim: true, default: "" },

    status: {
      type: String,
      enum: ["new", "scheduled", "completed", "closed"],
      default: "new",
    },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("DemoRequest", demoRequestSchema);
