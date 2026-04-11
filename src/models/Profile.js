import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    socialLinks: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);