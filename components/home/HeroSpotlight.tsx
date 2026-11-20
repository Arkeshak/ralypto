"use client";
import { useRef } from "react";

/* Hero wrapper: a soft amber glow follows the mouse. Hidden for touch and reduced motion. */
export default function HeroSpotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  function move(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <section ref={ref} className="hm-hero" data-theme="light" aria-labelledby="hm-h1" onPointerMove={move}>
      <span className="hm-hero__glow" aria-hidden="true" />
      {children}
    </section>
  );
}
