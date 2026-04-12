import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Message } from "@/models/Message";

export async function DELETE(request, context) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const { id } = await context.params;

    await connectToDatabase();
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return json({ error: "Message not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, context) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const { id } = await context.params;

    const body = await request.json();
    await connectToDatabase();
    const message = await Message.findByIdAndUpdate(id, { read: Boolean(body.read) }, { returnDocument: "after" });

    if (!message) {
      return json({ error: "Message not found" }, { status: 404 });
    }

    return json({ message });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
