"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "div";
}

/**
 * TextReveal Component
 * Matches yuyk.in's statement scroll reveal:
 * As you scroll past the block, words dynamically light up from 18% to 100% opacity
 * based on the exact scroll progress formula:
 * progress = Math.min(1, Math.max(0, (windowHeight * 0.8 - rect.top) / (rect.height * 0.85)))
 */
export default function TextReveal({
  text,
  className = "",
  as: Component = "p",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  const words = useMemo(() => text.split(/\s+/), [text]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveCount(words.length);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          // Progress: starts when top enters 80% of viewport, completes through 85% of element height
          const rawProgress = (vh * 0.8 - rect.top) / (rect.height * 0.85);
          const progress = Math.min(1, Math.max(0, rawProgress));
          const count = Math.round(progress * words.length);
          setActiveCount(count);
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [words.length]);

  return (
    <Component ref={containerRef as any} className={`yk-word-block ${className}`}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className={`yk-word ${idx < activeCount ? "is-active" : ""}`}
          style={{ marginRight: "0.28em" }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
