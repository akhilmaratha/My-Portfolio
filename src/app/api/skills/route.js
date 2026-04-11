import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Skill } from "@/models/Skill";
import { skillSchema } from "@/lib/validation";

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await Skill.find({}).sort({ order: 1 }).lean();
    return json({ skills });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const body = await request.json();
    const parsed = skillSchema.safeParse(body);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectToDatabase();
    const skill = await Skill.create(parsed.data);
    return json({ skill }, { status: 201 });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}