"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { labs, Project } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalProjectsProps {
  projects: Project[];
}

/**
 * Pinned Horizontal Scroll Section
 * Matches yuyk.in's pinned scroll behavior:
 * Locks the section on scroll and sweeps cards horizontally across the viewport with GSAP ScrollTrigger.
 * On mobile, smoothly switches to a responsive touch-swipe slider.
 */
export default function HorizontalProjects({ projects }: HorizontalProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isDesktop = window.innerWidth >= 820;
    if (!isDesktop) return; // Mobile uses native touch horizontal layout

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 96;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.9,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.15}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={sectionRef} className="yk-hscroll" data-theme="dark">
      <div className="yk-hscroll__pin hm-wrap">
        <header className="hm-head hm-head--row yk-hscroll__header">
          <div>
            <p className="hm-tag" style={{ color: "#ffaf0d", marginBottom: "0.4rem" }}>
              Selected Portfolio
            </p>
            <h2 id="hm-work" style={{ color: "#fff" }}>
              Selected work.
            </h2>
          </div>
          <Link href="/work" className="hm-textlink" style={{ color: "#ffaf0d" }}>
            View all projects <span aria-hidden="true">›</span>
          </Link>
        </header>

        <div ref={trackRef} className="yk-hscroll__track">
          {projects.map((p) => {
            const labName = labs[p.labs[0]]?.name || "Ralypto Studio";
            const img = p.images?.[0] || "/products/chipi/chipi-hero.jpg";

            return (
              <article key={p.slug} className="yk-hcard">
                <Link
                  href={`/work/${p.slug}`}
                  className="yk-hcard__media"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img src={img} alt={p.title} width={640} height={440} loading="lazy" decoding="async" />
                </Link>
                <div className="yk-hcard__body">
                  <span className="yk-hcard__tag">{labName}</span>
                  <h3 className="yk-hcard__title">
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <Link href={`/work/${p.slug}`} className="yk-hcard__link">
                    Explore case study <span aria-hidden="true">›</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
