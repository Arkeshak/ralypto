import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import IdeaMachine from "@/components/IdeaMachine";
import WorkShowcase from "@/components/WorkShowcase";
import ServiceTicker from "@/components/ServiceTicker";
import { projects } from "@/lib/content";
const steps = [
  {
    title: "Idea",
    text: "You tell us the problem. We ask a lot of questions.",
  },
  {
    title: "Design",
    text: "Screens, sketches or drawings you can react to before we build.",
  },
  {
    title: "Build",
    text: "Code, artwork and hardware, made in short rounds you can review.",
  },
  {
    title: "Launch",
    text: "Live site, printed brand, working device, running campaign.",
  },
  { title: "Support", text: "Fixes, updates and new ideas after launch." },
];
export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      {" "}
      <HomeHero />{" "}
      <section className="home-section">
        {" "}
        <div className="home-section__head">
          {" "}
          <h2>Selected work</h2> <Link href="/work">See all projects</Link>{" "}
        </div>{" "}
        <WorkShowcase items={featured} />{" "}
      </section>{" "}
      <ServiceTicker /> <IdeaMachine />{" "}
      <section className="home-section">
        {" "}
        <h2>How a project runs</h2>{" "}
        <ol className="steps">
          {" "}
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {" "}
              <span className="steps__n" aria-hidden="true">
                {i + 1}
              </span>{" "}
              <h3>{s.title}</h3> <p>{s.text}</p>{" "}
            </li>
          ))}{" "}
        </ol>{" "}
      </section>{" "}
    </>
  );
}
