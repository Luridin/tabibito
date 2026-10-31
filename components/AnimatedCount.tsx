"use client";

import { useEffect, useRef } from "react";

export default function AnimatedCount({ value }: { value: number }) {
  const digitsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const digits = digitsRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!digits || motionPreference.matches) return;

    let frame = 0;
    let start: number | undefined;

    const tick = (time: number) => {
      start ??= time;
      const progress = Math.min((time - start) / 1100, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      digits.textContent = String(Math.round(value * easedProgress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const finish = () => {
      if (motionPreference.matches) {
        cancelAnimationFrame(frame);
        digits.textContent = String(value);
      }
    };

    frame = requestAnimationFrame(tick);
    motionPreference.addEventListener("change", finish);
    return () => {
      cancelAnimationFrame(frame);
      motionPreference.removeEventListener("change", finish);
    };
  }, [value]);

  return (
    <span className="animated-count" style={{ minWidth: `${String(value).length}ch` }}>
      <span className="sr-only">{value}</span>
      <span ref={digitsRef} aria-hidden="true">{value}</span>
    </span>
  );
}
