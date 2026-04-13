import { connectToDatabase } from "@/lib/db";
import { json } from "@/lib/api-utils";
import { sendContactEmail } from "@/lib/mail";
import { contactSchema } from "@/lib/validation";
import { Message } from "@/models/Message";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectToDatabase();
    const message = await Message.create({ ...parsed.data, read: false });

    console.info("[Contact] stored message and sending Brevo notification", {
      messageId: message._id.toString(),
      to: process.env.BREVO_TO_EMAIL || null,
      from: parsed.data.email,
      subject: parsed.data.subject,
    });

    const sendResult = await sendContactEmail(parsed.data);

    if (sendResult?.skipped) {
      console.warn("[Contact] Brevo notification skipped", {
        messageId: message._id.toString(),
        reason: sendResult.reason || "missing Brevo config or recipients",
      });
    } else {
      console.info("[Contact] Brevo notification sent", {
        messageId: message._id.toString(),
      });
    }

    return json({ success: true, messageId: message._id }, { status: 201 });
  } catch (error) {
    console.error("[Contact] request failed", {
      error: error.message,
    });
    return json({ error: error.message }, { status: 500 });
  }
}