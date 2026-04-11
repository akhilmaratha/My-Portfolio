import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <AdminHeader title="Settings" description="Environment, deployment, and operational settings live here." />
      <div className="grid gap-4 md:grid-cols-2">
        <SettingCard title="Authentication" detail="NextAuth credentials login with middleware protection." />
        <SettingCard title="Database" detail="MongoDB singleton connection with Mongoose models." />
        <SettingCard title="Email" detail="Brevo delivery for contact form submissions." />
        <SettingCard title="Media" detail="Profile image can be stored externally or updated through the profile form." />
      </div>
    </div>
  );
}

function SettingCard({ title, detail }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-6">
      <h2 className="font-syne text-2xl font-black text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/65">{detail}</p>
    </div>
  );
}