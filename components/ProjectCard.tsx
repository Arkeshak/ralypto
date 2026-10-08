import Link from "next/link";
import { Project, labs, statusLabel, isCrossLab } from "@/lib/content";

const posterColors = ["#FF48B0", "#0078BF", "#FFE800", "#00A95C", "#FF6C2F"];

function pick(slug: string) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 997;
  return posterColors[h % posterColors.length];
}

/* One card, four looks: repo (software), poster (creative), spec sheet (hardware), cross-lab. */
export default function ProjectCard({ p }: { p: Project }) {
  const href = `/work/${p.slug}`;

  if (isCrossLab(p)) {
    return (
      <Link href={href} className="pcard pcard--cross">
        <div className="pcard__stripes" aria-hidden="true">
          {p.labs.map((l) => <span key={l} className={`stripe stripe--${l}`} />)}
        </div>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <p className="pcard__meta">
          {p.labs.map((l) => labs[l].name).join(" + ")}
          <span>{statusLabel[p.status]}</span>
        </p>
      </Link>
    );
  }

  const lab = p.labs[0];

  if (lab === "software") {
    return (
      <Link href={href} className="pcard pcard--software">
        <p className="repo">ralypto / <strong>{p.slug}</strong></p>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <ul className="repo__tags">
          {p.tools.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className="pcard__meta"><span>{statusLabel[p.status]}</span><span>{p.year}</span></p>
      </Link>
    );
  }

  if (lab === "creative") {
    const bg = pick(p.slug);
    return (
      <Link href={href} className="pcard pcard--creative" style={{ ["--poster" as string]: bg }}>
        <div className="poster" aria-hidden="true">
          <span className="poster__blob" />
          <span className="poster__blob poster__blob--two" />
        </div>
        <h3>{p.title}</h3>
        <p className="pcard__meta"><span>{statusLabel[p.status]}</span><span>{p.year}</span></p>
      </Link>
    );
  }

  return (
    <Link href={href} className="pcard pcard--hardware">
      <svg viewBox="0 0 200 90" aria-hidden="true" className="spec__drawing">
        <rect x="40" y="20" width="120" height="50" />
        <circle cx="70" cy="45" r="12" />
        <circle cx="130" cy="45" r="12" />
        <line x1="40" y1="80" x2="160" y2="80" />
        <text x="100" y="88" textAnchor="middle">{p.tools[0]}</text>
      </svg>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <table className="spec__block">
        <tbody>
          <tr><th scope="row">Type</th><td>{statusLabel[p.status]}</td></tr>
          <tr><th scope="row">Year</th><td>{p.year}</td></tr>
          <tr><th scope="row">Core</th><td>{p.tools.slice(0, 2).join(", ")}</td></tr>
        </tbody>
      </table>
    </Link>
  );
}
