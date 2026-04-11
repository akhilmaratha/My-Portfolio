"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function SkillBars({ items }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-5">
      {items.map((item, index) => (
        <div key={item.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70">
            <span>{item.name}</span>
            <span className="font-mono text-[#00c8ff]">{item.value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/5">
            <div
              className={cn(
                "h-full rounded-full bg-linear-to-r from-[#00ffaa] via-[#00c8ff] to-[#00ffaa] transition-[width] duration-1000 ease-out",
                active ? "" : "w-0",
              )}
              style={{ width: active ? `${item.value}%` : 0, transitionDelay: `${index * 100}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}