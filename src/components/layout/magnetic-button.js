"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function MagneticButton({
  as: Component = "button",
  className,
  children,
  strength = 18,
  onMouseMove,
  onMouseLeave,
  ...props
}) {
  const ref = useRef(null);

  function handleMouseMove(event) {
    const node = ref.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    node.style.transform = `translate3d(${offsetX / strength}px, ${offsetY / strength}px, 0)`;

    if (onMouseMove) {
      onMouseMove(event);
    }
  }

  function handleMouseLeave(event) {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0, 0, 0)";
    }

    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }

  return (
    <Component
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffaa]/60",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="absolute inset-0 -z-10 scale-x-0 origin-left bg-linear-to-r from-[#00ffaa] via-[#00c8ff] to-[#00ffaa] transition-transform duration-500 group-hover:scale-x-100" />
      <span className="absolute `inset-px` -z-10 rounded-full bg-[#080b0f] transition-colors duration-300 group-hover:bg-[#07141a]" />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}