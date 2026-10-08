import type { Metadata } from "next";
import FounderCard from "@/components/FounderCard";
import { team } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

const values = [
  { title: "Build it right", text: "We would rather ship something small that works than something big that breaks." },
  { title: "Design with purpose", text: "Every screen, poster and circuit has a job. If it does not help, it goes." },
  { title: "Own the result", text: "We stay after launch. If it is ours, we fix it." },
];

export default function AboutPage() {
  return (
    <div className="page about">
      <header className="page-head">
        <h1>Three friends, three skills, one studio.</h1>
        <p>
          {/* TODO: write your real story in two or three sentences */}
          We met as students who kept helping each other with projects: one of us wrote the code,
          one made it look good, one built the hardware. Clients kept asking for all three at once,
          so we started Ralypto.
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

      <section>
        <h2 className="about__team-title">The team</h2>
        <div className="founder-grid">
          {team.map((f) => <FounderCard key={f.id} f={f} />)}
        </div>
      </section>
    </div>
  );
}
