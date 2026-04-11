"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export function ProfileManager({ initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  function updateSocialLink(index, field, value) {
    setProfile((current) => {
      const socialLinks = [...(current.socialLinks || [])];
      socialLinks[index] = { ...socialLinks[index], [field]: value };
      return { ...current, socialLinks };
    });
  }

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data.profile);
    }

    setSaving(false);
  }

  return (
    <form onSubmit={saveProfile} className="space-y-6 rounded-3xl border border-white/10 bg-white/3 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name"><input name="name" value={profile.name || ""} onChange={updateField} className={inputClass} /></Field>
        <Field label="Role"><input name="role" value={profile.role || ""} onChange={updateField} className={inputClass} /></Field>
        <Field label="Location"><input name="location" value={profile.location || ""} onChange={updateField} className={inputClass} /></Field>
        <Field label="Image URL"><input name="imageUrl" value={profile.imageUrl || ""} onChange={updateField} className={inputClass} /></Field>
      </div>

      <Field label="Bio"><textarea name="bio" rows={6} value={profile.bio || ""} onChange={updateField} className={inputClass} /></Field>

      <div className="space-y-4 rounded-2xl border border-white/10 p-5">
        <h2 className="font-syne text-xl font-black text-white">Social Links</h2>
        {(profile.socialLinks || []).map((link, index) => (
          <div key={link.label + index} className="grid gap-3 md:grid-cols-[180px_1fr]">
            <input value={link.label} onChange={(event) => updateSocialLink(index, "label", event.target.value)} className={inputClass} />
            <input value={link.href} onChange={(event) => updateSocialLink(index, "href", event.target.value)} className={inputClass} />
          </div>
        ))}
      </div>

      <button type="submit" disabled={saving} className="inline-flex items-center rounded-full bg-[#00ffaa] px-5 py-3 font-mono text-sm uppercase tracking-[0.24em] text-[#05070a] disabled:opacity-60">
        {saving ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
        {saving ? "Saving" : "Save Profile"}
      </button>
    </form>
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