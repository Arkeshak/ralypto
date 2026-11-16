"use client";
import { useEffect } from "react";
import { ScrollBar } from "./Anim";

/* Homepage scroll motion: the hero eases away as you scroll, images drift slightly (parallax),
   and a spring scroll bar tracks the page. Everything is off for reduced motion. */
export default function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector<HTMLElement>(".hm");
    const hero = document.querySelector<HTMLElement>(".hm-hero");
    if (!root) return;
    const imgs = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (hero) {
        const p = Math.min(1, Math.max(0, y / (hero.offsetHeight * 0.8)));
        hero.style.setProperty("--hp", p.toFixed(3));
      }
      for (const el of imgs) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const t = (r.top + r.height / 2 - vh / 2) / vh; // about -1..1 around the screen centre
        el.style.setProperty("--py", `${(t * -22).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <ScrollBar />;
}
