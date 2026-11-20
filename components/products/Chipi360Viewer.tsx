"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface AngleInfo {
  index: number;
  deg: number;
  label: string;
  fullLabel: string;
  desc: string;
}

export const ANGLES: AngleInfo[] = [
  { index: 0, deg: 0, label: "0°", fullLabel: "0° (Front)", desc: "Front OLED display with expressive facial animations" },
  { index: 1, deg: 45, label: "45°", fullLabel: "45°", desc: "Front-right chamfered perspective and side profile" },
  { index: 2, deg: 90, label: "90°", fullLabel: "90° (Right)", desc: "Right profile showcasing compact 16 mm pocket depth" },
  { index: 3, deg: 135, label: "135°", fullLabel: "135°", desc: "Rear-right perspective with keychain attachment loop" },
  { index: 4, deg: 180, label: "180°", fullLabel: "180° (Back)", desc: "Matte rear enclosure with precision hardware casing" },
  { index: 5, deg: 225, label: "225°", fullLabel: "225°", desc: "Rear-left perspective showing metal keychain ring" },
  { index: 6, deg: 270, label: "270°", fullLabel: "270° (Left)", desc: "Left profile highlighting slim ergonomic form factor" },
  { index: 7, deg: 315, label: "315°", fullLabel: "315°", desc: "Front-left angle with top petting sensor clearly visible" },
];

const FRAME_COUNT = 8;
const WEBP_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `/products/chipi/chipi-360-${i}.webp`);
const PNG_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `/products/chipi/chipi-360-${i}.png`);
const FALLBACK_HERO = "/products/chipi/chipi-hero.png";

const DRAG_STEP_PX = 20; // Pixels dragged per 45° angle step

