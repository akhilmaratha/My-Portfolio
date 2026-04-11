import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, center = false, bracket = false }) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow ? <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#00ffaa]">{eyebrow}</p> : null}
      <h2 className="mt-4 font-syne text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      {bracket ? <div className="mt-2 font-mono text-sm text-[#00c8ff]">[ <span className="text-white/70">stack_</span> ]</div> : null}
      {description ? <p className={cn("mt-4 max-w-2xl text-sm leading-7 text-white/70", center && "mx-auto")}>{description}</p> : null}
    </div>
  );
}