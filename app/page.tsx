import Link from "next/link";
import { labs, getProject, site, LabId } from "@/lib/content";
import HeroSpotlight from "@/components/home/HeroSpotlight";
import ChipiTeaser from "@/components/home/ChipiTeaser";
import HomeMotion from "@/components/home/HomeMotion";

/* Home: say who we are, show the three divisions, one product, why us, proof, one action. */

const divisions: {
  id: LabId;
  blurb: string;
  points: string[];
  img: string;
}[] = [
  {
    id: "software",
    blurb: "Intelligent software built around how your business really works.",
    points: ["Web & Mobile Development", "Business Systems, ERP & POS", "AI Solutions & Automation"],
    img: "/work/booking-agent-dashboard.png",
  },
  {
    id: "creative",
    blurb: "Brands and digital experiences that get noticed.",
    points: ["Branding & Graphic Design", "Video Production", "Digital Marketing"],
    img: "/creative/graphic-tech-conf.jpg",
  },
  {
    id: "hardware",
    blurb: "Connected devices, designed and prototyped in-house.",
    points: ["IoT & Embedded Systems", "Robotics & Smart Devices", "Hardware Prototyping"],
    img: "/work/runner-robot.jpg",
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
      {/* 1. Hero */}
      <HeroSpotlight>
        <div className="hm-wrap hm-hero__inner">
          <p className="hm-eyebrow">Ralypto · Sri Lanka</p>
          <h1 id="hm-h1" aria-label="We code it. We design it. We build it.">
            {["We code it.", "We design it.", "We build it."].map((line, i) => (
              <span key={line} className={`hm-line${i === 2 ? " hm-line--grad" : ""}`} aria-hidden="true">
                <span style={{ animationDelay: `${0.15 + i * 0.14}s` }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hm-lead">
            We build intelligent software, creative digital experiences, and innovative
            hardware solutions for businesses worldwide.
          </p>
          <div className="hm-actions">
            <a href="#services" className="hm-btn hm-btn--navy">Explore Our Services</a>
            <Link href="/contact" className="hm-textlink">Let&apos;s Work Together <span aria-hidden="true">›</span></Link>
          </div>
          <ul className="hm-labs" aria-label="Our three divisions">
            <li><Link href="/software"><b aria-hidden="true">{"</>"}</b>Software Lab</Link></li>
            <li><Link href="/creative"><b aria-hidden="true">✦</b>Creative Studio</Link></li>
            <li><Link href="/hardware"><b aria-hidden="true">⬡</b>Hardware Lab</Link></li>
          </ul>
        </div>
      </HeroSpotlight>

      {/* 2. What we do */}
      <section id="services" className="hm-section" aria-labelledby="hm-what">
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
                  <article className={`hm-card hm-card--${d.id}`}>
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
                      <img src={d.img} alt="" width={640} height={480} loading="lazy" decoding="async" data-parallax />
                    </Link>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured product */}
      <section className="hm-section hm-section--navy" aria-labelledby="hm-product">
        <ChipiTeaser />
      </section>

      {/* 4. Why Ralypto */}
      <section className="hm-section hm-section--white" aria-labelledby="hm-why">
        <div className="hm-wrap">
          <header className="hm-head" data-reveal>
            <h2 id="hm-why">Why Ralypto.</h2>
          </header>
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

      {/* 5. Selected work */}
      <section className="hm-section" aria-labelledby="hm-work">
        <div className="hm-wrap">
          <header className="hm-head hm-head--row" data-reveal>
            <h2 id="hm-work">Selected work.</h2>
            <Link href="/work" className="hm-textlink">View all projects <span aria-hidden="true">›</span></Link>
          </header>
          <div className="hm-cards hm-cards--4">
            {work.map((p, i) => (
              <div key={p.slug} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                <article className="hm-card">
                  <Link href={`/work/${p.slug}`} className="hm-card__media" tabIndex={-1} aria-hidden="true">
                    <img src={p.images![0]} alt="" width={640} height={440} loading="lazy" decoding="async" data-parallax />
                  </Link>
                  <div className="hm-card__body">
                    <span className="hm-tag">{labs[p.labs[0]].name}</span>
                    <h3><Link href={`/work/${p.slug}`}>{p.title}</Link></h3>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="hm-cta" aria-labelledby="hm-cta-h">
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
