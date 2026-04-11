"use client";

import { useEffect, useRef } from "react";

export function AnimatedCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      return undefined;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrame = 0;

    const update = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animationFrame = window.requestAnimationFrame(update);
    };

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    window.addEventListener("mousemove", onMove);
    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 `z-9999` hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00ffaa]/40 mix-blend-difference md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 `z-9999` hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ffaa] mix-blend-difference md:block"
      />
    </>
  );
}