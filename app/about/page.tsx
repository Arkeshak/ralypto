import type { Metadata } from "next";
import FounderCard from "@/components/FounderCard";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Founders & Leadership",
  description:
    "Meet the founders and leadership behind Ralypto — founded by Arkeshkar prashanthkumar (Founder & Software Lead). Uniting software engineering, creative studio, and hardware lab under one studio.",
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
        <h1>One team, three skills, one studio.</h1>
        <p>
          Ralypto was founded by Arkeshkar prashanthkumar to bridge the gap
          between software engineering, creative design, and physical hardware.
          Rather than working in separate silos, our developers, designers, and
          hardware engineers collaborate seamlessly under one studio to build
          end-to-end solutions.
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
        <h2 className="about__team-title">Founders & Leadership</h2>
        <p className="about__team-description">
          We are a multidisciplinary team of engineers, designers, and builders
          turning bold ideas into high-performance, real-world reality.
        </p>
        <div className="founder-grid">
          {team.map((f) => (
            <FounderCard key={f.id} f={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
