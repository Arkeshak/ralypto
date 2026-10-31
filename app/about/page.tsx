import type { Metadata } from "next";
import FounderCard from "@/components/FounderCard";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Founder & Leadership",
  description:
    "Meet the founder of Ralypto — Arkeshkar prashanthkumar (Founder & Lead). Directing software engineering, creative design, and hardware systems under one studio.",
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
      <header className="page-head">
        <h1>Three crafts, one studio, one founder.</h1>
        <p>
          Ralypto is founded and driven by Arkeshkar prashanthkumar. From writing
          production software and building scalable ERPs to brand design and
          hardware engineering, every project is handled directly with end-to-end
          craft, speed, and personal accountability.
        </p>
      </header>

      <section className="about__values">
        {values.map((v) => (
          <div key={v.title}>
            <h2>{v.title}</h2>
            <p>{v.text}</p>
          </div>
        ))}
      </section>

      <section className="about__team">
        <h2 className="about__team-title">The Founder</h2>
        <p className="about__team-description">
          Leading and executing across all three disciplines — Software, Creative, and Hardware.
        </p>
        <div className="founder-grid founder-grid--single">
          {team.map((f) => (
            <FounderCard key={f.id} f={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
