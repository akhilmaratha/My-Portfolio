import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Skill } from "@/models/Skill";
import { skillSchema } from "@/lib/validation";

export async function PUT(request, context) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const { id } = await context.params;

    const body = await request.json();
    const parsed = skillSchema.partial().safeParse(body);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectToDatabase();
    const skill = await Skill.findByIdAndUpdate(id, parsed.data, { returnDocument: "after" });

    if (!skill) {
      return json({ error: "Skill not found" }, { status: 404 });
    }

    return json({ skill });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const { id } = await context.params;

    await connectToDatabase();
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return json({ error: "Skill not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}