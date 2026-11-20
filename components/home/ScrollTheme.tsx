"use client";

import { useEffect } from "react";

/**
 * ScrollTheme Controller
 * Matches yuyk.in's smooth scroll theme transition:
 * Observes all sections with [data-theme] using IntersectionObserver at rootMargin "-40% 0px -40% 0px".
 * Sets document.body[data-theme] to transition background and text colors at 60fps.
 */
export default function ScrollTheme() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-theme");
            if (theme) {
              document.body.setAttribute("data-theme", theme);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
      document.body.removeAttribute("data-theme");
    };
  }, []);

  return null;
}
