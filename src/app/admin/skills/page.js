import { connectToDatabase } from "@/lib/db";
import { Skill } from "@/models/Skill";
import { AdminHeader } from "@/components/admin/admin-header";
import { SkillsManager } from "@/components/admin/skills-manager";

export default async function AdminSkillsPage() {
  const skills = process.env.MONGODB_URI
    ? (await (async () => {
        await connectToDatabase();
        return Skill.find({}).sort({ order: 1 }).lean();
      })())
    : [];

  return (
    <div className="space-y-8">
      <AdminHeader title="Skills" description="Drag to reorder and update skill percentages inline." />
      <SkillsManager initialSkills={JSON.parse(JSON.stringify(skills))} />
    </div>
  );
}