"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Brand Motion Reel",
    category: "4K Motion & Direction",
    image: "/creative/video-showreel.jpg",
    color: "#FF2E93", // Neon pink
    badge: "60 FPS • ProRes Master",
  },
  {
    title: "Aero Pods Commercial",
    category: "3D Product Visuals",
    image: "/creative/video-earbuds.jpg",
    color: "#00F0FF", // Electric cyan
    badge: "Cinema 4D • Octane Render",
  },
  {
    title: "Volttix Identity System",
    category: "Brand Architecture",
    image: "/creative/logo-volttix.jpg",
    color: "#FFE800", // Acid yellow
    badge: "Logo, Typography & Guidelines",
  },
  {
    title: "Streetwear Campaign",
    category: "Visual Art & Advertising",
    image: "/creative/graphic-shoe-ad.jpg",
    color: "#A259FF", // Ultraviolet
    badge: "Art Direction & Billboard Ad",
  },
  {
    title: "Tech Innovation Launch",
    category: "Digital Performance Ad",
    image: "/creative/ad-tech.jpg",
    color: "#22E37B", // Neon lime
    badge: "High-Engagement Visuals",
  },
];

const swatches = ["#FF2E93", "#A259FF", "#00F0FF", "#FFE800", "#FFFFFF"];

export default function CreativeHeroPreview() {
  const [current, setCurrent] = useState(0);
  const [frame, setFrame] = useState(14);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slideTimer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3200);

    const frameTimer = setInterval(() => {
      setFrame((f) => (f >= 59 ? 1 : f + 1));
    }, 120);

    return () => {
      clearInterval(slideTimer);
      clearInterval(frameTimer);
    };
  }, []);

  const slide = slides[current];

  return (
    <div className="cr-preview">
      {/* Background visual slides with Ken Burns subtle motion */}
      <div className="cr-preview__media">
        {slides.map((s, index) => (
          <div
            key={s.image}
            className={`cr-preview__slide ${index === current ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="cr-preview__overlay" />
      </div>

      {/* Viewfinder brackets */}
      <div className="cr-preview__viewfinder" aria-hidden="true">
        <span className="cr-bracket cr-bracket--tl" />
        <span className="cr-bracket cr-bracket--tr" />
        <span className="cr-bracket cr-bracket--bl" />
        <span className="cr-bracket cr-bracket--br" />
        <span className="cr-crosshair" />
      </div>

      {/* Top HUD: Status & Timecode */}
      <div className="cr-preview__hud-top" aria-hidden="true">
        <div className="cr-rec">
          <span className="cr-rec__dot" />
          <span className="cr-rec__text">REC [4K HDR]</span>
        </div>
        <div className="cr-timecode">
          TC 00:0{current + 1}:24:{String(frame).padStart(2, "0")}
        </div>
      </div>

      {/* Rotating Studio Stamp Badge */}
      <div className="cr-preview__stamp" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="cr-stamp-svg">
          <path
            id="crStampPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text fontSize="10.8" fontWeight="700" letterSpacing="2.2">
            <textPath href="#crStampPath" fill="currentColor">
              RALYPTO STUDIO • DESIGN & MOTION •
            </textPath>
          </text>
        </svg>
        <span className="cr-stamp-icon">✦</span>
      </div>

      {/* Bottom HUD: Active craft info & EQ Waveform */}
      <div className="cr-preview__hud-bottom">
        <div className="cr-info">
          <div
            className="cr-info__badge"
            style={{ borderColor: slide.color, color: slide.color }}
          >
            {slide.category}
          </div>
          <h4 className="cr-info__title">{slide.title}</h4>
          <span className="cr-info__sub">{slide.badge}</span>
        </div>

        <div className="cr-side" aria-hidden="true">
          {/* Swatches */}
          <div className="cr-swatches">
            {swatches.map((c) => (
              <span
                key={c}
                className="cr-swatch"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>

          {/* Equalizer Waveform */}
          <div className="cr-eq">
            <span className="cr-eq__bar" />
            <span className="cr-eq__bar" />
            <span className="cr-eq__bar" />
            <span className="cr-eq__bar" />
            <span className="cr-eq__bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
