"use client";
import type { ReactElement, ReactNode } from "react";
import { Effect, Effects } from "@animate-ui/react/primitives/effects/effect";
import { Magnetic } from "@animate-ui/react/primitives/effects/magnetic";
import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import { ShimmeringText } from "@animate-ui/react/primitives/texts/shimmering";
import {
  ScrollProgress,
  ScrollProgressProvider,
} from "@animate-ui/react/primitives/scroll-progress";
import { ReducedMotionConfig } from "@animate-ui/react/utils/motion";

/* Animate UI pieces used on the homepage. Each one respects reduced motion on its own. */

/** Spring-smoothed bar at the top that follows the page scroll. */
export function ScrollBar() {
  return (
    <ReducedMotionConfig>
      <ScrollProgressProvider global>
        <ScrollProgress mode="scaleX" className="hm-progress" aria-hidden="true" />
      </ScrollProgressProvider>
    </ReducedMotionConfig>
  );
}

/** Children come in one after another: fade + light blur + short slide. */
export function Stagger({ children, hold = 110, delay = 0 }: { children: ReactElement | ReactElement[]; hold?: number; delay?: number }) {
  return (
    <Effects asChild holdDelay={hold} delay={delay} fade blur={{ initialBlur: 3 }} slide={{ direction: "up", offset: 18 }}>
      {children}
    </Effects>
  );
}

/** One block that enters as it scrolls into view. */
export function Enter({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <Effect inView inViewOnce delay={delay} className={className} fade blur={{ initialBlur: 4 }} slide={{ direction: "up", offset: 28 }} zoom={{ initialScale: 0.97 }}>
      {children}
    </Effect>
  );
}

/** Button gently pulled toward the pointer. Off on touch screens. */
export function Pull({ children }: { children: ReactNode }) {
  return (
    <Magnetic strength={0.25} range={120} disableOnTouch className="hm-pull">
      {children}
    </Magnetic>
  );
}

/** A card that tilts a few degrees toward the pointer, children keep their layout. */
export function TiltCard({ children, tilt = 5 }: { children: ReactNode; tilt?: number }) {
  return (
    <Tilt maxTilt={tilt} perspective={1100} className="hm-tilt">
      <TiltContent className="hm-tilt__in">{children}</TiltContent>
    </Tilt>
  );
}

/** Stat strip: numbers count up when scrolled into view. */
export function Stats({ items }: { items: { n: number; label: string; suffix?: string }[] }) {
  return (
    <ul className="hm-stats">
      {items.map((s, i) => (
        <li key={s.label}>
          <b>
            <CountingNumber number={s.n} inView inViewOnce delay={i * 120} className="hm-num" />
            {s.suffix}
          </b>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** A soft glint running across a short line of text. */
export function Shimmer({ text }: { text: string }) {
  return <ShimmeringText text={text} duration={2.4} color="#ffaf0d" shimmeringColor="#fff3cf" />;
}
