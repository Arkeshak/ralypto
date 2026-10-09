"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Adds the class "is-in" to any element with data-reveal once it scrolls into view.
   Uses element positions (not IntersectionObserver) so it works even for elements 
   that start fully clipped, like the Software Lab "typing" entrance. */

export default function RevealOnScroll() {
  const path = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.forEach((el) => el.classList.add("is-in"));
      return;
    }

    let ticking = false;

    const check = () => {
      ticking = false;
      const limit = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) {
          el.classList.add("is-in");
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [path]);

  return null;
}
