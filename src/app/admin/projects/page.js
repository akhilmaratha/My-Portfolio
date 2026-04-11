import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProjectsManager } from "@/components/admin/projects-manager";

export default async function AdminProjectsPage() {
  const projects = process.env.MONGODB_URI
    ? (await (async () => {
        await connectToDatabase();
        return Project.find({}).sort({ createdAt: -1 }).lean();
      })())
    : [];

  return (
    <div className="space-y-8">
      <AdminHeader title="Projects" description="Create, edit, and remove portfolio projects." />
      <ProjectsManager initialProjects={JSON.parse(JSON.stringify(projects))} />
    </div>
  );
}