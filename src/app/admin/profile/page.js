import { connectToDatabase } from "@/lib/db";
import { Profile } from "@/models/Profile";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProfileManager } from "@/components/admin/profile-manager";

const fallbackProfile = {
  name: "dev.name",
  bio: "Senior MERN developer building cinematic interfaces and reliable backend systems.",
  location: "Remote, global",
  role: "Senior MERN Developer",
  imageUrl: "",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Email", href: "mailto:hello@example.com" },
    { label: "Twitter", href: "https://x.com/" },
  ],
};

export default async function AdminProfilePage() {
  const profile = process.env.MONGODB_URI
    ? (await (async () => {
        await connectToDatabase();
        return (await Profile.findOne({}).lean()) || fallbackProfile;
      })())
    : fallbackProfile;

  return (
    <div className="space-y-8">
      <AdminHeader title="Profile" description="Edit the portfolio identity, summary copy, and social links." />
      <ProfileManager initialProfile={JSON.parse(JSON.stringify(profile))} />
    </div>
  );
}