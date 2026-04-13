"use client";

import { motion } from "framer-motion";
import { CountUpNumber } from "../ui/count-up-number";
import { SkillBars } from "../ui/skill-bars";
import { highlights, infoCards, skillBars, stats } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-10 md:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#00ffaa]">About</p>
          <h2 className="mt-4 max-w-xl text-balance font-syne text-3xl font-black leading-[0.95] tracking-tight text-white wrap-anywhere sm:text-5xl">I build interfaces that feel alive and systems that stay maintainable.</h2>
          <div className="mt-8 space-y-5 text-base leading-8 text-white/70">
            <p>
              My approach combines <span className="font-semibold text-[#00ffaa]">UI precision</span>, resilient backend design, and fast iteration so the product feels polished from the first interaction.
            </p>
            <p>
              I care about the details that matter in production: validation, accessibility, performance budgets, clean schema design, and clear component boundaries.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="min-w-0 rounded-2xl border border-white/10 bg-white/3 p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00c8ff]">{item.label}</div>
                <p className="mt-3 text-sm leading-7 text-white/75 wrap-anywhere">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-5">
            <SkillBars items={skillBars} />
          </div>
        </motion.div>

        <div className="min-w-0 space-y-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid gap-4 sm:grid-cols-2">
            {infoCards.map((card) => (
              <div key={card.label} className="group min-w-0 rounded-2xl border border-white/10 border-l-[#00ffaa] bg-white/3 p-5 transition-transform duration-300 hover:translate-x-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">{card.label}</div>
                <p className="mt-3 text-sm leading-7 text-white/80 wrap-anywhere">{card.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/3 p-5 text-center">
                <CountUpNumber value={stat.value} />
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}