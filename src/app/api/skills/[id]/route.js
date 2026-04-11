import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Skill } from "@/models/Skill";
import { skillSchema } from "@/lib/validation";

export async function PUT(request, { params }) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const body = await request.json();
    const parsed = skillSchema.partial().safeParse(body);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectToDatabase();
    const skill = await Skill.findByIdAndUpdate(params.id, parsed.data, { new: true });

    if (!skill) {
      return json({ error: "Skill not found" }, { status: 404 });
    }

    return json({ skill });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    await connectToDatabase();
    const skill = await Skill.findByIdAndDelete(params.id);

    if (!skill) {
      return json({ error: "Skill not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}