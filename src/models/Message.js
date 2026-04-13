import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
    thankYouSent: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
