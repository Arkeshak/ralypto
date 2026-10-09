"use client";
import Link from "next/link";
import { useState } from "react";
import { LabId, labs, labOrder } from "@/lib/content";
/* Visitors type an idea; each selected lab "builds" a preview of it. All in the browser, no API. */ const examples =
  [
    "A booking app for my salon",
    "A smart plant watering device",
    "A brand and Instagram launch for my bakery",
    "A stock and billing system for my shop",
  ];
const keywords: Record<LabId, string[]> = {
  software: [
    "app",
    "website",
    "site",
    "system",
    "erp",
    "pos",
    "booking",
    "stock",
    "billing",
    "dashboard",
    "ai",
    "agent",
    "chatbot",
    "online",
    "store",
    "portal",
    "software",
    "automation",
    "crm",
    "web",
  ],
  creative: [
    "brand",
    "logo",
    "design",
    "video",
    "photo",
    "instagram",
    "tiktok",
    "facebook",
    "social",
    "marketing",
    "ads",
    "launch",
    "poster",
    "packaging",
    "reel",
    "campaign",
    "menu",
    "identity",
  ],
  hardware: [
    "device",
    "robot",
    "sensor",
    "smart",
    "iot",
    "machine",
    "arduino",
    "motor",
    "relay",
    "pump",
    "watering",
    "meter",
    "drone",
    "tracker",
    "controller",
    "3d",
    "gadget",
    "automatic",
  ],
};
const features: [string[], string][] = [
  [
    ["booking", "appointment", "salon", "clinic", "class"],
    "Online booking calendar",
  ],
  [
    ["stock", "inventory", "shop", "store"],
    "Stock tracking with low-stock alerts",
  ],
  [["billing", "pos", "invoice", "shop"], "Billing and printed receipts"],
  [["ai", "agent", "chatbot", "whatsapp"], "AI assistant on WhatsApp"],
  [["online", "store", "sell", "order"], "Online orders and payments"],
  [["smart", "device", "iot", "sensor"], "Phone app to control the device"],
];
const defaultFeatures = [
  "Admin dashboard",
  "Works on any phone",
  "Customer accounts",
  "Daily reports",
];
const parts: [string[], string][] = [
  [["water", "watering", "plant", "soil"], "Soil moisture sensor"],
  [["water", "watering", "pump", "tank"], "Pump with relay switch"],
  [["robot", "motor", "drone", "car"], "Motor driver board"],
  [["track", "tracker", "gps", "location"], "GPS module"],
  [["meter", "energy", "power", "electric"], "Current sensor"],
  [["camera", "security", "door"], "Camera module"],
];
const defaultParts = [
  "ESP32 Wi-Fi board",
  "Sensor module",
  "3D-printed case",
  "Rechargeable battery",
];
const palettes = [
  ["#FF48B0", "#1B1530", "#FFE800"],
  ["#0078BF", "#FFB000", "#F5F6F8"],
  ["#00A95C", "#1B1530", "#FF6C2F"],
  ["#5B3DF5", "#FFE800", "#FFFFFF"],
  ["#FF6C2F", "#1C4BA0", "#F5F6F8"],
];
const suffixes = ["ly", "io", "ora", "hub", "nest", "co"];
const taglines = [
  "Made for you, by your neighbours.",
  "Simple. Fast. Yours.",
  "Good things, done properly.",
  "Built around your day.",
];
const stop = new Set([
  "a",
  "an",
  "the",
  "for",
  "my",
  "and",
  "to",
  "of",
  "with",
  "that",
  "app",
  "system",
  "device",
  "brand",
  "smart",
  "launch",
  "instagram",
  "booking",
  "stock",
  "billing",
  "website",
  "our",
  "in",
  "on",
]);
const words = (t: string) => t.toLowerCase().match(/[a-z0-9]+/g) ?? [];
const hash = (t: string) =>
  [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const match = (w: string[], list: string[]) => list.some((k) => w.includes(k));
function detectLabs(text: string): LabId[] {
  const w = words(text);
  const found = labOrder.filter((id) => match(w, keywords[id]));
  return found.length ? found : ["software"];
}
function buildPlan(idea: string, chosen: LabId[]) {
  const w = words(idea);
  const h = hash(idea);
  const core =
    w
      .filter((x) => !stop.has(x) && x.length > 2)
      .sort((a, b) => b.length - a.length)[0] ?? "idea";
  const root = core.replace(/(ing|ers|er|s)$/, "").slice(0, 6);
  const brand =
    root.charAt(0).toUpperCase() +
    root.slice(1) +
    suffixes[h % suffixes.length];
  const slug =
    w
      .filter((x) => !stop.has(x))
      .slice(0, 3)
      .join("-") || "your-idea";
  const feat = [
    ...new Set([
      ...features.filter(([k]) => match(w, k)).map(([, f]) => f),
      ...defaultFeatures,
    ]),
  ].slice(0, 4);
  const prt = [
    ...new Set([
      ...parts.filter(([k]) => match(w, k)).map(([, p]) => p),
      ...defaultParts,
    ]),
  ].slice(0, 4);
  return {
    labs: chosen,
    slug,
    features: feat,
    parts: prt,
    brand,
    palette: palettes[h % palettes.length],
    tagline: taglines[h % taglines.length],
  };
}
type Plan = ReturnType<typeof buildPlan>;
const buildSteps = [
  "Reading your idea",
  "Sketching screens",
  "Mixing colours",
  "Drawing the circuit",
  "Putting it together",
];
export default function IdeaMachine() {
  const [idea, setIdea] = useState("");
  const [chosen, setChosen] = useState<LabId[]>([]);
  const [touched, setTouched] = useState(false);
  const [phase, setPhase] = useState<"idle" | "building" | "done">("idle");
  const [stepText, setStepText] = useState(buildSteps[0]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState("");
  function onType(v: string) {
    setIdea(v);
    if (!touched) setChosen(v.trim() ? detectLabs(v) : []);
  }
  function toggle(id: LabId) {
    setTouched(true);
    setChosen((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }
  function build(text = idea) {
    if (text.trim().length < 5) {
      setError("Describe your idea in a few words first.");
      return;
    }
    const labsToUse = chosen.length ? chosen : detectLabs(text);
    setError("");
    setChosen(labsToUse);
    setPlan(buildPlan(text, labsToUse));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    setPhase("building");
    buildSteps.forEach((s, i) => setTimeout(() => setStepText(s), i * 380));
    setTimeout(() => setPhase("done"), buildSteps.length * 380 + 200);
  }
  function tryExample(e: string) {
    setIdea(e);
    setTouched(false);
    const l = detectLabs(e);
    setChosen(l);
    setTimeout(() => build(e), 0);
  }
  const contactHref = plan
    ? `/contact?need=${plan.labs.join(",")}&idea=${encodeURIComponent(idea)}`
    : "/contact";
  return (
    <div className="im">
      <div className="im__console">
        {" "}
        <label htmlFor="im-input" className="im__label">
          Your idea
        </label>{" "}
        <div className="im__inputrow">
          {" "}
          <input
            id="im-input"
            value={idea}
            onChange={(e) => onType(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && build()}
            placeholder="A booking app for my salon"
            autoComplete="off"
          />{" "}
          <button
            className="im__go"
            onClick={() => build()}
            disabled={phase === "building"}
          >
            {" "}
            {phase === "building" ? "Building" : "Build it"}{" "}
          </button>{" "}
        </div>{" "}
        {error && (
          <p className="im__error" role="alert">
            {error}
          </p>
        )}{" "}
        <div className="im__row">
          {" "}
          <span className="im__hint">Labs on this job:</span>{" "}
          {labOrder.map((id) => (
            <button
              key={id}
              className={`im__lab im__lab--${id}`}
              aria-pressed={chosen.includes(id)}
              onClick={() => toggle(id)}
            >
              {" "}
              {labs[id].name}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        <div className="im__row">
          {" "}
          <span className="im__hint">Or try:</span>{" "}
          {examples.map((e) => (
            <button
              key={e}
              className="im__example"
              onClick={() => tryExample(e)}
            >
              {e}
            </button>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="im__stage" aria-live="polite">
        {" "}
        {phase === "idle" && (
          <div className="im__empty">
            {" "}
            <span className="im__empty-dot im__empty-dot--software" />{" "}
            <span className="im__empty-dot im__empty-dot--creative" />{" "}
            <span className="im__empty-dot im__empty-dot--hardware" />{" "}
            <p>Your preview appears here.</p>{" "}
          </div>
        )}{" "}
        {phase === "building" && (
          <div className="im__building">
            {" "}
            <div className="im__bar">
              <span />
            </div>{" "}
            <p>{stepText} ...</p>{" "}
          </div>
        )}{" "}
        {phase === "done" && plan && (
          <>
            {" "}
            <div className="im__results">
              {" "}
              {plan.labs.includes("software") && (
                <article
                  className="im__card im__card--software"
                  style={{ animationDelay: "0s" }}
                >
                  {" "}
                  <h3>Software Lab</h3>{" "}
                  <pre>
                    {" "}
                    <span className="t-amber">$</span> ralypto init {plan.slug}
                    {"\n"} <span className="t-dim">creating app ...</span>
                    {"\n"} {plan.features.map((f) => ` + ${f}\n`).join("")}{" "}
                    <span className="t-amber">ready to build</span>{" "}
                  </pre>{" "}
                </article>
              )}{" "}
              {plan.labs.includes("creative") && (
                <article
                  className="im__card im__card--creative"
                  style={{ animationDelay: "0.15s" }}
                >
                  {" "}
                  <h3>Creative Studio</h3>{" "}
                  <div
                    className="im__brand"
                    style={{
                      background: plan.palette[0],
                      color: plan.palette[2],
                    }}
                  >
                    {" "}
                    <span
                      className="im__mono"
                      style={{
                        background: plan.palette[1],
                        color: plan.palette[0],
                      }}
                    >
                      {" "}
                      {plan.brand.charAt(0)}{" "}
                    </span>{" "}
                    <strong>{plan.brand}</strong> <em>{plan.tagline}</em>{" "}
                  </div>{" "}
                  <div className="im__palette">
                    {" "}
                    {plan.palette.map((c) => (
                      <span key={c} style={{ background: c }} title={c} />
                    ))}{" "}
                  </div>{" "}
                  <p className="im__small">
                    A first brand direction, ready for logo, posts and launch
                    ads.
                  </p>{" "}
                </article>
              )}{" "}
              {plan.labs.includes("hardware") && (
                <article
                  className="im__card im__card--hardware"
                  style={{ animationDelay: "0.3s" }}
                >
                  {" "}
                  <h3>Hardware Lab</h3>{" "}
                  <svg
                    viewBox="0 0 260 120"
                    className="im__bp"
                    aria-hidden="true"
                  >
                    {" "}
                    <rect x="20" y="15" width="220" height="80" rx="6" />{" "}
                    {plan.parts.map((p, i) => (
                      <g key={p}>
                        {" "}
                        <rect
                          x={32 + i * 52}
                          y="35"
                          width="40"
                          height="40"
                        />{" "}
                        <line
                          x1={52 + i * 52}
                          y1="75"
                          x2={52 + i * 52}
                          y2="95"
                        />{" "}
                        <text x={52 + i * 52} y="60" textAnchor="middle">
                          P{i + 1}
                        </text>{" "}
                      </g>
                    ))}{" "}
                    <line
                      className="im__dim"
                      x1="20"
                      y1="108"
                      x2="240"
                      y2="108"
                    />{" "}
                    <text
                      className="im__dimtext"
                      x="130"
                      y="118"
                      textAnchor="middle"
                    >
                      case 110 x 40 mm
                    </text>{" "}
                  </svg>{" "}
                  <ol className="im__parts">
                    {" "}
                    {plan.parts.map((p, i) => (
                      <li key={p}>
                        <span>P{i + 1}</span> {p}
                      </li>
                    ))}{" "}
                  </ol>{" "}
                </article>
              )}{" "}
            </div>{" "}
            <div className="im__cta">
              {" "}
              <p>
                This is a quick sketch. The real thing gets planned with you.
              </p>{" "}
              <Link href={contactHref} className="btn">
                Send this idea to Ralypto
              </Link>{" "}
            </div>{" "}
          </>
        )}{" "}
      </div>{" "}
    </div>
  );
}
