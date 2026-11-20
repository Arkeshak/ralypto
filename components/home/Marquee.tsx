"use client";

import { useMemo } from "react";

interface MarqueeProps {
  items?: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
  className?: string;
}

const DEFAULT_ITEMS = [
  "Software Lab",
  "Creative Studio",
  "Hardware Lab",
  "Intelligent Systems",
  "Smart Connected Devices",
  "Digital Experiences",
  "Industrial Prototyping",
  "Designed & Engineered in Sri Lanka",
];

/**
 * Infinite Marquee Component
 * Matches yuyk.in's 60fps marquee ribbon with seamless looping CSS animation.
 */
export default function Marquee({
  items = DEFAULT_ITEMS,
  speed = 28,
  reverse = false,
  className = "",
}: MarqueeProps) {
  // Duplicate array 3 times for a flawless seamless loop without gaps
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div className={`yk-marquee ${className}`} aria-hidden="true">
      <div
        className="yk-marquee__track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((item, idx) => (
          <span key={`${item}-${idx}`} className="yk-marquee__item">
            <span>{item}</span>
            <span className="yk-marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
