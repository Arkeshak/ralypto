import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import IdeaMachine from "@/components/IdeaMachine";
import WorkShowcase from "@/components/WorkShowcase";
import SectionHead from "@/components/SectionHead";
import HardwareViewer from "@/components/three/HardwareViewer";
import { projects } from "@/lib/content";

const steps = [
  { title: "Tell us", text: "Share the problem and your goal. We ask the questions that matter." },
  { title: "Design", text: "Screens, sketches or drawings you can react to before we build." },
  { title: "Build", text: "Code, artwork and hardware, made in short rounds you can review." },
  { title: "Launch", text: "Live site, finished brand, working device or running campaign." },
  { title: "Support", text: "Fixes, updates and new ideas after launch." },
];

/* Home page: say what we do, give one clear action, then prove it. */
export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <HomeHero />

      <section className="band band--paper" data-chapter="How we work">
        <div className="band__inner">
          <SectionHead
            label="How it works"
            title="From idea to launch in five steps"
            intro="The same simple path for every lab. You see progress at each step."
            action={<Link href="/contact" className="btn">Start a project</Link>}
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

      <section className="band band--white" data-chapter="Our work">
        <div className="band__inner">
          <SectionHead
            label="Our work"
            title="Things we have built"
            intro="Recent projects from all three labs. Use the arrows to browse, or open the full list."
            action={<Link href="/work" className="btn btn--ghost">See all projects</Link>}
          />
          <WorkShowcase items={featured} />
        </div>
      </section>

      <section className="band band--paper" data-chapter="Try us">
        <div className="band__inner">
          <SectionHead
            label="Try us"
            title="Type an idea, watch it take shape"
            intro="Describe something you want made. Our three labs sketch it in seconds, then you can send it to us as a real brief."
          />
          <IdeaMachine />
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
    </>
  );
}
