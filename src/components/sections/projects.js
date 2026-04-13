"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProjectCard } from "../ui/project-card";

const filters = ["All", "Frontend", "Backend", "Full-Stack"];
//open source

export function Projects() {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    if (active === "All") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(active));
  }, [active]);

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-20 md:py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#00ffaa]">Projects</p>
            <h2 className="mt-4 max-w-2xl font-syne text-4xl font-black tracking-tight text-white sm:text-5xl">Selected work built to convert, scale, and feel memorable.</h2>
          </div>

          <div className="relative flex flex-wrap gap-2 rounded-full border border-white/10 `bg-white/3` px-2 py-1">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] transition-colors",
                  active === filter ? "text-[#080b0f]" : "text-white/65 hover:text-white",
                )}
              >
                {active === filter ? <span className="absolute inset-0 rounded-full bg-[#00ffaa]" /> : null}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="wait">
            {visible.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className={cn(project.featured ? "md:col-span-2" : "")}
              >
                <ProjectCard project={project} index={index} featured={project.featured} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}