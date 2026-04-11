"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { MagneticButton } from "./magnetic-button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(navLinks[0].href);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);

      const sections = navLinks
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (current?.id) {
        setActive(`#${current.id}`);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-300",
          scrolled && "border-white/10 bg-[#080b0f]/80 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2 text-xl font-black tracking-tight text-white">
            <span className="font-syne text-2xl text-white">dev.name</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#00ffaa] ring-4 ring-[#00ffaa]/10" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <div className="relative flex items-center gap-7 text-sm uppercase tracking-[0.22em] text-white/70">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative pb-1 transition-colors hover:text-white",
                    active === link.href && "text-white",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[#00ffaa] transition-transform duration-300",
                      active === link.href && "scale-x-100",
                    )}
                  />
                </a>
              ))}
            </div>
            <MagneticButton as="a" href="#contact" className="border-[#00ffaa]/40 text-[#00ffaa] hover:text-black">
              Hire Me <ArrowUpRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#05070a]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="font-syne text-2xl font-black text-white">dev.name</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                }}
                className="mt-16 flex flex-1 flex-col justify-center gap-4"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="border-b border-white/10 py-3 font-syne text-4xl text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>

              <MagneticButton as="a" href="#contact" className="mb-4 text-[#00ffaa]" onClick={() => setOpen(false)}>
                Hire Me <ArrowUpRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}