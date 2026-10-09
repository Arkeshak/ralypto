"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* A side rail listing the sections of the current page (any element with data-chapter), 
   highlighting the one in view, plus a three-colour reading progress bar at the top. */

export default function Chapters() {
  const path = usePathname();
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    els.forEach((el, i) => {
      if (!el.id) el.id = `chapter-${i + 1}`;
    });
    setItems(els.map((el) => ({ id: el.id, name: el.dataset.chapter || "" })));

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  const zone = path.startsWith("/software")
    ? "software"
    : path.startsWith("/creative")
    ? "creative"
    : path.startsWith("/hardware")
    ? "hardware"
    : "brand";

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      {items.length > 1 && (
        <nav className={`rail rail--${zone}`} aria-label="Sections on this page">
          <ol>
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  aria-current={active === it.id ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="rail__name">{it.name}</span>
                  <span className="rail__tick" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
