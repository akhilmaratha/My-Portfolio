"use client";

import { useMemo, useState } from "react";
import { LoaderCircle, PencilLine, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  githubUrl: "",
  liveUrl: "",
  status: "draft",
  featured: false,
};

export function ProjectsManager({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sortedProjects = useMemo(() => projects, [projects]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function beginEdit(project) {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      tags: (project.tags || []).join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      status: project.status || "draft",
      featured: Boolean(project.featured),
    });
  }

  async function saveProject(event) {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    const response = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      const updatedProject = data.project;

      setProjects((current) =>
        editingId ? current.map((project) => (project._id === editingId ? updatedProject : project)) : [updatedProject, ...current],
      );
      setForm(emptyForm);
      setEditingId(null);
    }

    setLoading(false);
  }

  async function removeProject(id) {
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (response.ok) {
      setProjects((current) => current.filter((project) => project._id !== id));
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={saveProject} className="rounded-3xl border border-white/10 bg-white/3 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-syne text-2xl font-black text-white">{editingId ? "Edit Project" : "Add Project"}</h2>
          <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="text-xs uppercase tracking-[0.24em] text-white/45 hover:text-white">
            Reset
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Name"><input name="title" value={form.title} onChange={updateField} className={inputClass} /></Field>
          <Field label="Description"><textarea name="description" rows={5} value={form.description} onChange={updateField} className={inputClass} /></Field>
          <Field label="Tech Tags"><input name="tags" value={form.tags} onChange={updateField} className={inputClass} placeholder="React, Node.js, MongoDB" /></Field>
          <Field label="GitHub URL"><input name="githubUrl" value={form.githubUrl} onChange={updateField} className={inputClass} /></Field>
          <Field label="Live URL"><input name="liveUrl" value={form.liveUrl} onChange={updateField} className={inputClass} /></Field>
          <Field label="Status">
            <select name="status" value={form.status} onChange={updateField} className={inputClass}>
              <option value="live">Live</option>
              <option value="wip">WIP</option>
              <option value="draft">Draft</option>
            </select>
          </Field>
          <label className="flex items-center gap-3 text-sm text-white/75">
            <input type="checkbox" name="featured" checked={form.featured} onChange={updateField} className="h-4 w-4 rounded border-white/20 bg-transparent" />
            Featured project
          </label>
        </div>

        <button disabled={loading} type="submit" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#00ffaa] px-5 py-3 font-mono text-sm uppercase tracking-[0.24em] text-[#05070a] disabled:opacity-60">
          {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      <div className="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 className="font-syne text-2xl font-black text-white">All Projects</h2>
        <div className="mt-6 space-y-4">
          {sortedProjects.map((project) => (
            <article key={project._id} className="rounded-2xl border border-white/10 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-[#00c8ff]">{project.status}</div>
                  <h3 className="mt-2 font-syne text-xl font-black text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(project.tags || []).map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{tag}</span>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => beginEdit(project)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-[#00ffaa]">
                    <PencilLine className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => removeProject(project._id)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-[#05070a] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#00ffaa]/50";