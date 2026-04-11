"use client";

import { useEffect, useRef, useState } from "react";

export function CountUpNumber({ value, suffix = "+", duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const startTime = performance.now();

        const animate = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          setCount(Math.floor(value * progress));

          if (progress < 1) {
            window.requestAnimationFrame(animate);
          }
        };

        window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, value]);

  return (
    <span ref={ref} className="font-syne text-4xl font-black text-white sm:text-5xl">
      {count}
      {suffix}
    </span>
  );
}