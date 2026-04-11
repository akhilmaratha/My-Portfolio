import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Project } from "@/models/Project";
import { projectSchema } from "@/lib/validation";

export async function PUT(request, { params }) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const body = await request.json();
    const parsed = projectSchema.partial().safeParse(body);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectToDatabase();
    const project = await Project.findByIdAndUpdate(
      params.id,
      { ...parsed.data, ...(parsed.data.status ? { status: parsed.data.status.toLowerCase() } : {}) },
      { new: true },
    );

    if (!project) {
      return json({ error: "Project not found" }, { status: 404 });
    }

    return json({ project });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    await connectToDatabase();
    const project = await Project.findByIdAndDelete(params.id);

    if (!project) {
      return json({ error: "Project not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}