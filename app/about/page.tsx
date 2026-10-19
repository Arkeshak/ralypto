import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

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
          Our team brings together people who write code, people who design and market, and people who build hardware. Clients kept asking for all three at once, so we started Ralypto.
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
        <h2 className="about__team-title">Our Team</h2>
        <p className="about__team-description">
          We are a multidisciplinary team of engineers, designers, and builders. Rather than working in separate silos, our software developers, creative designers, and hardware engineers collaborate seamlessly under one studio to turn bold ideas into high-performance, real-world reality.
        </p>
      </section>
    </div>
  );
}
