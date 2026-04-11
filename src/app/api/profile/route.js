import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Profile } from "@/models/Profile";

const defaultProfile = {
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

export async function GET() {
  try {
    await connectToDatabase();
    const profile = (await Profile.findOne({}).lean()) || defaultProfile;
    return json({ profile });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const body = await request.json();
    await connectToDatabase();
    const profile = await Profile.findOneAndUpdate({}, body, { new: true, upsert: true, setDefaultsOnInsert: true });
    return json({ profile });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}