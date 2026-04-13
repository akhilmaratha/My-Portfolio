"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { heroRoles, resumeLink } from "@/lib/data";
import { MagneticButton } from "../layout/magnetic-button";
import { TypingRoles } from "../ui/typing-roles";

function CodeSnippetCard() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#091017] p-3 sm:p-4">
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3 text-[10px] text-white/50 sm:text-xs">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-mono">server/routes/contact.js</span>
      </div>
      <pre className="overflow-x-hidden text-[11px] leading-6 text-white/80 sm:overflow-x-auto sm:text-sm sm:leading-7">
        <code className="whitespace-pre-wrap wrap-break-word sm:whitespace-pre">
          <span className="text-[#00c8ff]">import</span> express <span className="text-[#00c8ff]">from</span> <span className="text-[#00ffaa]">&ldquo;express&rdquo;</span>
          {"\n"}
          <span className="text-[#00c8ff]">const</span> router = express.Router(){"\n"}
          {"\n"}
          router.post(<span className="text-[#00ffaa]">&ldquo;/contact&rdquo;</span>, async (req, res) =&gt; {"\n"}
          {"  "}<span className="text-[#00c8ff]">const</span> {"{"} name, email, message {"}"} = req.body{"\n"}
          {"  "}<span className="text-[#00c8ff]">if</span> (!name || !email || !message) {"\n"}
          {"    "}<span className="text-[#00c8ff]">return</span> res.status(400).json({"{"} error: <span className="text-[#00ffaa]">&ldquo;Validation failed&rdquo;</span> {"}"}){"\n"}
          {"  "}{"}"}{"\n"}
          {"  "}<span className="text-[#00c8ff]">await</span> Message.create({"{"} name, email, message {"}"}){"\n"}
          {"  "}<span className="text-[#00c8ff]">return</span> res.json({"{"} ok: true {"}"}){"\n"}
          {"}"}{"\n"}
        </code>
      </pre>
    </div>
  );
}

export function Hero({ profile }) {
  // const roles = profile?.role ? [profile.role] : heroRoles;
  const roles = heroRoles;

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,170,0.12),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(0,200,255,0.1),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(0,255,170,0.08),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[url('data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22 opacity=%220.25%22/%3E%3C/svg%3E')] opacity-20 mix-blend-soft-light" />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-10 sm:px-6 lg:grid-cols-[1.15fr_0.95fr] lg:px-8 lg:pb-28">
        <div className="relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-[#00ffaa]/20 bg-white/3 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#00ffaa] ring-2 ring-[#00ffaa]/30" />
            Available for work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 font-syne text-[3rem] md:text-[clamp(3.8rem,9vw,6.5rem)] font-black leading-[0.92] tracking-tight text-white"
          >
            <span className="block md:inline">Akhil</span>{" "}
            <span className="block md:inline">Maratha</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6 text-base uppercase tracking-[0.2em] text-white/60 md:text-lg md:tracking-[0.28em]">
            {/* I am a <TypingRoles items={roles} /> */}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-full pr-0 text-wrap text-base leading-7 text-white/70 sm:leading-8 md:text-base"
          >
            {profile?.bio || "I design and build high-conversion MERN experiences with sharp motion, disciplined architecture, and production-ready admin tooling."}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 flex w-full flex-col gap-4 md:flex-row">
            <MagneticButton as="a" href="#projects" className="whitespace-nowrap w-full justify-center bg-[#00ffaa] text-[#071014] hover:text-black sm:w-auto">
              View Projects <Sparkles className="ml-2 h-4 w-4" />
            </MagneticButton>
            <MagneticButton as="a" href="#contact" className="whitespace-nowrap w-full justify-center border-white/20 text-white/90 sm:w-auto">
              Contact Me <ArrowDownRight className="ml-2 h-4 w-4" />
            </MagneticButton>
            <MagneticButton as="a" href={resumeLink} target="_blank" rel="noreferrer" className="whitespace-nowrap w-full justify-center border-[#00c8ff]/40 text-[#00c8ff] hover:text-black sm:w-auto">
              View Resume
            </MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {['Next.js', 'MongoDB', 'TypeScript'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.24em]">
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#00ffaa]/15 blur-3xl" />
          <div className="absolute -bottom-10 right-0 h-56 w-56 rounded-full bg-[#00c8ff]/10 blur-3xl" />
          <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[2.5rem] border border-white/5 bg-[#00ffaa]/5" />
          <CodeSnippetCard />
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pb-10 text-white/50 sm:px-6 lg:px-8">
        <div className="font-mono text-xs uppercase tracking-[0.4em]">Scroll</div>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#00ffaa]/60 to-transparent" />
        <div className="h-14 w-14 rounded-full border border-white/10 p-1">
          <div className="h-full w-full animate-pulse rounded-full border border-[#00ffaa]/40" />
        </div>
      </div>
    </section>
  );
}