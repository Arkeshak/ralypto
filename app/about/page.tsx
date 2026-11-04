import type { Metadata } from "next";
import { AboutHero, Leadership, ScrollProgress, ValuesGrid } from "@/components/AboutMotion";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Leadership",
  description:
    "Meet the team behind Ralypto — Arkeshkar prashanthkumar, Joelmelcome Abieshake, Hithush Mohanaraja and Velerian Vinith. Software, creative design and hardware systems under one studio.",
};

const values = [
  {
    title: "Build it right",
    text: "We would rather ship something small that works than something big that breaks.",
  },
  {
    title: "Design with purpose",
    text: "Every screen, poster and circuit has a job. If it does not help, it goes.",
  },
  {
    title: "Own the result",
    text: "We stay after launch. If it is ours, we fix it.",
  },
];

export default function AboutPage() {
  return (
    <div className="page about">
      <ScrollProgress />
      <AboutHero
        title="Three crafts, one studio."
        text="Ralypto is built by Arkeshkar prashanthkumar, Joelmelcome Abieshake, Hithush Mohanaraja and Velerian Vinith. From production software and scalable ERPs to brand design and embedded hardware, every project gets end-to-end craft, speed, and personal accountability."
      />
      <ValuesGrid values={values} />
      <Leadership team={team} />
    </div>
  );
}
