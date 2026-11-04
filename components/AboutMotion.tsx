"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import FounderCard from "@/components/FounderCard";
import type { Founder } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/* Thin brand-coloured bar that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="about-progress" style={{ scaleX }} aria-hidden="true" />;
}

/* Headline whose words rise out of a mask one after another. */
export function AboutHero({ title, text }: { title: string; text: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const orbB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);

  const words = title.split(" ");
  return (
    <header ref={ref} className="page-head about-hero">
      <motion.span className="about-hero__orb about-hero__orb--a" style={{ y: orbA }} aria-hidden="true" />
      <motion.span className="about-hero__orb about-hero__orb--b" style={{ y: orbB }} aria-hidden="true" />
      <motion.div style={{ y, opacity: fade }}>
        <motion.p
          className="about-hero__eyebrow"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="about-hero__dot" /> About Ralypto
        </motion.p>
        <h1 aria-label={title}>
          {words.map((w, i) => (
            <span className="about-word" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: "110%", rotate: 6 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.09 }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
        >
          {text}
        </motion.p>
      </motion.div>
    </header>
  );
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* Values: staggered entrance, lift + glow on hover, animated top rule. */
export function ValuesGrid({ values }: { values: { title: string; text: string }[] }) {
  return (
    <motion.section
      className="about__values"
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {values.map((v, i) => (
        <motion.div
          key={v.title}
          className="about-value"
          variants={itemVariants}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="about-value__num">{String(i + 1).padStart(2, "0")}</span>
          <h2>{v.title}</h2>
          <p>{v.text}</p>
          <motion.span
            className="about-value__bar"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.3 } } }}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}

/* One leader card: slides in from alternating sides and tilts toward the cursor. */
function TiltCard({ f, index }: { f: Founder; index: number }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className="about-tilt"
      initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease, delay: 0.05 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
    >
      <FounderCard f={f} />
    </motion.div>
  );
}

export function Leadership({ team }: { team: Founder[] }) {
  return (
    <section className="about__team">
      <motion.h2
        className="about__team-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        Leadership
      </motion.h2>
      <motion.p
        className="about__team-description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
      >
        The team behind Ralypto.
      </motion.p>
      <div className="founder-grid about-team-grid">
        {team.map((f, i) => (
          <TiltCard key={f.id} f={f} index={i} />
        ))}
      </div>
    </section>
  );
}

/* Separate "who does what" list: one animated row per person with their role. */
export function RolesSection({ team }: { team: Founder[] }) {
  return (
    <section className="about-roles">
      <motion.h2
        className="about__team-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        Who does what
      </motion.h2>
      <motion.ul
        className="about-roles__list"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {team.map((p) => (
          <motion.li
            key={p.id}
            className={`about-role about-role--${p.lab}`}
            variants={itemVariants}
            whileHover={{ x: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <span className="about-role__name">{p.name}</span>
            <span className="about-role__title">{p.role}</span>
            <span className="about-role__desc">{p.bio}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
