"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// Dynamically import Three.js scene (SSR disabled for WebGL)
const Chipi3DScene = dynamic(() => import("./Chipi3DScene"), {
  ssr: false,
  loading: () => (
    <div className="chipi-3d__loader" aria-label="Loading 3D CHIPI">
      <div className="chipi-3d__spinner" />
      <span>Loading 3D CHIPI ...</span>
    </div>
  ),
});

export type ExpressionType = "normal" | "happy" | "sleepy" | "surprised";

interface Chipi3DViewerProps {
  expression?: ExpressionType;
  onExpressionChange?: (expr: ExpressionType) => void;
  className?: string;
}

const EXPRESSIONS: { id: ExpressionType; label: string; mood: string }[] = [
  { id: "normal", label: "Normal", mood: "Focused & Alert" },
  { id: "happy", label: "Happy", mood: "Cheerful (⌒ ⌒)" },
  { id: "sleepy", label: "Sleepy", mood: "Resting (- -)" },
  { id: "surprised", label: "Surprised", mood: "Curious (o o)" },
];

export default function Chipi3DViewer({
  expression = "normal",
  onExpressionChange,
  className = "",
}: Chipi3DViewerProps) {
  const [internalExpr, setInternalExpr] = useState<ExpressionType>(expression);
  const [exploded, setExploded] = useState(false);
  const [labels, setLabels] = useState(false); // Clean and un-cluttered by default
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetCount, setResetCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external expression prop if changed
  useEffect(() => {
    setInternalExpr(expression);
  }, [expression]);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (media.matches) {
        setAutoRotate(false);
      }
    }
  }, []);

  // WebGL availability check
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // IntersectionObserver for lazy loading WebGL (Hardware Lab style)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { rootMargin: "350px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handlePointerDown = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleReset = useCallback(() => {
    setResetCount((prev) => prev + 1);
    setHasInteracted(true);
  }, []);

  const handleSelectExpr = (exprId: ExpressionType) => {
    setInternalExpr(exprId);
    if (onExpressionChange) {
      onExpressionChange(exprId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`chipi-3d ${className}`}
      tabIndex={0}
      aria-label="Interactive 3D CHIPI Showcase"
      onPointerDown={handlePointerDown}
    >
      {/* 3D WebGL Canvas Stage */}
      <div className="chipi-3d__stage">
        {/* Ambient Warm Studio Glow Behind Model */}
        <div className="chipi-3d__ambient-glow" aria-hidden="true" />

        {/* 360 Indicator Badge (Top-Right, Never collides with pre-order badge on top-left) */}
        <div className="chipi-3d__orbit-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>360° Orbit</span>
        </div>

        {/* Interaction Hint Pill (Placed cleanly at bottom-center of stage) */}
        <div className={`chipi-3d__hint ${hasInteracted ? "is-faded" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 2a10 10 0 0 0-7.07 17.07l2.83-2.83A6 6 0 1 1 12 18v3l5-4-5-4v3a8 8 0 1 0-8-8H2a10 10 0 0 0 10 10z" />
          </svg>
          <span>Drag to turn CHIPI around</span>
        </div>

        {webglSupported ? (
          visible ? (
            <Chipi3DScene
              expression={internalExpr}
              exploded={exploded}
              animate={autoRotate}
              labels={labels}
              resetSignal={resetCount}
            />
          ) : (
            <div className="chipi-3d__sleeping" aria-hidden="true">
              <div className="chipi-3d__spinner" />
              <span>[ 3D Scene in Standby ]</span>
            </div>
          )
        ) : (
          /* WebGL Fallback */
          <div className="chipi-3d__fallback">
            <Image
              src="/products/chipi/chipi-hero.jpg"
              alt="CHIPI front view"
              width={1376}
              height={768}
              className="chipi-3d__fallback-img"
            />
            <p>Interactive 3D requires WebGL support.</p>
          </div>
        )}
      </div>

      {/* Clean OLED Mood Selector Strip */}
      <div className="chipi-3d__expr-strip" role="tablist" aria-label="Facial Expressions">
        <span className="chipi-3d__strip-label">OLED Face:</span>
        <div className="chipi-3d__expr-pills">
          {EXPRESSIONS.map((item) => {
            const active = item.id === internalExpr;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`chipi-3d__expr-pill ${active ? "is-active" : ""}`}
                onClick={() => handleSelectExpr(item.id)}
                title={item.mood}
              >
                <span className="chipi-3d__expr-dot" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hardware Lab Controls Bar */}
      <div className="chipi-3d__controls">
        <div className="chipi-3d__toggles">
          <label className="chipi-3d__toggle">
            <input
              type="checkbox"
              checked={labels}
              onChange={(e) => setLabels(e.target.checked)}
            />
            <span>Show part names</span>
          </label>
          <label className="chipi-3d__toggle">
            <input
              type="checkbox"
              checked={exploded}
              onChange={(e) => setExploded(e.target.checked)}
            />
            <span>Exploded view</span>
          </label>
        </div>

        <div className="chipi-3d__btn-group">
          <button
            type="button"
            className={`chipi-3d__action-btn ${autoRotate && !exploded ? "is-active" : ""}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? "Pause auto-rotation" : "Enable slow auto-rotation"}
            aria-pressed={autoRotate}
          >
            <span className={`chipi-3d__rotate-ico ${autoRotate && !exploded ? "is-spinning" : ""}`}>
              ⟳
            </span>
            <span>{autoRotate ? "Rotate: ON" : "Rotate: OFF"}</span>
          </button>

          <button
            type="button"
            className="chipi-3d__action-btn"
            onClick={handleReset}
            title="Reset front perspective"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Reset Front</span>
          </button>
        </div>
      </div>
    </div>
  );
}
