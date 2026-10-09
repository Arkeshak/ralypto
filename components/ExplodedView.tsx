"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import LabLabel from "./LabLabel";

const layers = [
  { name: "Top cover", note: "3D-printed PETG" },
  { name: "Display", note: "0.96 in OLED" },
  { name: "Control board", note: "ESP32, custom PCB" },
  { name: "Battery", note: "Li-ion 2000 mAh" },
  { name: "Base", note: "Mounting plate" },
];

/* Layers of a device spread apart as you scroll through the section. */
export default function ExplodedView() {
  const ref = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSpread(1);
      return;
    }

    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // 0 when the section enters the screen, 1 when its centre reaches the screen centre
      const p = (window.innerHeight - r.top) / (window.innerHeight / 2 + r.height / 2);
      setSpread(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="lab-band lab-band--b" data-chapter="Inside a build" ref={ref}>
      <div className="lab-band__inner exploded">
        <div className="exploded__text">
          <SectionHead
            label={<LabLabel lab="hardware" name="Layers" />}
            title="Inside a build"
            intro="Every device we make is drawn before it is built. Scroll to take this one apart: each layer is designed, sourced and tested on its own."
          />
        </div>
        <div className="exploded__stage" aria-label="Exploded view of a device, top cover to base">
          {layers.map((l, i) => (
            <div
              key={l.name}
              className={`layer layer--${i}`}
              style={{ transform: `translateY(${(i - 2) * spread * 46}px)` }}
            >
              <span className="layer__plate" aria-hidden="true" />
              <span className="layer__label" style={{ opacity: spread }}>
                <strong>{l.name}</strong> {l.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
