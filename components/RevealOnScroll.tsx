"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
/* Adds the class "is-in" to any element with data-reveal when it scrolls into view. Each lab's CSS decides what that entrance looks like. */ export default function RevealOnScroll() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const els = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-in)",
    );
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
