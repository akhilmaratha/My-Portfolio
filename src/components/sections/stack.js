"use client";

import { motion } from "framer-motion";
import { techCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#00ffaa]">Technology</p>
          <h2 className="mt-4 font-syne text-4xl font-black tracking-tight text-white sm:text-5xl">
            <span className="text-white/70">[</span> stack_ <span className="text-white/70">]</span>
          </h2>
        </motion.div>

        <div className="mt-12 space-y-12">
          {techCategories.map((group, groupIndex) => (
            <div key={group.label}>
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: groupIndex * 0.1 }} className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-[#00c8ff]">
                {group.label}
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {group.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className={cn(
                      "group rounded-3xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00ffaa]/40",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-lg text-[#00ffaa] transition-transform duration-300 group-hover:rotate-180">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">{group.label}</span>
                    </div>
                    <h3 className="mt-6 font-syne text-xl font-black text-white">{item.name}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}