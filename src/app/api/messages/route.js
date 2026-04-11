import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Message } from "@/models/Message";

export async function GET(request) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    await connectToDatabase();
    const messages = await Message.find({}).sort({ createdAt: -1 }).lean();
    return json({ messages });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}