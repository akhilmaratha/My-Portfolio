"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 h-0.5 w-full bg-white/5">
      <div
        className="h-full `bg-linear-to-r` from-[#00ffaa] via-[#00c8ff] to-[#00ffaa] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}