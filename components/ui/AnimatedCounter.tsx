"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
    value: number;
    durationMs?: number;
};

export default function AnimatedCounter({ value, durationMs = 700 }: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const previousValueRef = useRef(0);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const from = previousValueRef.current;
        const to = Math.max(0, Math.floor(value));

        if (prefersReducedMotion || from === to) {
            setDisplayValue(to);
            previousValueRef.current = to;
            return;
        }

        const delta = Math.abs(to - from);
        const maxStepPerFrame = Math.max(1, Math.ceil(delta / 90));
        const start = performance.now();

        let rafId = 0;
        let current = from;

        const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            const idealValue = Math.round(from + (to - from) * progress);
            const gap = idealValue - current;

            if (gap !== 0) {
                const step = Math.min(Math.abs(gap), maxStepPerFrame);
                current += Math.sign(gap) * step;
                setDisplayValue(current);
            }

            if (progress < 1 || current !== to) {
                rafId = requestAnimationFrame(tick);
                return;
            }

            previousValueRef.current = to;
        };

        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    }, [value, durationMs]);

    return <>{displayValue}</>;
}