export default function Chipi360Viewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [usePng, setUsePng] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const accumDeltaRef = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef(false);

  // Preload all 8 frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const frames = usePng ? PNG_FRAMES : WEBP_FRAMES;
    const imgObjects: HTMLImageElement[] = [];

    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isCancelled) return;
        loadedCount += 1;
        if (loadedCount >= FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        if (!usePng) {
          // Retry with PNG fallbacks
          setUsePng(true);
        } else {
          setHasFailed(true);
          setIsLoaded(true);
        }
      };
      imgObjects.push(img);
    });

    return () => {
      isCancelled = true;
    };
  }, [usePng]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (media.matches) {
        setIsAutoRotate(false);
      }
    }
  }, []);

  // Step rotation helper
  const stepAngle = useCallback((deltaSteps: number) => {
    setCurrentIndex((prev) => {
      const next = (prev + deltaSteps) % FRAME_COUNT;
      return next < 0 ? next + FRAME_COUNT : next;
    });
  }, []);

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotate || isInteractingRef.current) {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
      return;
    }

    autoRotateIntervalRef.current = setInterval(() => {
      stepAngle(1);
    }, 950);

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
    };
  }, [isAutoRotate, stepAngle]);

  // Pause & resume auto-rotation
  const pauseAutoRotate = useCallback(() => {
    isInteractingRef.current = true;
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResumeAutoRotate = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      if (isAutoRotate) {
        // Trigger re-render of effect
        setIsAutoRotate((prev) => !prev);
        setTimeout(() => setIsAutoRotate((prev) => !prev), 10);
      }
    }, 3200);
  }, [isAutoRotate]);

  // Pointer event handlers (Mouse + Touch unified)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to primary mouse button or touch
    if (e.button !== 0) return;
    pauseAutoRotate();
    setIsDragging(true);
    setHasInteracted(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    accumDeltaRef.current = 0;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const delta = currentX - lastXRef.current;
    accumDeltaRef.current += delta;
    lastXRef.current = currentX;

    if (Math.abs(accumDeltaRef.current) >= DRAG_STEP_PX) {
      // Dragging left moves angle clockwise (+1), dragging right moves counter-clockwise (-1)
      const steps = Math.trunc(accumDeltaRef.current / DRAG_STEP_PX);
      stepAngle(-steps);
      accumDeltaRef.current -= steps * DRAG_STEP_PX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
    scheduleResumeAutoRotate();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      pauseAutoRotate();
      stepAngle(-1);
      setHasInteracted(true);
      scheduleResumeAutoRotate();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      pauseAutoRotate();
      stepAngle(1);
      setHasInteracted(true);
      scheduleResumeAutoRotate();
    } else if (e.key === "Home") {
      e.preventDefault();
      resetToFront();
    }
  };

  // Reset to front view (0°)
  const resetToFront = () => {
    pauseAutoRotate();
    setHasInteracted(true);
    setCurrentIndex(0);
    scheduleResumeAutoRotate();
  };

  // Toggle auto-rotation
  const toggleAutoRotate = () => {
    setHasInteracted(true);
    setIsAutoRotate((prev) => !prev);
    isInteractingRef.current = false;
  };

  const activeAngle = ANGLES[currentIndex];
  const currentSrc = hasFailed
    ? FALLBACK_HERO
    : usePng
    ? PNG_FRAMES[currentIndex]
    : WEBP_FRAMES[currentIndex];

  // Calculate turntable rotation degrees for visual sync
  const turntableRotation = activeAngle.deg;

  return (
    <div
      className="chipi-360"
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="CHIPI 360-degree interactive product viewer"
    >
      {/* Top Bar: Angle indicator & quick status */}
      <div className="chipi-360__header">
        <div className="chipi-360__status-pill">
          <span className="chipi-360__status-dot" aria-hidden="true" />
          <span className="chipi-360__angle-text">{activeAngle.fullLabel}</span>
        </div>

        <div className="chipi-360__badge-wrap">
          <span className="chipi-360__badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.6L21 8" />
              <polyline points="21 3 21 8 16 8" />
            </svg>
            Interactive 360°
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        className={`chipi-360__stage ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => pauseAutoRotate()}
        onMouseLeave={() => scheduleResumeAutoRotate()}
      >
        {/* Ambient Backlight Glow */}
        <div className="chipi-360__ambient-glow" aria-hidden="true" />

        {/* Loading Spinner */}
        {!isLoaded && !hasFailed && (
          <div className="chipi-360__loader" aria-live="polite">
            <div className="chipi-360__spinner" aria-hidden="true" />
            <span>Loading 360° View...</span>
          </div>
        )}

        {/* Interactive Turntable Pedestal (SVG vector with animated rotation) */}
        <div className="chipi-360__turntable" aria-hidden="true">
          <svg viewBox="0 0 400 180" className="chipi-360__turntable-svg">
            <defs>
              <radialGradient id="turntableGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFAF0D" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#FFAF0D" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#FFAF0D" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFAF0D" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#FFAF0D" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFAF0D" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Base platform ellipse glow */}
            <ellipse cx="200" cy="110" rx="170" ry="46" fill="url(#turntableGlow)" />

            {/* Platform body cylinder effect */}
            <ellipse cx="200" cy="114" rx="146" ry="36" fill="#081026" stroke="rgba(255, 175, 13, 0.25)" strokeWidth="1.5" />
            <ellipse cx="200" cy="110" rx="145" ry="35" fill="#0a1533" stroke="url(#ringStroke)" strokeWidth="2" />

            {/* Inner turntable concentric grooves */}
            <ellipse cx="200" cy="110" rx="116" ry="27" fill="none" stroke="rgba(255, 175, 13, 0.4)" strokeWidth="1" strokeDasharray="4 3" />
            <ellipse cx="200" cy="110" rx="84" ry="19" fill="none" stroke="rgba(255, 175, 13, 0.6)" strokeWidth="1.2" />
            <ellipse cx="200" cy="110" rx="46" ry="11" fill="none" stroke="#FFAF0D" strokeWidth="1.5" />

            {/* Dynamic rotating angle tick marker */}
            <g transform={`rotate(${turntableRotation}, 200, 110)`}>
              <circle cx="200" cy="75" r="3.5" fill="#FFAF0D" />
              <line x1="200" y1="75" x2="200" y2="82" stroke="#FFAF0D" strokeWidth="2" />
            </g>
          </svg>

          {/* Turntable badge: < 360° View > */}
          <div className="chipi-360__turntable-badge">
            <button
              type="button"
              className="chipi-360__chevron-btn"
              onClick={() => { pauseAutoRotate(); stepAngle(-1); scheduleResumeAutoRotate(); }}
              aria-label="Rotate left"
            >
              ‹
            </button>
            <span className="chipi-360__turntable-label">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.6L21 8" />
                <polyline points="21 3 21 8 16 8" />
              </svg>
              360° View
            </span>
            <button
              type="button"
              className="chipi-360__chevron-btn"
              onClick={() => { pauseAutoRotate(); stepAngle(1); scheduleResumeAutoRotate(); }}
              aria-label="Rotate right"
            >
              ›
            </button>
          </div>
        </div>

        {/* Product Image Frame */}
        <div className="chipi-360__frame-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSrc}
            alt={`Chipi at ${activeAngle.fullLabel} angle - ${activeAngle.desc}`}
            className="chipi-360__img"
            width={500}
            height={500}
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Interaction Hint: "Drag to explore CHIPI" */}
        <div className={`chipi-360__hint ${hasInteracted ? "is-faded" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 7h8M8 7l3-3M8 7l3 3M16 17H8M16 17l-3-3M16 17l-3 3" />
          </svg>
          <span>Drag to explore CHIPI</span>
        </div>
      </div>

      {/* Angle Perspective Strip / Quick Dial */}
      <div className="chipi-360__pills" role="tablist" aria-label="Select view angle">
        {ANGLES.map((a) => {
          const isActive = a.index === currentIndex;
          return (
            <button
              key={a.deg}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`View CHIPI at ${a.fullLabel}`}
              className={`chipi-360__pill ${isActive ? "is-active" : ""}`}
              onClick={() => {
                pauseAutoRotate();
                setCurrentIndex(a.index);
                setHasInteracted(true);
                scheduleResumeAutoRotate();
              }}
            >
              <span className="chipi-360__pill-dot" aria-hidden="true" />
              <span className="chipi-360__pill-label">{a.label}</span>
            </button>
          );
        })}
      </div>

      {/* Control Actions Bar: Auto-Rotate, Reset View, Angle description */}
      <div className="chipi-360__actions">
        <p className="chipi-360__desc-text">
          <strong>{activeAngle.fullLabel}:</strong> {activeAngle.desc}
        </p>

        <div className="chipi-360__btn-group">
          {/* Reset View Button */}
          <button
            type="button"
            className="chipi-360__action-btn"
            onClick={resetToFront}
            title="Reset to front-facing perspective"
            aria-label="Reset product to front-facing view"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            <span>Reset View</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            type="button"
            className={`chipi-360__action-btn ${isAutoRotate ? "is-active" : ""}`}
            onClick={toggleAutoRotate}
            aria-pressed={isAutoRotate}
            title={isAutoRotate ? "Pause automatic slow rotation" : "Enable automatic slow rotation"}
          >
            <span className={`chipi-360__rotate-indicator ${isAutoRotate ? "is-spinning" : ""}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
              </svg>
            </span>
            <span>Auto-Rotate: {isAutoRotate ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
