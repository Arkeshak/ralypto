"use client";

import { useState } from "react";
import Image from "next/image";
import {
  chipi,
  chipiSpecs,
  chipiExpressions,
  chipiArchitecture,
  earlyBird,
  faq,
  trust,
} from "@/lib/products";
import ProductIcon from "./ProductIcon";
import PreOrderModal from "./PreOrderModal";
import Chipi3DViewer from "./Chipi3DViewer";

const statusLabel: Record<string, string> = {
  "opening-soon": "Pre-order opening soon",
  "early-bird": "Limited early-bird pre-orders",
};

export default function ChipiShowcase() {
  const [open, setOpen] = useState(false);
  const [selectedExpr, setSelectedExpr] = useState(chipiExpressions[0].id);

  const startPreOrder = () => setOpen(true);
  const activeExpression = chipiExpressions.find((e) => e.id === selectedExpr) || chipiExpressions[0];

  return (
    <div className="pd">
      {/* Hero Section with Interactive 360 Showcase */}
      <section className="pd-hero" aria-labelledby="pd-h1">
        <div className="pd-bg" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="pd-wrap">
          <header className="pd-intro">
            <p className="pd-kicker">Ralypto Hardware Lab</p>
            <h1 id="pd-h1">Meet CHIPI</h1>
            <p className="pd-intro__tagline">{chipi.tagline}</p>
            <p className="pd-intro__lead">
              &ldquo;{chipi.teaser}&rdquo; A compact, keychain-sized smart companion designed to bring personality,
              interaction, and technology together in your everyday pocket carry.
            </p>
          </header>

          {/* Main Product Presentation Card */}
          <article className="pd-card pd-card--showcase">
            {/* Left Column: Interactive 360° Product Viewer */}
            <div className="pd-card__showcase-media">
              <span className="pd-badge">
                <b aria-hidden="true" /> {statusLabel[chipi.status]}
              </span>
              <Chipi3DViewer
                expression={selectedExpr as "normal" | "happy" | "sleepy" | "surprised"}
                onExpressionChange={(expr) => setSelectedExpr(expr)}
              />
            </div>

            {/* Right Column: Product Overview & Pre-Order Details */}
            <div className="pd-card__body">
              <p className="pd-cat">{chipi.category}</p>
              <h2 className="pd-title">{chipi.name}</h2>
              <p className="pd-sub-tagline">{chipi.tagline}</p>
              <blockquote className="pd-quote">&ldquo;{chipi.teaser}&rdquo;</blockquote>
              <p className="pd-desc">{chipi.description}</p>

              {/* Confirmed Key Features Grid */}
              <div className="pd-section-label">Confirmed Features</div>
              <ul className="pd-feats">
                {chipi.features.map((f) => (
                  <li key={f.title}>
                    <span className="pd-ico">
                      <ProductIcon name={f.icon} />
                    </span>
                    <span>
                      <strong>{f.title}</strong>
                      <small>{f.text}</small>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pre-Order Conversion Box */}
              <div className="pd-buy pd-buy--featured">
                <div>
                  <span className="pd-price__label">Estimated Price</span>
                  <span className="pd-price">{chipi.price}</span>
                  <span className="pd-price__sub">Limited early-bird pre-order registration</span>
                </div>
                <button
                  type="button"
                  className="pd-btn pd-btn--glow"
                  onClick={startPreOrder}
                  aria-haspopup="dialog"
                >
                  <span>Pre-Order CHIPI</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Section 2: Interactive Display Expressions */}
      <section className="pd-expr-sec" aria-labelledby="pd-expr-h">
        <div className="pd-wrap">
          <div className="pd-sec-header">
            <p className="pd-kicker">Expressive OLED Screen</p>
            <h2 id="pd-expr-h">Display Expressions</h2>
            <p>
              Chipi&apos;s high-contrast blue OLED display reflects its current mood, reacting dynamically when you touch,
              pet, tilt, or shake it.
            </p>
          </div>

          <div className="pd-expr-grid">
            {/* Interactive Expression Selector Cards */}
            <div className="pd-expr-cards" role="tablist" aria-label="CHIPI expressions">
              {chipiExpressions.map((e) => {
                const isActive = e.id === selectedExpr;
                return (
                  <button
                    key={e.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`pd-expr-card ${isActive ? "is-selected" : ""}`}
                    onClick={() => setSelectedExpr(e.id)}
                  >
                    <div className="pd-expr-card__img-wrap">
                      <Image
                        src={e.img}
                        alt={`${e.name} face expression on blue OLED screen`}
                        width={180}
                        height={90}
                        className="pd-expr-card__img"
                      />
                    </div>
                    <div className="pd-expr-card__text">
                      <div className="pd-expr-card__header">
                        <strong>{e.name}</strong>
                        <span className="pd-expr-card__subtitle">{e.subtitle}</span>
                      </div>
                      <p>{e.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Expression Spotlight Box */}
            <div className="pd-expr-spotlight" aria-live="polite">
              <div className="pd-expr-spotlight__device">
                <div className="pd-expr-spotlight__screen">
                  <Image
                    src={activeExpression.img}
                    alt={`CHIPI displaying ${activeExpression.name} expression`}
                    width={220}
                    height={110}
                    className="pd-expr-spotlight__face"
                  />
                </div>
                <div className="pd-expr-spotlight__glow" aria-hidden="true" />
              </div>
              <div className="pd-expr-spotlight__info">
                <span className="pd-expr-spotlight__badge">Active Expression</span>
                <h3>{activeExpression.name}</h3>
                <p className="pd-expr-spotlight__mood">{activeExpression.subtitle}</p>
                <p className="pd-expr-spotlight__desc">{activeExpression.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Inside CHIPI (Exploded Hardware Architecture) */}
      <section className="pd-inside-sec" aria-labelledby="pd-inside-h">
        <div className="pd-wrap">
          <div className="pd-sec-header">
            <p className="pd-kicker">Engineering Architecture</p>
            <h2 id="pd-inside-h">Inside CHIPI</h2>
            <p>
              Designed and built from component level inside the Ralypto Hardware Lab. A precision modular assembly
              engineered for durability, compact packaging, and responsive interaction.
            </p>
          </div>

          <div className="pd-inside-diagram">
            <div className="pd-inside-diagram__frame">
              <Image
                src="/products/chipi/inside-chipi.png"
                alt="Exploded diagram of CHIPI showing Front Cover, OLED Display, Motion Sensor, ESP32 Board, and Back Cover"
                width={800}
                height={350}
                className="pd-inside-diagram__img"
              />
            </div>

            {/* Architecture Steps List */}
            <div className="pd-inside-steps">
              {chipiArchitecture.map((item) => (
                <div key={item.step} className="pd-inside-step">
                  <span className="pd-inside-step__num">{item.step}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Technical Dimensions & Hardware Specifications */}
      <section className="pd-specs-sec" aria-labelledby="pd-specs-h">
        <div className="pd-wrap">
          <div className="pd-sec-header">
            <p className="pd-kicker">Technical Specifications</p>
            <h2 id="pd-specs-h">Dimensions &amp; Physical Design</h2>
            <p>
              Pocket-friendly ergonomics built for everyday carry. Measured approximations based on current prototyping
              tooling.
            </p>
          </div>

          <div className="pd-specs-grid">
            {/* Dimensions Wireframe Illustration */}
            <div className="pd-specs-wireframe">
              <div className="pd-specs-wireframe__card">
                <Image
                  src="/products/chipi/chipi-dimensions.png"
                  alt="Isometric dimension diagram of CHIPI: 32 mm width, 16 mm depth, 32 mm height"
                  width={380}
                  height={380}
                  className="pd-specs-wireframe__img"
                />
                <div className="pd-specs-wireframe__caption">
                  <span>Isometric Form Factor</span>
                  <small>32 mm × 16 mm × 32 mm</small>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="pd-specs-list-card">
              <h3 className="pd-specs-list-title">Confirmed Hardware Specifications</h3>
              <dl className="pd-specs-dl">
                {chipiSpecs.map((spec) => (
                  <div key={spec.label} className="pd-specs-row">
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="pd-specs-note">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>Prototyped and built by Ralypto Hardware Lab. Specifications verified against production tooling.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Early-Bird Pre-Order Banner */}
      <section className="pd-early" aria-labelledby="pd-early-h">
        <div className="pd-wrap pd-early__in">
          <div>
            <p className="pd-kicker">Limited Early-Bird Release</p>
            <h2 id="pd-early-h">{earlyBird.heading}</h2>
            <p>{earlyBird.text}</p>
            <div className="pd-early__cta-row">
              <button type="button" className="pd-btn pd-btn--glow" onClick={startPreOrder} aria-haspopup="dialog">
                <span>Pre-Order CHIPI</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <span className="pd-early__price-tag">Estimated price: {chipi.price}</span>
            </div>
          </div>
          <ul className="pd-checks">
            {earlyBird.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 6: Trust Signals */}
      <section className="pd-trust" aria-label="Why pre-order with Ralypto">
        <div className="pd-wrap">
          <ul>
            {trust.map((t) => (
              <li key={t.title}>
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="pd-faq" aria-labelledby="pd-faq-h">
        <div className="pd-wrap pd-faq__in">
          <h2 id="pd-faq-h">Questions, answered</h2>
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

      {/* Existing Pre-Order Modal with WhatsApp Registration Flow */}
      <PreOrderModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
