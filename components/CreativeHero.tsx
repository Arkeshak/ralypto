"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { labs } from "@/lib/content";

interface CreativeSlide {
  id: string;
  tag: string;
  discipline: string;
  title: string;
  client: string;
  category: string;
  image: string;
  badge: string;
  lens: string;
  accent: string;
  palette: string[];
}

const SLIDES: CreativeSlide[] = [
  {
    id: "motion",
    tag: "01 Motion",
    discipline: "3D Motion & Sound",
    title: "Aero Pods Pro Commercial",
    client: "Aero Acoustic Labs",
    category: "Cinema 4D • Octane • 4K HDR",
    image: "/creative/video-earbuds.jpg",
    badge: "60 FPS ProRes Master",
    lens: "Cooke S4/i 35mm • T2.0 • ISO 800",
    accent: "#00F0FF",
    palette: ["#00F0FF", "#A259FF", "#FF2E93", "#0E131F"]
  },
  {
    id: "packaging",
    tag: "02 Packaging",
    discipline: "Identity & Packaging",
    title: "Kopi & Co. Artisanal Roast",
    client: "Kopi Specialty Roasters",
    category: "Brand Architecture & Packaging",
    image: "/work/cafe-brand-identity.png",
    badge: "Custom Pouch • Foil Stamp",
    lens: "Macro 90mm • T2.8 • ISO 400",
    accent: "#F59E0B",
    palette: ["#F59E0B", "#78350F", "#FEF3C7", "#1E293B"]
  },
  {
    id: "identity",
    tag: "03 Identity",
    discipline: "Brand Architecture",
    title: "Volttix Clean-Energy Brand",
    client: "Volttix Mobility",
    category: "Geometric Logomark & Guidelines",
    image: "/creative/logo-volttix.jpg",
    badge: "Type Specimen & SVG Mark",
    lens: "Prime 50mm • T1.4 • ISO 200",
    accent: "#FFE800",
    palette: ["#FFE800", "#FF2E93", "#111827", "#FFFFFF"]
  },
  {
    id: "campaign",
    tag: "04 Billboard",
    discipline: "Campaign Art Direction",
    title: "Cyber Streetwear Billboard",
    client: "Kicks Division",
    category: "Visual Art & Advertising",
    image: "/creative/graphic-shoe-ad.jpg",
    badge: "Large-Format 300 DPI",
    lens: "Ultra-Wide 24mm • T1.8 • ISO 640",
    accent: "#FF2E93",
    palette: ["#FF2E93", "#00F0FF", "#FFE800", "#050505"]
  },
  {
    id: "performance",
    tag: "05 Performance",
    discipline: "Digital Growth Ads",
    title: "NextWave Tech Launch",
    client: "NextWave OS",
    category: "Omnichannel Creative Deck",
    image: "/creative/ad-tech.jpg",
    badge: "4.8x Conversion Lift",
    lens: "Anamorphic 40mm • T2.0 • ISO 500",
    accent: "#22E37B",
    palette: ["#22E37B", "#00F0FF", "#0B1528", "#FFFFFF"]
  },
  {
    id: "retouch",
    tag: "06 Retouch",
    discipline: "Commercial Color Grade",
    title: "Apex GT Velocity Commercial",
    client: "Apex Motors",
    category: "16-Bit RAW Automotive Polish",
    image: "/creative/photo-car-after.jpg",
    badge: "Custom Film LUT Pipeline",
    lens: "Cine Telephoto 85mm • T1.5 • ISO 320",
    accent: "#38BDF8",
    palette: ["#38BDF8", "#0284C7", "#0F172A", "#E2E8F0"]
  }
];

