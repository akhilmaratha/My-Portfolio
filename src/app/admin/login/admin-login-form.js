"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

export function AdminLoginForm({ callbackUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl,
    });

    if (result?.error) {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    window.location.href = result?.url || callbackUrl;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-4xl border border-white/10 bg-white/3 p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#00ffaa]">Protected Access</p>
      <h1 className="mt-4 font-syne text-4xl font-black text-white">Admin Login</h1>
      <p className="mt-3 text-sm leading-7 text-white/60">Use your admin email and password to access the dashboard.</p>

      <div className="mt-8 space-y-4">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">Email</span>
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">Password</span>
          <input name="password" type="password" required className={inputClass} />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#00ffaa] px-5 py-3 font-mono text-sm uppercase tracking-[0.24em] text-[#05070a] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
        {loading ? "Signing in" : "Sign In"}
      </button>
    </form>
  );
}

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-[#05070a] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#00ffaa]/50";