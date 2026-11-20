import Link from "next/link";
import { labs, getProject, projects, site, LabId } from "@/lib/content";
import HeroSpotlight from "@/components/home/HeroSpotlight";
import ChipiTeaser from "@/components/home/ChipiTeaser";
import HomeMotion from "@/components/home/HomeMotion";
import LabPreview from "@/components/home/LabPreview";
import ScrollTheme from "@/components/home/ScrollTheme";
import TextReveal from "@/components/home/TextReveal";
import Marquee from "@/components/home/Marquee";
import HorizontalProjects from "@/components/home/HorizontalProjects";
import InteractiveConsole from "@/components/home/InteractiveConsole";
import { Stagger, Pull, TiltCard, Stats } from "@/components/home/Anim";

/* Home: say who we are, show the three divisions, one product, why us, proof, one action. */

const divisions: {
  id: LabId;
  blurb: string;
  points: string[];
}[] = [
  {
    id: "software",
    blurb: "Intelligent software built around how your business really works.",
    points: ["Web & Mobile Development", "Business Systems, ERP & POS", "AI Solutions & Automation"],
  },
  {
    id: "creative",
    blurb: "Brands and digital experiences that get noticed.",
    points: ["Branding & Graphic Design", "Video Production", "Digital Marketing"],
  },
  {
    id: "hardware",
    blurb: "Connected devices, designed and prototyped in-house.",
    points: ["IoT & Embedded Systems", "Robotics & Smart Devices", "Hardware Prototyping"],
  },
];

const why = [
  { t: "One team, many solutions", d: "Software, design and hardware under one roof." },
  { t: "Creative meets engineering", d: "Good looks and solid build, made together." },
  { t: "Built around real needs", d: "We start from your problem, not from a template." },
  { t: "Clients worldwide", d: "Based in Sri Lanka, working with businesses everywhere." },
];

const work = ["shop-erp", "cafe-brand", "pump-controller", "tea-leaf-plucking-robot"]
  .map((s) => getProject(s))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function Home() {
  return (
    <div className="hm">
      <HomeMotion />
      <ScrollTheme />

      {/* 1. Hero */}
      <HeroSpotlight>
        <div className="hm-wrap hm-hero__inner">
          <p className="hm-eyebrow">Ralypto · Sri Lanka</p>
          <h1 id="hm-h1" aria-label="We code it. We design it. We build it.">
            {["We code it.", "We design it.", "We build it."].map((line, i) => (
              <span key={line} className={`hm-line ln${i === 2 ? " hm-line--grad" : ""}`} aria-hidden="true">
                <span style={{ transitionDelay: `${0.12 + i * 0.14}s` }}>{line}</span>
              </span>
            ))}
          </h1>
          <Stagger delay={450} hold={120}>
            <p className="hm-lead">
              We build intelligent software, creative digital experiences, and innovative
              hardware solutions for businesses worldwide.
            </p>
            <div className="hm-actions">
              <Pull><a href="#services" className="hm-btn hm-btn--navy">Explore Our Services</a></Pull>
              <Link href="/contact" className="hm-textlink">Let&apos;s Work Together <span aria-hidden="true">›</span></Link>
            </div>
            <ul className="hm-labs" aria-label="Our three divisions">
              <li><Link href="/software"><b aria-hidden="true">{"</>"}</b>Software Lab</Link></li>
              <li><Link href="/creative"><b aria-hidden="true">✦</b>Creative Studio</Link></li>
              <li><Link href="/hardware"><b aria-hidden="true">⬡</b>Hardware Lab</Link></li>
            </ul>
          </Stagger>
        </div>
      </HeroSpotlight>

      {/* Stats */}
      <section className="hm-statsband" aria-label="Ralypto at a glance">
        <div className="hm-wrap">
          <Stats items={[
            { n: 3, label: "Divisions" },
            { n: 9, label: "Core services" },
            { n: projects.length, label: "Projects delivered", suffix: "+" },
          ]} />
        </div>
      </section>

      {/* Marquee Ticker 1 */}
      <Marquee speed={26} />

      {/* 2. What we do (Services) */}
      <section id="services" className="hm-section" data-theme="light" aria-labelledby="hm-what">
        <div className="hm-wrap">
          <header className="hm-head" data-reveal>
            <h2 id="hm-what">What we do.</h2>
            <p>Three divisions. One studio.</p>
          </header>
          <div className="hm-cards hm-cards--3">
            {divisions.map((d, i) => {
              const lab = labs[d.id];
              return (
                <div key={d.id} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
                  <TiltCard><article className={`hm-card hm-card--${d.id}`}>
                    <div className="hm-card__body">
                      <h3>{lab.name}</h3>
                      <p>{d.blurb}</p>
                      <ul className="hm-points">
                        {d.points.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                      <Link href={lab.path} className="hm-textlink" aria-label={`Explore the ${lab.name}`}>
                        Learn more <span aria-hidden="true">›</span>
                      </Link>
                    </div>
                    <Link href={lab.path} className="hm-card__media" tabIndex={-1} aria-hidden="true">
                      <LabPreview id={d.id} />
                    </Link>
                  </article></TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured product */}
      <section className="hm-section hm-section--navy" data-theme="navy" aria-labelledby="hm-product">
        <ChipiTeaser />
      </section>

      {/* 4. Why Ralypto (Signature Amber Section with Statement Word Reveal) */}
      <section className="hm-section hm-section--amber" data-theme="amber" aria-labelledby="hm-why">
        <div className="hm-wrap">
          <header className="hm-head" data-reveal>
            <h2 id="hm-why" style={{ color: "#050f2e" }}>Why Ralypto.</h2>
          </header>
          
          <TextReveal
            as="p"
            className="hm-why__statement"
            text="We believe the best products happen when software, hardware, and design are built together as one continuous discipline."
          />

          <ul className="hm-why">
            {why.map((w, i) => (
              <li key={w.t} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="hm-why__n" aria-hidden="true">0{i + 1}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive Tactile Console Keypad */}
      <InteractiveConsole />

      {/* 5. Selected work (Pinned Horizontal Scroll Section) */}
      <HorizontalProjects projects={work} />

      {/* Marquee Ticker 2 (Reverse direction) */}
      <Marquee reverse speed={32} />

      {/* 6. Final CTA */}
      <section className="hm-cta" data-theme="light" aria-labelledby="hm-cta-h">
        <div className="hm-wrap">
          <h2 id="hm-cta-h">Have an idea? Let&apos;s build it together.</h2>
          <p>Whether you need software, creative services, or innovative hardware, let&apos;s make it happen.</p>
          <Link href="/contact" className="hm-btn hm-btn--amber">Contact Ralypto</Link>
          <p className="hm-cta__small">
            <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </p>
        </div>
      </section>
    </div>
  );
}
