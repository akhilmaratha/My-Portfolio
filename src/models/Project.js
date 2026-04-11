import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    status: { type: String, enum: ["live", "wip", "draft"], default: "draft" },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
