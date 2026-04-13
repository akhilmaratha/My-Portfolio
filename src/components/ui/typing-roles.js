"use client";

import { useEffect, useState } from "react";

export function TypingRoles({ items, speed = 60, pause = 1400 }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = items[index % items.length];
    const timer = window.setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setDeleting(true);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIndex((value) => value + 1);
        }
      }
    }, deleting ? speed / 2 : speed);

    return () => window.clearTimeout(timer);
  }, [deleting, index, items, speed, text]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!deleting && text === items[index % items.length]) {
        setDeleting(true);
      }
    }, pause);

    return () => window.clearTimeout(timer);
  }, [deleting, index, items, pause, text]);

  return <span className="inline-flex min-h-[1.4em] items-center text-[#00c8ff]">{text}<span className="ml-1 inline-block h-6 w-px bg-[#00ffaa] align-middle" /></span>;
}