import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, index, featured = false }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 p-6 transition-all duration-500 hover:border-[#00ffaa]/40",
        featured ? "md:col-span-2 md:p-8" : "",
      )}
    >
      <div className="pointer-events-none absolute -right-3 top-3 font-syne text-6xl font-black text-white/4 sm:text-8xl">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,170,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(0,200,255,0.14),transparent_32%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em]",
                tag === "Backend" && "border-[#00c8ff]/30 text-[#00c8ff]",
                tag === "Frontend" && "border-[#00ffaa]/30 text-[#00ffaa]",
                tag === "Full-Stack" && "border-white/20 text-white",
                tag === "Open Source" && "border-white/20 text-white/80",
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/40">{project.status}</p>
          <h3 className="mt-3 font-syne text-3xl font-black text-white sm:text-4xl">{project.title}</h3>
        </div>

        <p className="max-w-2xl text-sm leading-7 text-white/70">{project.description}</p>
        {featured ? <p className="max-w-3xl text-sm leading-7 text-white/60">{project.details}</p> : null}

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-white/70">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.githubUrl}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#00ffaa]/40 hover:text-[#00ffaa]"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href={project.liveUrl}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#00c8ff]/40 hover:text-[#00c8ff]"
            target="_blank"
            rel="noreferrer"
            aria-label="Live site"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}