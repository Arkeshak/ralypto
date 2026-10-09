import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import IdeaMachine from "@/components/IdeaMachine";
import WorkShowcase from "@/components/WorkShowcase";
import ServiceTicker from "@/components/ServiceTicker";
import SectionHead from "@/components/SectionHead";
import HardwareViewer from "@/components/three/HardwareViewer";
import { projects } from "@/lib/content";

const steps = [
  { title: "Idea", text: "You tell us the problem. We ask a lot of questions." },
  { title: "Design", text: "Screens, sketches or drawings you can react to before we build." },
  { title: "Build", text: "Code, artwork and hardware, made in short rounds you can review." },
  { title: "Launch", text: "Live site, printed brand, working device, running campaign." },
  { title: "Support", text: "Fixes, updates and new ideas after launch." },
];

/* Home page: clearly separated chapters, each a full-width band with its own header. */
export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <HomeHero />

      <section className="band band--white" data-chapter="What we do">
        <div className="band__inner">
          <SectionHead
            label="What we do"
            title="One studio. Three labs."
            intro="Software, creative and hardware under one roof. Pick one lab, or bring an idea that needs all three."
          />
        </div>
        <ServiceTicker />
      </section>

      <section className="band band--paper" data-chapter="Our work">
        <div className="band__inner">
          <SectionHead
            label="Our work"
            title="Things we have built"
            intro="A rotating look at recent projects. Hover to pause, use the arrows to browse."
            action={<Link href="/work" className="btn btn--ghost">See all projects</Link>}
          />
          <WorkShowcase items={featured} />
        </div>
      </section>

      <section className="band band--blueprint" data-chapter="3D lab">
        <div className="band__inner">
          <SectionHead
            label="Hardware in 3D"
            title="Spin our builds"
            intro="Real devices from the Hardware Lab, rebuilt in 3D. Drag to turn them around."
          />
          <HardwareViewer compact />
        </div>
      </section>

      <section className="band band--white" data-chapter="Try us">
        <div className="band__inner">
          <SectionHead
            label="Try us"
            title="Type an idea, watch it take shape"
            intro="Describe something you want made. Our three labs sketch it in seconds, then you can send it to us as a real brief."
          />
          <IdeaMachine />
        </div>
      </section>

      <section className="band band--paper" data-chapter="How we work">
        <div className="band__inner">
          <SectionHead
            label="How we work"
            title="How a project runs"
            intro="Five steps, the same for every lab. You see progress at each one."
          />
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="steps__n" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
