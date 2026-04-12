import { connectToDatabase } from "@/lib/db";
import { Profile } from "@/models/Profile";
import { socials as fallbackSocials } from "@/lib/portfolio";

const fallbackProfile = {
  name: "Akhil Maratha",
  role: "MERN Developer",
  bio: "I design and build high-conversion MERN experiences with sharp motion, disciplined architecture, and production-ready admin tooling.",
  socialLinks: fallbackSocials,
};

export async function getPublicProfile() {
  if (!process.env.MONGODB_URI) {
    return fallbackProfile;
  }

  try {
    await connectToDatabase();
    const profile = await Profile.findOne({}).lean();

    if (!profile) {
      return fallbackProfile;
    }

    const socialLinks =
      Array.isArray(profile.socialLinks) && profile.socialLinks.length > 0
        ? profile.socialLinks.map((item) => ({
            label: String(item?.label || ""),
            href: String(item?.href || ""),
          }))
        : fallbackProfile.socialLinks;

    return {
      name: String(profile.name || fallbackProfile.name),
      role: String(profile.role || fallbackProfile.role),
      bio: String(profile.bio || fallbackProfile.bio),
      socialLinks,
    };
  } catch {
    return fallbackProfile;
  }
}