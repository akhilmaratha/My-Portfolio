"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 transition-colors hover:border-[#00ffaa]/40 hover:text-[#00ffaa]"
    >
      Sign Out
    </button>
  );
}