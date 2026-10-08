"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { labs, labOrder, site, LabId } from "@/lib/content";
import RobotArm from "./RobotArm";

/* ---------- Software door: a terminal that keeps typing new commands ---------- */
type TLine = { t: string; k: "cmd" | "dim" | "ok" };
const scripts: { cmd: string; out: TLine[] }[] = [
  {
    cmd: "ralypto build --your-idea",
    out: [
      { t: "compiling idea.ts ...", k: "dim" },
      { t: "tests passed 12/12", k: "dim" },
      { t: "ready on ralypto.com", k: "ok" },
    ],
  },
  {
    cmd: "ralypto deploy erp --client=shop",
    out: [
      { t: "migrating database ...", k: "dim" },
      { t: "stock synced, 1,284 items", k: "dim" },
      { t: "billing is live", k: "ok" },
    ],
  },
  {
    cmd: "ralypto agent start --whatsapp",
    out: [
      { t: "loading knowledge base ...", k: "dim" },
      { t: "replying in 0.8s", k: "dim" },
      { t: "3 bookings confirmed", k: "ok" },
    ],
  },
];

function useTypingLoop() {
  const [lines, setLines] = useState<TLine[]>([]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines([{ t: scripts[0].cmd, k: "cmd" }, ...scripts[0].out]);
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));
    (async () => {
      for (let s = 0; !cancelled; s++) {
        const sc = scripts[s % scripts.length];
        for (let i = 1; i <= sc.cmd.length && !cancelled; i++) {
          setLines([{ t: sc.cmd.slice(0, i), k: "cmd" }]);
          await wait(42);
        }
        for (const l of sc.out) {
          await wait(420);
          if (cancelled) return;
          setLines((prev) => [...prev, l]);
        }
        await wait(2600);
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);
  return lines;
}

function SoftwarePreview() {
  const lines = useTypingLoop();
  return (
    <pre className="hd-term">
      {lines.map((l, i) => (
        <span key={i} className={`hd-term__${l.k}`}>
          {l.k === "cmd" && <span className="t-dim">~/ralypto </span>}
          {l.k === "cmd" && <span className="t-amber">$ </span>}
          {l.t}
        </span>
      ))}
      <span className="caret" />
    </pre>
  );
}

/* ---------- Creative door: shapes follow the cursor, words keep changing ---------- */
const creativeWords = ["seen", "loud", "yours", "viral"];

function CreativePreview() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setI((n) => (n + 1) % creativeWords.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="riso">
      <span className="riso__shape riso__shape--a" />
      <span className="riso__shape riso__shape--b" />
      <span className="riso__shape riso__shape--c" />
      <p className="riso__words">
        {" "}
        <span className="riso__word">make</span>{" "}
        <span className="riso__word">it</span>{" "}
        <span key={i} className="riso__word riso__swap">
          {creativeWords[i]}
        </span>{" "}
      </p>
    </div>
  );
}

/* ---------- Hardware door: moving robot arm + cursor crosshair with coordinates ---------- */
function HardwarePreview({
  coordsRef,
}: {
  coordsRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <>
      <RobotArm />
      <span className="hd-cross hd-cross--x" aria-hidden="true" />
      <span className="hd-cross hd-cross--y" aria-hidden="true" />
      <span className="hd-coords" ref={coordsRef} aria-hidden="true">
        X 000 Y 000
      </span>
    </>
  );
}

/* ---------- The hero ---------- */
const verbs: { word: string; lab: LabId }[] = [
  { word: "code", lab: "software" },
  { word: "design", lab: "creative" },
  { word: "build", lab: "hardware" },
];

export default function HomeHero() {
  const [active, setActive] = useState<LabId | null>(null);
  const [pulse, setPulse] = useState(0);
  const coordsRef = useRef<HTMLSpanElement>(null);

  // While nobody is hovering, the headline verbs light up one after another.
  useEffect(() => {
    if (active || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const id = setInterval(() => setPulse((p) => (p + 1) % 3), 1800);
    return () => clearInterval(id);
  }, [active]);

  const lit = active ?? verbs[pulse].lab;

  function track(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const nx = x / r.width - 0.5; // -0.5 .. 0.5
    const ny = y / r.height - 0.5;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--px", nx.toFixed(3));
    el.style.setProperty("--py", ny.toFixed(3));
    el.style.setProperty("--rx", `${(-ny * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(nx * 6).toFixed(2)}deg`);
    if (el.dataset.lab === "hardware" && coordsRef.current) {
      coordsRef.current.textContent = `X ${String(Math.round(x)).padStart(3, "0")}  Y ${String(Math.round(y)).padStart(3, "0")}`;
    }
  }

  function reset(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    ["--px", "--py"].forEach((v) => el.style.setProperty(v, "0"));
    ["--rx", "--ry"].forEach((v) => el.style.setProperty(v, "0deg"));
    setActive(null);
  }

  return (
    <section className="home-hero">
      <div className="home-hero__text">
        <h1 className="hh-title">
          We{" "}
          {verbs.map((v, i) => (
            <span key={v.word}>
              <span
                className={`verb verb--${v.lab} ${lit === v.lab ? "is-lit" : ""}`}
              >
                {v.word}
              </span>
              {i === 0 ? " it, " : i === 1 ? " it, and " : " it."}
            </span>
          ))}
        </h1>
        <p>{site.intro}</p>
      </div>

      <div className={`doors ${active ? "has-active" : ""}`}>
        {labOrder.map((id, i) => (
          <Link
            key={id}
            href={labs[id].path}
            data-lab={id}
            className={`door door--${id} ${active === id ? "is-active" : ""}`}
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            onPointerEnter={() => setActive(id)}
            onPointerMove={track}
            onPointerLeave={reset}
            onFocus={() => setActive(id)}
            onBlur={() => setActive(null)}
          >
            <div className="door__preview" aria-hidden="true">
              {id === "software" && <SoftwarePreview />}
              {id === "creative" && <CreativePreview />}
              {id === "hardware" && <HardwarePreview coordsRef={coordsRef} />}
            </div>
            <span className="door__glow" aria-hidden="true" />
            <span className="door__enter" aria-hidden="true">
              Enter
            </span>
            <div className="door__label">
              <h2>{labs[id].name}</h2>
              <p>{labs[id].doorLine}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
