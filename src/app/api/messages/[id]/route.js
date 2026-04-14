import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { sendThankYouEmail } from "@/lib/mail";
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
    const message = await Message.findById(id);

    if (!message) {
      return json({ error: "Message not found" }, { status: 404 });
    }

    const shouldMarkRead = Boolean(body.read);
    const shouldSendThankYou = shouldMarkRead && !message.thankYouSent;
    let thankYouSent = false;
    let thankYouSkipped = false;
    let thankYouSkipReason = null;

    message.read = shouldMarkRead;

    if (shouldSendThankYou) {
      const sendResult = await sendThankYouEmail({
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
      });
      thankYouSkipped = Boolean(sendResult?.skipped);
      thankYouSkipReason = sendResult?.reason || null;
      thankYouSent = !thankYouSkipped;

      if (thankYouSent) {
        message.thankYouSent = true;
      }
    }

    await message.save();

    return json({ message, thankYouSent, thankYouSkipped, thankYouSkipReason });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
