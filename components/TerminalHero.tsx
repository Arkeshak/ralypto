"use client";
import { useEffect, useState } from "react";
import { labs } from "@/lib/content";

const script = [
  { cmd: true, text: "ralypto build --your-idea" },
  { cmd: false, text: "reading requirements ........ done" },
  { cmd: false, text: "designing database .......... done" },
  { cmd: false, text: "writing features ............ done" },
  { cmd: false, text: "tests passed 48/48" },
  { cmd: false, text: "deployed. your system is live." },
];

export default function TerminalHero() {
  const [shown, setShown] = useState(0); // characters revealed across the script
  const total = script.reduce((n, l) => n + l.text.length, 0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(total);
      return;
    }
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= total) {
          clearInterval(id);
          return s;
        }
        return s + 2;
      });
    }, 28);
    return () => clearInterval(id);
  }, [total]);

  let left = shown;
  const done = shown >= total;

  return (
    <div className="term-hero">
      <div className="term-window" aria-hidden="true">
        <div className="term-window__bar">
          <i />
          <i />
          <i />
          <span>~/ralypto</span>
        </div>
        <pre>
          {script.map((line, i) => {
            const visible = Math.max(0, Math.min(line.text.length, left));
            left -= line.text.length;
            if (visible === 0 && i > 0) return null;
            return (
              <span key={i} className={line.cmd ? "" : "t-dim"}>
                {line.cmd && <span className="t-amber">$ </span>}
                {line.text.slice(0, visible)}
                {"\n"}
              </span>
            );
          })}
          <span className="caret" />
        </pre>
      </div>
      <div className={`term-hero__title ${done ? "is-in" : ""}`}>
        <h1>{labs.software.name}</h1>
        <p>{labs.software.promise}</p>
      </div>
    </div>
  );
}
