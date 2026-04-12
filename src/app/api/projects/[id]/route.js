import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Project } from "@/models/Project";
import { projectSchema } from "@/lib/validation";

export async function PUT(request, context) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const { id } = await context.params;

    const body = await request.json();
    const parsed = projectSchema.partial().safeParse(body);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectToDatabase();
    const project = await Project.findByIdAndUpdate(
      id,
      { ...parsed.data, ...(parsed.data.status ? { status: parsed.data.status.toLowerCase() } : {}) },
      { returnDocument: "after" },
    );

    if (!project) {
      return json({ error: "Project not found" }, { status: 404 });
    }

    return json({ project });
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
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return json({ error: "Project not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}