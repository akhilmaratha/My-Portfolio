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

    await sendContactEmail(parsed.data);

    return json({ success: true, messageId: message._id }, { status: 201 });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}