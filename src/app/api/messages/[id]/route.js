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
      console.info("[Admin][messages] attempting thank-you email", {
        messageId: id,
        to: message.email,
        subject: message.subject,
        alreadyRead: message.read,
        alreadySent: message.thankYouSent,
      });
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
        console.info("[Admin][messages] thank-you email sent", {
          messageId: id,
          to: message.email,
          subject: message.subject,
        });
      } else {
        console.warn("[Admin][messages] thank-you email skipped", {
          messageId: id,
          to: message.email,
          subject: message.subject,
          reason: thankYouSkipReason,
        });
      }
    }

    await message.save();

    console.info("[Admin][messages] updated read state", {
      messageId: id,
      read: message.read,
      thankYouSent: message.thankYouSent,
    });

    return json({ message, thankYouSent, thankYouSkipped, thankYouSkipReason });
  } catch (error) {
    console.error("[Admin][messages] update failed", {
      error: error.message,
    });
    return json({ error: error.message }, { status: 500 });
  }
}
