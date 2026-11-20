"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  chipi,
  chipiSpecs,
  chipiExpressions,
  chipiArchitecture,
  faq,
  trust,
} from "@/lib/products";
import PreOrderModal from "./PreOrderModal";

const announce = [
  "Limited early-bird pre-orders now open",
  "Designed & prototyped in Ralypto Hardware Lab, Sri Lanka",
  "Early-bird customers get an exclusive software benefit",
  "Direct help on WhatsApp, no payment taken on the website",
];

const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const SECRET = "chipi";
const manifesto =
  "CHIPI is small enough to hang off your keys and smart enough to notice you. Pet it and it smiles. Tilt it and it gasps. Leave it alone and it falls asleep.";

export default function ChipiYuyk() {
  const [open, setOpen] = useState(false);
  const [annIdx, setAnnIdx] = useState(0);
  const [exprIdx, setExprIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [stickyOn, setStickyOn] = useState(false);
  const [typed, setTyped] = useState("");
  const [down, setDown] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const startPreOrder = () => setOpen(true);
  const expr = chipiExpressions[exprIdx];
  const unlocked = typed.endsWith(SECRET) || typed.includes(SECRET);

  /* rotating announcement bar */
  useEffect(() => {
    const t = setInterval(() => setAnnIdx((i) => (i + 1) % announce.length), 3500);
    return () => clearInterval(t);
  }, []);

  /* expression autoplay */
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setExprIdx((i) => (i + 1) % chipiExpressions.length), 2600);
    return () => clearInterval(t);
  }, [playing]);

  /* reveal on scroll */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".yk-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* sticky CTA once hero is out of view */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setStickyOn(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  /* word-by-word manifesto highlight */
  useEffect(() => {
    const onScroll = () => {
      const box = manifestoRef.current;
      if (!box) return;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
      const n = Math.round(p * wordsRef.current.length);
      wordsRef.current.forEach((w, i) => w && w.classList.toggle("on", i < n));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* keyboard: click or physical typing */
  const press = useCallback((k: string) => {
    setTyped((t) => (t + k).slice(-12));
    setDown(k);
    setTimeout(() => setDown((d) => (d === k ? null : d)), 140);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[a-z]$/i.test(e.key)) press(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  const inSecret = (k: string) => SECRET.includes(k);
  const words = manifesto.split(" ");

  return (
    <div className="yk" ref={rootRef}>
      <div className="yk-announce" aria-label="Store news">
        {announce.map((m, i) => (
          <span key={m} className={i === annIdx ? "is-on" : ""} aria-hidden={i !== annIdx}>
            {m}
          </span>
        ))}
      </div>

      {/* HERO */}
      <div className="yk-stack">
        <section className="yk-hero" ref={heroRef} aria-labelledby="yk-h1">
          <div className="yk-hero__render">
            <img src="/products/chipi/chipi-360-0.webp" alt="CHIPI keychain companion looking determined" width={500} height={500} />
          </div>
          <div className="yk-hero__render yk-hero__render--b">
            <img src="/products/chipi/chipi-360-4.webp" alt="CHIPI seen from another angle" width={500} height={500} />
          </div>
          <h1 id="yk-h1" className="yk-statement yk-hero__text">
            <span className="yk-ln"><span>CHIPI</span></span>
            <span className="yk-ln"><span className="yk-red">pocket pet.</span></span>
          </h1>
          <div className="yk-hero__buy">
            <p className="yk-hero__sub">
              {chipi.teaser} A keychain-sized companion with an animated OLED face, built in our Hardware Lab.
            </p>
            <div className="yk-hero__ctas">
              <button type="button" className="yk-btn yk-btn--lg" onClick={startPreOrder} aria-haspopup="dialog">
                Pre-order CHIPI
              </button>
              <a className="yk-btn yk-btn--ghost yk-btn--lg" href="#spotlight">Meet the moods</a>
            </div>
          </div>
        </section>
      </div>

      {/* EXPRESSION STRIP */}
      <div className="yk-strip" aria-hidden="true">
        <div className="yk-strip__track">
          {[0, 1, 2].flatMap((g) =>
            chipiExpressions.map((e) => (
              <div className="yk-strip__item" key={`${g}-${e.id}`}>
                <img src={e.img} alt="" height={90} />
                <span>{e.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SPOTLIGHT */}
      <section className="yk-spot" id="spotlight" aria-labelledby="yk-spot-h">
        <div className="yk-reveal">
          <div className="yk-spot__media">
            <div className="yk-spot__stage">
              {chipiExpressions.map((e, i) => (
                <img key={e.id} src={e.img} alt={`CHIPI ${e.name} expression`} className={i === exprIdx ? "is-active" : ""} />
              ))}
            </div>
          </div>
          <div className="yk-spot__controls">
            {chipiExpressions.map((e, i) => (
              <button
                key={e.id}
                type="button"
                className={`yk-thumb ${i === exprIdx ? "is-active" : ""}`}
                aria-label={`Show ${e.name} expression`}
                aria-pressed={i === exprIdx}
                onClick={() => { setExprIdx(i); setPlaying(false); }}
              >
                <img src={e.img} alt="" />
              </button>
            ))}
            <button type="button" className="yk-toggle" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        <div className="yk-reveal">
          <p className="yk-eyebrow"><i /> Early-bird · Limited first batch</p>
          <h2 id="yk-spot-h" className="yk-statement yk-spot__name">CHIPI</h2>
          <p className="yk-spot__tagline">{chipi.tagline}</p>
          <p className="yk-mood" aria-live="polite">
            <b>{expr.name}</b> · {expr.subtitle}. {expr.desc}
          </p>
          <p className="yk-price">
            {chipi.price}
            <small>Estimated price · confirmed on WhatsApp</small>
          </p>
          <div className="yk-spot__actions">
            <button type="button" className="yk-btn yk-btn--lg" onClick={startPreOrder} aria-haspopup="dialog">
              Register &amp; pre-order
            </button>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="yk-info" ref={manifestoRef} id="about">
        <p className="yk-info__lead">Small. Smart. Yours.</p>
        <p>
          {words.map((w, i) => (
            <span key={i}>
              <span className="yk-word" ref={(el) => { if (el) wordsRef.current[i] = el; }}>{w}</span>{" "}
            </span>
          ))}
        </p>
        <p>{chipi.description}</p>
      </section>

      {/* SHOP */}
      <section className="yk-section" id="shop" style={{ paddingTop: 0 }}>
        <div className="yk-section__head yk-reveal">
          <h2 className="yk-statement yk-section__title">Shop CHIPI</h2>
          <button type="button" className="yk-link" onClick={startPreOrder}>Pre-order now →</button>
        </div>
        <div className="yk-products">
          <article className="yk-pcard yk-reveal">
            <div className="yk-pcard__media">
              <span className="yk-badge">Early-bird</span>
              <img src="/products/chipi/chipi-360-2.webp" alt="CHIPI front view" />
              <img className="yk-pcard__alt" src="/products/chipi/chipi-360-5.webp" alt="" />
            </div>
            <div className="yk-pcard__body">
              <div>
                <h3 className="yk-pcard__name">CHIPI / pocket companion.</h3>
                <p className="yk-pcard__type">Keychain · OLED face · ESP32</p>
              </div>
              <p className="yk-pcard__price">{chipi.price}</p>
            </div>
            <button type="button" className="yk-pcard__add" onClick={startPreOrder}>Register &amp; pre-order</button>
          </article>

          <article className="yk-pcard yk-pcard--specs yk-reveal">
            <div className="yk-pcard__media">
              <p className="yk-mono" style={{ marginBottom: 6 }}>Specifications</p>
              <dl className="yk-specs" style={{ margin: 0 }}>
                {chipiSpecs.slice(0, 6).map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>
      </section>

      {/* INSIDE */}
      <section className="yk-section" style={{ paddingTop: 0 }} aria-labelledby="yk-inside-h">
        <div className="yk-section__head yk-reveal">
          <h2 id="yk-inside-h" className="yk-statement yk-section__title">Inside CHIPI</h2>
        </div>
        <div className="yk-inside">
          <div className="yk-inside__img yk-reveal">
            <img src="/products/chipi/inside-chipi.png" alt="Exploded view of CHIPI: front cover, OLED, sensor, ESP32 board, back cover" width={800} height={350} />
          </div>
          <ul className="yk-steps yk-reveal">
            {chipiArchitecture.map((a) => (
              <li key={a.step}>
                <b className="num">{a.step}</b>
                <div>
                  <strong>{a.name}</strong>
                  <p>{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* KEYBOARD */}
      <section className="yk-board" aria-labelledby="yk-board-h">
        <div className="yk-keyboard" role="group" aria-label="On-screen keyboard">
          {rows.map((r) => (
            <div className="yk-keyboard__row" key={r}>
              {r.split("").map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`yk-key ${down === k ? "is-down" : ""} ${typed.includes(SECRET) && inSecret(k) ? "is-found" : typed.endsWith(k) && inSecret(k) ? "is-lit" : ""}`}
                  onClick={() => press(k)}
                  aria-label={k}
                >
                  <span className="yk-key__face">{k}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="yk-board__foot">
          <h2 id="yk-board-h" className="yk-statement yk-board__title">Type it in.</h2>
          <p className="yk-board__hint">
            Spell <b>CHIPI</b> on the keys (or your keyboard) to unlock something.
          </p>
          <button type="button" className="yk-btn yk-btn--light yk-btn--lg" style={{ background: "var(--ivory)", color: "var(--ink)" }} onClick={startPreOrder}>
            Pre-order CHIPI
          </button>
          {unlocked && (
            <div className="yk-reward" role="status">
              <b>Early-bird benefit unlocked</b>
              <span>Pre-order now and mention this on WhatsApp to claim your exclusive software benefit.</span>
            </div>
          )}
        </div>
      </section>

      {/* PERKS */}
      <section className="yk-perks" aria-label="Why pre-order with Ralypto">
        <ul>
          {trust.map((t) => (
            <li key={t.title}>
              <b>{t.title}</b>
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="yk-section">
        <div className="yk-faq">
          <h2 className="yk-statement">Questions, answered</h2>
          <div>
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="yk-marquee" aria-hidden="true">
        <div className="yk-marquee__track">
          {[0, 1].flatMap((g) =>
            ["CHIPI", "pocket-sized", "made in sri lanka"].flatMap((t) => [
              <span key={`${g}-${t}`} className="yk-statement">{t}</span>,
              <i key={`${g}-${t}-i`} />,
            ])
          )}
        </div>
      </div>

      {/* STICKY CTA */}
      <div className={`yk-sticky ${stickyOn && !open ? "is-on" : ""}`}>
        <img src="/products/chipi/chipi-360-0.webp" alt="" />
        <div>
          <b>CHIPI</b>
          <span>{chipi.price}</span>
        </div>
        <button type="button" className="yk-btn yk-btn--sm" style={{ padding: "12px 18px" }} onClick={startPreOrder} tabIndex={stickyOn ? 0 : -1}>
          Pre-order
        </button>
      </div>

      <PreOrderModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
