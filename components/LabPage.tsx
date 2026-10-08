import Link from "next/link";
import { LabId, labs, projectsForLab, team } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import FounderCard from "./FounderCard";
function Tools({ lab }: { lab: LabId }) {
  const tools = labs[lab].tools;
  if (lab === "software") {
    return (
      <pre className="stack-code" aria-label={`Tools: ${tools.join(", ")}`}>
        {" "}
        <span className="t-dim">// what we build with</span>
        {"\n"} <span className="t-amber">const</span> stack = [{"\n"}{" "}
        {tools.map((t) => ` "${t}",\n`).join("")} ];{" "}
      </pre>
    );
  }
  if (lab === "creative") {
    return (
      <ul className="tool-wall">
        {" "}
        {tools.map((t) => (
          <li key={t}>{t}</li>
        ))}{" "}
      </ul>
    );
  }
  return (
    <table className="parts-list">
      {" "}
      <caption>Parts list</caption>{" "}
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Tool or component</th>
        </tr>
      </thead>{" "}
      <tbody>
        {" "}
        {tools.map((t, i) => (
          <tr key={t}>
            <td>P-{String(i + 1).padStart(2, "0")}</td>
            <td>{t}</td>
          </tr>
        ))}{" "}
      </tbody>{" "}
    </table>
  );
}
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
      {" "}
      <section className="lab-hero">{hero}</section>{" "}
      <section className="lab-section">
        {" "}
        <h2 data-reveal>What we build</h2>{" "}
        <div className="service-grid">
          {" "}
          {L.services.map((s, i) => (
            <article
              key={s.title}
              className="service"
              data-reveal
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {" "}
              <h3>{s.title}</h3> <p>{s.text}</p>{" "}
            </article>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      {extra}{" "}
      <section className="lab-section">
        {" "}
        <h2 data-reveal>Selected work</h2>{" "}
        <div className="card-grid">
          {" "}
          {work.map((p, i) => (
            <div
              key={p.slug}
              data-reveal
              className="card-reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {" "}
              <ProjectCard p={p} />{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      <section className="lab-section lab-split">
        {" "}
        <div>
          {" "}
          <h2 data-reveal>Tools we use</h2>{" "}
          <div data-reveal className="tools-wrap">
            <Tools lab={lab} />
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          <h2 data-reveal>How this lab works</h2>{" "}
          <ol className="lab-process">
            {" "}
            {L.process.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {" "}
                <h3>{s.title}</h3> <p>{s.text}</p>{" "}
              </li>
            ))}{" "}
          </ol>{" "}
        </div>{" "}
      </section>{" "}
      {lead && (
        <section className="lab-section lab-lead">
          {" "}
          <h2>Who runs this lab</h2> <FounderCard f={lead} />{" "}
        </section>
      )}{" "}
      <section className="lab-cta">
        {" "}
        <h2>Got something for the {L.name}?</h2>{" "}
        <Link href={`/contact?need=${lab}`} className="btn">
          Start a project
        </Link>{" "}
      </section>{" "}
    </div>
  );
}