export default function CreativeHero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [frame, setFrame] = useState(18);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frameTimer = setInterval(() => {
      setFrame((f) => (f >= 59 ? 1 : f + 1));
    }, 120);

    return () => clearInterval(frameTimer);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slideTimer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3800);

    return () => clearInterval(slideTimer);
  }, [isPaused]);

  const slide = SLIDES[current];

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1400);
  };

  const handleTagClick = (tag: string) => {
    const map: Record<string, number> = {
      branding: 2,
      video: 0,
      photo: 5,
      "social media": 4,
      ads: 3
    };
    const target = map[tag.toLowerCase()];
    if (target !== undefined) setCurrent(target);
  };

  return (
    <div className="cr-hero">
      <div className="cr-hero__text">
        <h1 className="cr-hero__title">
          <span>Creative</span> <span>Studio</span>
        </h1>
        <p className="cr-hero__promise">{labs.creative.promise}</p>
        <ul className="cr-hero__tags" aria-label="Creative studio disciplines">
          {["Branding", "Video", "Photo", "Social media", "Ads"].map((t) => (
            <li key={t}>
              <button
                type="button"
                className="cr-hero__tag-btn"
                onClick={() => handleTagClick(t)}
                title={`Jump to ${t} showcase`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="cr-hero__art cr-artboard"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Creative Studio Portfolio Showcase"
      >
        {/* Discipline Navigation Tabs */}
        <div className="cr-artboard__tabs" role="tablist">
          {SLIDES.map((s, idx) => {
            const active = idx === current;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={active}
                className={`cr-artboard__tab ${active ? "is-active" : ""}`}
                onClick={() => setCurrent(idx)}
                style={
                  active
                    ? ({
                        "--tab-accent": s.accent
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <span className="cr-artboard__tab-dot" />
                <span>{s.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Frame with Slides */}
        <div className="cr-artboard__viewport">
          {SLIDES.map((s, idx) => (
            <div
              key={s.id}
              className={`cr-artboard__slide ${idx === current ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${s.image})` }}
              role="img"
              aria-label={`${s.title} - ${s.discipline}`}
            />
          ))}

          {/* Vignette and film grain gradients */}
          <div className="cr-artboard__scrim" />

          {/* Director Camera Viewfinder HUD */}
          <div className="cr-artboard__hud-top">
            <div className="cr-rec-badge">
              <span className="cr-rec-dot" />
              <span className="cr-rec-label">REC [4K HDR]</span>
              <span className="cr-fps-tag">60 FPS</span>
            </div>

            <div className="cr-timecode-box">
              <span className="cr-timecode-text">
                TC 00:0{current + 1}:24:{String(frame).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Viewfinder crosshairs & corner crop brackets */}
          <div className="cr-artboard__viewfinder" aria-hidden="true">
            <span className="cr-corner cr-corner--tl" />
            <span className="cr-corner cr-corner--tr" />
            <span className="cr-corner cr-corner--bl" />
            <span className="cr-corner cr-corner--br" />
            <span className="cr-center-crosshair" />
            <div className="cr-rule-third cr-rule-third--h1" />
            <div className="cr-rule-third cr-rule-third--h2" />
          </div>

          {/* Audio visualizer stream */}
          <div className="cr-audio-bars" aria-hidden="true">
            <span style={{ animationDelay: "0ms" }} />
            <span style={{ animationDelay: "140ms" }} />
            <span style={{ animationDelay: "280ms" }} />
            <span style={{ animationDelay: "70ms" }} />
            <span style={{ animationDelay: "210ms" }} />
            <span style={{ animationDelay: "350ms" }} />
          </div>

          {/* Camera Lens Metadata Stamp */}
          <div className="cr-artboard__lens-data" aria-hidden="true">
            <span>{slide.lens}</span>
          </div>

          {/* Bottom Information Panel */}
          <div className="cr-artboard__bottom">
            <div className="cr-artboard__info">
              <div className="cr-artboard__meta">
                <span
                  className="cr-artboard__tag-pill"
                  style={{
                    backgroundColor: slide.accent,
                    color: "#111"
                  }}
                >
                  {slide.discipline}
                </span>
                <span className="cr-artboard__badge-pill">{slide.badge}</span>
              </div>

              <h2 className="cr-artboard__title">{slide.title}</h2>
              <p className="cr-artboard__client">
                Client: <strong>{slide.client}</strong> • {slide.category}
              </p>
            </div>

            {/* Interactive Palette Swatches */}
            <div
              className="cr-artboard__swatches"
              aria-label="Color Palette Swatches"
            >
              <div className="cr-swatch-list">
                {slide.palette.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    className="cr-swatch-btn"
                    style={{ backgroundColor: hex }}
                    onClick={() => handleCopy(hex)}
                    title={`Click to copy ${hex}`}
                    aria-label={`Color swatch ${hex}`}
                  >
                    {copiedHex === hex && (
                      <span className="cr-swatch-tooltip">Copied!</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Playback Controls & Carousel Pager */}
          <div className="cr-artboard__controls">
            <button
              type="button"
              className="cr-ctrl-btn"
              onClick={() =>
                setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
              }
              aria-label="Previous showcase"
              title="Previous showcase"
            >
              ←
            </button>

            <button
              type="button"
              className="cr-ctrl-btn cr-ctrl-btn--play"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Play showcase" : "Pause showcase"}
              title={isPaused ? "Play showcase" : "Pause showcase"}
            >
              {isPaused ? "▶" : "❚❚"}
            </button>

            <button
              type="button"
              className="cr-ctrl-btn"
              onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
              aria-label="Next showcase"
              title="Next showcase"
            >
              →
            </button>

            <div className="cr-artboard__dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`cr-artboard__dot ${i === current ? "is-active" : ""}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Physical studio stickers on frame */}
        <Link
          href="/contact?need=creative"
          className="cr-hero__sticker"
          title="Book your project with Creative Studio"
        >
          <span className="cr-sticker__flash">★</span>
          <span>Now booking</span>
        </Link>
      </div>
    </div>
  );
}
