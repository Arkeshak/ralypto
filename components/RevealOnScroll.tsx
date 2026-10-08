"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
/* Adds the class "is-in" to any element with data-reveal when it scrolls into view. Each lab's CSS decides what that entrance looks like. */ export default function RevealOnScroll() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || isReduced) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    const observeNewElements = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in):not(.is-observing)").forEach((el) => {
        el.classList.add("is-observing");
        io.observe(el);
      });
    };

    observeNewElements();

    const mo = new MutationObserver(() => observeNewElements());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.querySelectorAll(".is-observing").forEach(el => el.classList.remove("is-observing"));
    };
  }, [path]);
  return null;
}
