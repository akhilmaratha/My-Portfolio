import { connectToDatabase } from "@/lib/db";
import { Message } from "@/models/Message";
import { AdminHeader } from "@/components/admin/admin-header";
import { MessagesManager } from "@/components/admin/messages-manager";

export default async function AdminMessagesPage() {
  const messages = process.env.MONGODB_URI
    ? (await (async () => {
        await connectToDatabase();
        return Message.find({}).sort({ createdAt: -1 }).lean();
      })())
    : [];

  return (
    <div className="space-y-8">
      <AdminHeader title="Messages" description="Review contact form submissions. Marking one as read sends a Brevo thank-you email to the sender." />
      <MessagesManager initialMessages={JSON.parse(JSON.stringify(messages))} />
    </div>
  );
}