"use client";

import { useMemo, useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";

export function SkillsManager({ initialSkills }) {
  const [skills, setSkills] = useState(initialSkills);
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(80);
  const [category, setCategory] = useState("frontend");
  const [icon, setIcon] = useState("◌");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const ids = useMemo(() => skills.map((skill) => skill._id), [skills]);

  async function addSkill(event) {
    event.preventDefault();
    const payload = { name, percentage: Number(percentage), category, icon, order: skills.length };
    const response = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      setSkills((current) => [...current, data.skill]);
      setName("");
      setPercentage(80);
      setIcon("◌");
    }
  }

  async function updateSkill(id, patch) {
    const response = await fetch(`/api/skills/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    if (response.ok) {
      const data = await response.json();
      setSkills((current) => current.map((skill) => (skill._id === id ? data.skill : skill)));
    }
  }

  async function removeSkill(id) {
    const response = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (response.ok) {
      setSkills((current) => current.filter((skill) => skill._id !== id));
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = skills.findIndex((skill) => skill._id === active.id);
    const newIndex = skills.findIndex((skill) => skill._id === over.id);
    const reordered = arrayMove(skills, oldIndex, newIndex).map((skill, index) => ({ ...skill, order: index }));
    setSkills(reordered);

    reordered.forEach((skill, index) => {
      updateSkill(skill._id, { order: index });
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={addSkill} className="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 className="font-syne text-2xl font-black text-white">Add Skill</h2>
        <div className="mt-6 space-y-4">
          <Field label="Name"><input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} /></Field>
          <Field label="Percentage"><input type="number" min="0" max="100" value={percentage} onChange={(event) => setPercentage(event.target.value)} className={inputClass} /></Field>
          <Field label="Category">
            <select value={category} onChange={(event) => setCategory(event.target.value)} className={inputClass}>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="devops">DevOps</option>
            </select>
          </Field>
          <Field label="Icon"><input value={icon} onChange={(event) => setIcon(event.target.value)} className={inputClass} /></Field>
        </div>
        <button type="submit" className="mt-6 inline-flex items-center rounded-full bg-[#00ffaa] px-5 py-3 font-mono text-sm uppercase tracking-[0.24em] text-[#05070a]">
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </button>
      </form>

      <div className="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 className="font-syne text-2xl font-black text-white">Reorder Skills</h2>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="mt-6 space-y-3">
              {skills.map((skill) => (
                <SkillRow key={skill._id} skill={skill} onUpdate={updateSkill} onDelete={removeSkill} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function SkillRow({ skill, onUpdate, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: skill._id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex flex-col gap-3 rounded-2xl border border-white/10 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button type="button" {...attributes} {...listeners} className="cursor-grab rounded-full border border-white/10 p-2 text-white/50">
          <GripVertical className="h-4 w-4" />
        </button>
        <div>
          <input defaultValue={skill.name} onBlur={(event) => onUpdate(skill._id, { name: event.target.value })} className="w-full bg-transparent font-syne text-xl font-black text-white outline-none" />
          <p className="text-xs uppercase tracking-[0.24em] text-white/40">{skill.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" defaultValue={skill.percentage} onBlur={(event) => onUpdate(skill._id, { percentage: Number(event.target.value) })} className="w-20 rounded-full border border-white/10 bg-[#05070a] px-3 py-2 text-sm text-white outline-none" />
        <button type="button" onClick={() => onDelete(skill._id)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-red-400">
          <Trash2 className="h-4 w-4" />
        </button>
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
  "w-full rounded-2xl border border-white/10 bg-[#05070a] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#00ffaa]/50";