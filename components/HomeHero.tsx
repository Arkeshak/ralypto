"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { labs, labOrder, site, LabId } from "@/lib/content";
import RobotArm from "./RobotArm";
import StudioStatus from "./StudioStatus";
import CreativeHeroPreview from "./CreativeHeroPreview";

/* ---------- Software door: a terminal that keeps typing new commands ---------- */
type TLine = { t: string; k: "cmd" | "dim" | "ok" };
const scripts: { cmd: string; out: TLine[] }[] = [
  {
    cmd: "ralypto build --your-idea",
    out: [
      { t: "compiling idea.ts ...", k: "dim" },
      { t: "tests passed 12/12", k: "dim" },
      { t: "ready on ralypto.tech", k: "ok" },
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
    const id = setInterval(() => setPulse((n) => (n + 1) % verbs.length), 2200);
    return () => clearInterval(id);
  }, [active]);

  const lit = active ?? verbs[pulse]?.lab;

  function track(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    if (el.dataset.lab === "hardware" && coordsRef.current) {
      coordsRef.current.textContent = `X ${String(Math.round(x)).padStart(3, "0")}  Y ${String(Math.round(y)).padStart(3, "0")}`;
    }
  }

  function reset(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    setActive(null);
  }

  return (
    <section className="home-hero" data-chapter="Welcome">
      <div className="hh-intro">
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
        <p className="hh-lead">
          Ralypto is a studio from Sri Lanka that builds software, brands and
          hardware for businesses. Tell us your idea and we take it from first
          sketch to launch.
        </p>
        <div className="hh-cta">
          <Link href="/contact" className="btn btn--lg">
            Start a project
          </Link>
          <Link href="/work" className="btn btn--ghost btn--lg">
            See our work
          </Link>
        </div>
        <StudioStatus />
      </div>

      <div className="hh-pick">
        <h2 className="hh-pick__title">What do you need?</h2>
        <p className="hh-pick__hint">
          Pick the lab that fits. Not sure? Start a project and we will point you
          the right way.
        </p>
        <div className={`doors ${active ? "has-active" : ""}`}>
          {labOrder.map((id) => (
            <Link
              key={id}
              href={labs[id].path}
              data-lab={id}
              className={`door door--${id} ${active === id ? "is-active" : ""}`}
              onPointerEnter={() => setActive(id)}
              onPointerMove={track}
              onPointerLeave={reset}
              onFocus={() => setActive(id)}
              onBlur={() => setActive(null)}
            >
              <div className="door__preview" aria-hidden="true">
                {id === "software" && <SoftwarePreview />}
                {id === "creative" && <CreativeHeroPreview />}
                {id === "hardware" && <HardwarePreview coordsRef={coordsRef} />}
              </div>
              <div className="door__label">
                <h2>{labs[id].name}</h2>
                <p>{labs[id].promise}</p>
                <span className="door__go">Explore the {labs[id].name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
