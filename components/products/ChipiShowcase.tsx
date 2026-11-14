"use client";
import { useState } from "react";
import { chipi, earlyBird, faq, trust } from "@/lib/products";
import ProductIcon from "./ProductIcon";
import ProductImage from "./ProductImage";
import PreOrderModal from "./PreOrderModal";

const statusLabel = {
  "open-24h": "Pre-orders open 24 hours",
  "opening-soon": "Pre-order opening soon",
  "early-bird": "Limited early-bird pre-orders",
};

export default function ChipiShowcase() {
  const [open, setOpen] = useState(false);
  const start = () => setOpen(true);

  return (
    <div className="pd">
      <section className="pd-hero" aria-labelledby="pd-h1">
        <div className="pd-bg" aria-hidden="true"><i /><i /><i /></div>
        <div className="pd-wrap">
          <header className="pd-intro">
            <p className="pd-kicker">Products</p>
            <h1 id="pd-h1">Meet Our Products</h1>
            <p>Small ideas. Big possibilities. Discover innovative products designed to make everyday experiences smarter, simpler, and more exciting.</p>
          </header>

          <article className="pd-card">
            <div className="pd-card__media">
              <span className="pd-badge"><b aria-hidden="true" /> {statusLabel[chipi.status]}</span>
              <ProductImage src={chipi.images[0].src} alt={chipi.images[0].alt} priority />
            </div>
            <div className="pd-card__body">
              <p className="pd-cat">{chipi.category}</p>
              <h2>{chipi.name}</h2>
              <p className="pd-tease">{chipi.teaser}</p>
              <p>{chipi.description}</p>
              <ul className="pd-feats">
                {chipi.features.map((f) => (
                  <li key={f.title}>
                    <span className="pd-ico"><ProductIcon name={f.icon} /></span>
                    <span><strong>{f.title}</strong><small>{f.text}</small></span>
                  </li>
                ))}
              </ul>
              <div className="pd-buy">
                <div>
                  <span className="pd-price__label">Estimated price</span>
                  <span className="pd-price">{chipi.price}</span>
                </div>
                <button type="button" className="pd-btn" onClick={start} aria-haspopup="dialog">Pre-Order Now</button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="pd-early" aria-labelledby="pd-early-h">
        <div className="pd-wrap pd-early__in">
          <div>
            <p className="pd-kicker">Early-bird offer</p>
            <h2 id="pd-early-h">{earlyBird.heading}</h2>
            <p>{earlyBird.text}</p>
            <button type="button" className="pd-btn" onClick={start} aria-haspopup="dialog">Pre-Order Now</button>
          </div>
          <ul className="pd-checks">
            {earlyBird.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </section>

      <section className="pd-trust" aria-label="Why pre-order with Ralypto">
        <div className="pd-wrap">
          <ul>
            {trust.map((t) => (
              <li key={t.title}><strong>{t.title}</strong><span>{t.text}</span></li>
            ))}
          </ul>
        </div>
      </section>

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

      <PreOrderModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
