"use client";

import { ArrowUp } from "lucide-react";
import { navLinks } from "@/lib/data";

export function Footer({ name = "Akhil Maratha" }) {
  return (
    <footer className="relative border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-syne text-lg font-black text-white">{name}</span>
          <span className="text-white/30">|</span>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span>Built with Next.js + MongoDB</span>
          <span className="text-white/30">|</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>

      <a
        href="#home"
        className="fixed bottom-5 z-99 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#080b0f]/80 text-white backdrop-blur-xl transition-colors hover:border-[#00ffaa]/40 hover:text-[#00ffaa]"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </a>
    </footer>
  );
}