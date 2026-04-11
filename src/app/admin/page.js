import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";
import { Message } from "@/models/Message";
import { Skill } from "@/models/Skill";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/admin/stat-card";

export default async function AdminDashboardPage() {
  const hasDatabase = Boolean(process.env.MONGODB_URI);
  let projectCount = 0;
  let messageCount = 0;
  let skillCount = 0;
  let projects = [];
  let messages = [];
  let skills = [];

  if (hasDatabase) {
    await connectToDatabase();

    [projectCount, messageCount, skillCount, projects, messages, skills] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments(),
      Skill.countDocuments(),
      Project.find({}).sort({ createdAt: -1 }).limit(5).lean(),
      Message.find({}).sort({ createdAt: -1 }).limit(5).lean(),
      Skill.find({}).sort({ order: 1 }).lean(),
    ]);
  }

  const stats = [
    { label: "Total Views", value: projects.reduce((sum, project) => sum + (project.views || 0), 0), detail: "Across all projects" },
    { label: "Projects", value: projectCount, detail: "Stored in MongoDB" },
    { label: "Messages", value: messageCount, detail: "Contact submissions" },
    { label: "Years Exp", value: 4, detail: "Portfolio positioning" },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader title="Dashboard" description="Monitor portfolio content, recent activity, and live skill levels from one place." />

      <div className="grid gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-white/10 bg-white/3 p-6">
          <h2 className="font-syne text-2xl font-black text-white">Recent Projects</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="text-white/45">
                <tr className="border-b border-white/10">
                  <th className="py-3">Name</th>
                  <th className="py-3">Stack</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Views</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id.toString()} className="border-b border-white/5 text-white/75">
                    <td className="py-4">{project.title}</td>
                    <td className="py-4">{(project.tags || []).join(" / ")}</td>
                    <td className="py-4 capitalize">{project.status}</td>
                    <td className="py-4">{project.views || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/3 p-6">
          <h2 className="font-syne text-2xl font-black text-white">Activity Feed</h2>
          <div className="mt-6 space-y-4">
            {messages.slice(0, 5).map((message) => (
              <div key={message._id.toString()} className="rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-sm text-white">New message from {message.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">{message.subject}</p>
              </div>
            ))}
            {skills.slice(0, 4).map((skill) => (
              <div key={skill._id.toString()} className="rounded-2xl border border-white/10 px-4 py-3">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/5">
                  <div className="h-2 rounded-full bg-linear-to-r from-[#00ffaa] to-[#00c8ff]" style={{ width: `${skill.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}