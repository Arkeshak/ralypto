import Link from "next/link";
import { LabId, labs, projectsForLab, team } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import FounderCard from "./FounderCard";
import SectionHead from "./SectionHead";
import LabLabel from "./LabLabel";

function Tools({ lab }: { lab: LabId }) {
  const tools = labs[lab].tools;
  if (lab === "software") {
    return (
      <pre className="stack-code" aria-label={`Tools: ${tools.join(", ")}`}>
        <span className="t-dim">// what we build with</span>{"\n"}
        <span className="t-amber">const</span> stack = [{"\n"}
        {tools.map((t) => `  "${t}",\n`).join("")}
        ];
      </pre>
    );
  }
  if (lab === "creative") {
    return (
      <ul className="tool-wall">
        {tools.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    );
  }
  return (
    <table className="parts-list">
      <caption>Parts list</caption>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Tool or component</th>
        </tr>
      </thead>
      <tbody>
        {tools.map((t, i) => (
          <tr key={t}>
            <td>P-{String(i + 1).padStart(2, "0")}</td>
            <td>{t}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* Every lab page: clearly separated full-width bands, each with a labelled header. */
export default function LabPage({
  lab,
  hero,
  extra,
}: {
  lab: LabId;
  hero: React.ReactNode;
  extra?: React.ReactNode;
}) {
  const L = labs[lab];
  const work = projectsForLab(lab);
  const lead = team.find((t) => t.id === L.leadId);

  return (
    <div className={`lab lab--${lab}`}>
      <section className="lab-hero" data-chapter="Intro">
        {hero}
      </section>

      <section className="lab-band lab-band--a" data-chapter="Services">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab={lab} name="Services" />}
            title="What we build"
            intro={`Everything the ${L.name} can make for you.`}
          />
          <div className="service-grid">
            {L.services.map((s, i) => (
              <article
                key={s.title}
                className="service"
                data-reveal
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {extra}

      <section className="lab-band lab-band--b" data-chapter="Work">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab={lab} name="Work" />}
            title="Selected work"
            intro="Recent projects from this lab. Open any card for the full story."
          />
          <div className="card-grid">
            {work.map((p, i) => (
              <div
                key={p.slug}
                data-reveal
                className="card-reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-band lab-band--a" data-chapter="Tools">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab={lab} name="Tools" />}
            title="Tools we use"
            intro="The software, platforms and parts we work with every day."
          />
          <div data-reveal className="tools-wrap">
            <Tools lab={lab} />
          </div>
        </div>
      </section>

      <section className="lab-band lab-band--b" data-chapter="Process">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab={lab} name="Process" />}
            title="How this lab works"
            intro="How a project moves from the first call to handover."
          />
          <ol className="lab-process">
            {L.process.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {lead && (
        <section className="lab-band lab-band--a" data-chapter="Lead">
          <div className="lab-band__inner">
            <SectionHead
              label={<LabLabel lab={lab} name="Lead" />}
              title="Who runs this lab"
              intro="The person you will talk to about your project."
            />
            <div className="lab-lead">
              <FounderCard f={lead} />
            </div>
          </div>
        </section>
      )}

      <section className="lab-cta" data-chapter="Start">
        <h2>Got something for the {L.name}?</h2>
        <Link href={`/contact?need=${lab}`} className="btn">
          Start a project
        </Link>
      </section>
    </div>
  );
}
