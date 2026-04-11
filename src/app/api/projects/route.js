import { connectToDatabase } from "@/lib/db";
import { json, requireAdmin } from "@/lib/api-utils";
import { Project } from "@/models/Project";
import { projectSchema } from "@/lib/validation";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ featured: -1, createdAt: -1 }).lean();
    return json({ projects });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const adminError = await requireAdmin(request);
    if (adminError) return adminError;

    const body = await request.json();
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectToDatabase();
    const project = await Project.create({
      ...parsed.data,
      status: parsed.data.status.toLowerCase(),
    });

    return json({ project }, { status: 201 });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}