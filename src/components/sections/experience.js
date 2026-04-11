"use client";

import { motion } from "framer-motion";
import { education, experience } from "@/lib/data";

function TimelineBlock({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="relative pl-10"
    >
      <span className="absolute left-0 top-2 h-4 w-4 rounded-full border border-[#00ffaa] bg-[#080b0f] ring-4 ring-[#00ffaa]/10" />
      <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
        <div className="font-mono text-xs uppercase tracking-[0.35em] text-[#00c8ff]">{item.date}</div>
        <h3 className="mt-3 font-syne text-2xl font-black text-white">{item.role}</h3>
        <p className="mt-1 text-sm uppercase tracking-[0.22em] text-white/45">{item.company}</p>
        <p className="mt-4 text-sm leading-7 text-white/70">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#00ffaa]">Experience</p>
          <h2 className="mt-4 font-syne text-4xl font-black tracking-tight text-white sm:text-5xl">Work history and education with a clean, glowing timeline.</h2>
        </motion.div>

        <div className="relative mt-12 space-y-6">
          <div className="absolute left-2 top-0 h-full w-px bg-linear-to-b from-[#00ffaa] via-[#00c8ff] to-transparent" />
          {experience.map((item, index) => (
            <TimelineBlock key={item.role} item={item} index={index} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#00ffaa]">Education</p>
          <div className="mt-6 space-y-6">
            {education.map((item, index) => (
              <TimelineBlock key={item.role} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}