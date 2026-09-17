import mongoose from "mongoose";

const proposalRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    institutionType: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    students: { type: Number, required: true },
    program: { type: String, required: true, trim: true },
    trainingRequirement: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Select at least one training requirement",
      },
    },
    mode: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },

    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
    },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("ProposalRequest", proposalRequestSchema);
