"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "./sign-out-button";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Skills", href: "/admin/skills" },
  { label: "Profile", href: "/admin/profile" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-white/10 bg-[#05070a] p-5">
      <div>
        <div className="font-syne text-2xl font-black text-white">dev.name</div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#00ffaa]">Admin Panel</p>
      </div>

      <nav className="mt-10 flex-1 space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-2xl border px-4 py-3 text-sm transition-all duration-300",
                active
                  ? "border-[#00ffaa]/30 bg-[#00ffaa]/10 text-[#00ffaa]"
                  : "border-white/10 bg-white/2 text-white/70 hover:border-white/20 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4">
        <SignOutButton />
      </div>
    </aside>
  );
}