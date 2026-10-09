"use client";

import { useEffect, useRef } from "react";

/* Blueprint robot arm. Joints move on continuous sine waves (requestAnimationFrame), 
   so the motion has no jerks, and the drawing area leaves room for every pose. */

export default function RobotArm() {
  const shoulder = useRef<SVGGElement>(null);
  const elbow = useRef<SVGGElement>(null);
  const wrist = useRef<SVGGElement>(null);
  const jawTop = useRef<SVGPathElement>(null);
  const jawBottom = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = reduce ? 1 : (now - start) / 1000;
      const s = Math.sin(t * 0.9) * 14 - 4;
      const e = Math.sin(t * 0.9 + 1.1) * 18;
      const w = Math.sin(t * 0.9 + 2.2) * 16;
      const j = (Math.sin(t * 1.8) + 1) * 6;

      shoulder.current?.setAttribute("transform", `rotate(${s} 200 230)`);
      elbow.current?.setAttribute("transform", `rotate(${e} 165 132)`);
      wrist.current?.setAttribute("transform", `rotate(${w} 284 96)`);
      jawTop.current?.setAttribute("transform", `rotate(${j} 292 90)`);
      jawBottom.current?.setAttribute("transform", `rotate(${-j} 292 102)`);

      if (!reduce) id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <svg
      className="arm"
      viewBox="-10 -10 420 320"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Moving robot arm drawing"
    >
      <g className="arm__draw">
        <line x1="110" y1="270" x2="290" y2="270" />
        <rect x="140" y="240" width="120" height="30" />
        <g ref={shoulder}>
          <circle cx="200" cy="230" r="14" />
          <line x1="196" y1="217" x2="160" y2="140" />
          <line x1="208" y1="221" x2="174" y2="134" />
          <g ref={elbow}>
            <circle cx="165" cy="132" r="12" />
            <line x1="175" y1="125" x2="275" y2="90" />
            <line x1="172" y1="138" x2="278" y2="104" />
            <g ref={wrist}>
              <circle cx="284" cy="96" r="9" />
              <path ref={jawTop} d="M292 90 l26 -10 l6 8 l-18 8" />
              <path ref={jawBottom} d="M292 102 l26 10 l6 -8 l-18 -8" />
            </g>
          </g>
        </g>
      </g>
      <g className="arm__dims">
        <line x1="140" y1="285" x2="260" y2="285" />
        <line x1="140" y1="280" x2="140" y2="290" />
        <line x1="260" y1="280" x2="260" y2="290" />
        <text x="200" y="300" textAnchor="middle">120</text>
        <line x1="70" y1="132" x2="70" y2="230" />
        <line x1="65" y1="132" x2="75" y2="132" />
        <line x1="65" y1="230" x2="75" y2="230" />
        <text x="58" y="185" textAnchor="middle" transform="rotate(-90 58 185)">98</text>
      </g>
    </svg>
  );
}
