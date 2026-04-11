import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    category: {
      type: String,
      enum: ["frontend", "backend", "devops"],
      default: "frontend",
    },
    icon: { type: String, default: "◌" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
