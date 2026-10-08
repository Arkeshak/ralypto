import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import IdeaMachine from "@/components/IdeaMachine";
import ProjectCard from "@/components/ProjectCard";
import FounderCard from "@/components/FounderCard";
import { projects, team, isCrossLab } from "@/lib/content";

const steps = [
  { title: "Idea", text: "You tell us the problem. We ask a lot of questions." },
  { title: "Design", text: "Screens, sketches or drawings you can react to before we build." },
  { title: "Build", text: "Code, artwork and hardware, made in short rounds you can review." },
  { title: "Launch", text: "Live site, printed brand, working device, running campaign." },
  { title: "Support", text: "Fixes, updates and new ideas after launch." },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured && !isCrossLab(p));
  const cross = projects.filter(isCrossLab);

  return (
    <>
      <HomeHero />
      <IdeaMachine />

      <section className="home-section">
        <div className="home-section__head">
          <h2>Selected work</h2>
          <Link href="/work">See all projects</Link>
        </div>
        <div className="card-grid">
          {featured.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>

      {cross.length > 0 && (
        <section className="home-cross">
          <div className="home-cross__intro">
            <h2>When the labs work together</h2>
            <p>
              Most studios stop at one discipline. We can build the device, write its app,
              and design the brand it ships with, all with one team and one conversation.
            </p>
          </div>
          <div className="card-grid card-grid--wide">
            {cross.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </section>
      )}

      <section className="home-section">
        <h2>How a project runs</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="steps__n" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section">
        <h2>The three of us</h2>
        <div className="founder-grid">
          {team.map((f) => <FounderCard key={f.id} f={f} />)}
        </div>
      </section>
    </>
  );
}
