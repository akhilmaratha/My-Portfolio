import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Message } from "@/models/Message";

export async function DELETE(request, { params }) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    await connectToDatabase();
    const message = await Message.findByIdAndDelete(params.id);

    if (!message) {
      return json({ error: "Message not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const body = await request.json();
    await connectToDatabase();
    const message = await Message.findByIdAndUpdate(params.id, { read: Boolean(body.read) }, { new: true });

    if (!message) {
      return json({ error: "Message not found" }, { status: 404 });
    }

    return json({ message });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
