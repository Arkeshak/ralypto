import Link from "next/link";
import { Project, labs, statusLabel, isCrossLab } from "@/lib/content";

/* One modern card architecture with distinct lab identities:
   - Software: dark terminal repo aesthetic
   - Creative: bold editorial magazine aesthetic
   - Hardware: technical blueprint aesthetic
   - Cross-lab: multi-disciplinary gradient stripes
*/
export default function ProjectCard({ p }: { p: Project }) {
  const href = `/work/${p.slug}`;
  const isCross = isCrossLab(p);
  const primaryLab = isCross ? "cross" : p.labs[0];
  const hasImage = Boolean(p.images && p.images.length > 0);

  return (
    <Link
      href={href}
      className={`pcard pcard--${primaryLab} ${hasImage ? "pcard--has-media" : ""}`}
    >
      {/* 1. Dedicated Media / Preview Window */}
      <div className="pcard__media">
        {hasImage ? (
          <img
            src={p.images![0]}
            alt={p.title}
            className="pcard__img"
            loading="lazy"
          />
        ) : (
          <div className="pcard__placeholder" aria-hidden="true">
            {primaryLab === "software" && (
              <div className="pcard__code-preview">
                <span className="pcard__code-dot" />
                <code>$ ralypto run {p.slug}</code>
              </div>
            )}
            {primaryLab === "hardware" && (
              <svg viewBox="0 0 200 90" className="pcard__spec-svg">
                <rect x="30" y="15" width="140" height="60" rx="4" />
                <circle cx="65" cy="45" r="14" />
                <circle cx="135" cy="45" r="14" />
                <line x1="30" y1="75" x2="170" y2="75" />
              </svg>
            )}
            {primaryLab === "creative" && (
              <div className="pcard__poster-preview">
                <span className="pcard__blob pcard__blob--1" />
                <span className="pcard__blob pcard__blob--2" />
              </div>
            )}
            {isCross && (
              <div className="pcard__cross-preview">
                <span className="stripe stripe--software" />
                <span className="stripe stripe--creative" />
                <span className="stripe stripe--hardware" />
              </div>
            )}
          </div>
        )}

        {/* Floating Lab & Status Badges on Preview */}
        <div className="pcard__badges">
          <span className={`pcard__badge pcard__badge--${primaryLab}`}>
            {isCross ? "Cross-Lab" : labs[p.labs[0]].name}
          </span>
          <span className="pcard__badge pcard__badge--status">
            {statusLabel[p.status]}
          </span>
        </div>
      </div>

      {/* 2. Structured Content Body */}
      <div className="pcard__body">
        {/* Lab-specific kicker */}
        {primaryLab === "software" && (
          <p className="repo">
            ralypto / <strong>{p.slug}</strong>
          </p>
        )}

        {primaryLab === "creative" && (
          <p className="pcard__client-kicker">{p.client}</p>
        )}

        {primaryLab === "hardware" && (
          <p className="pcard__client-kicker">{p.client}</p>
        )}

        {isCross && (
          <div className="pcard__stripes" aria-hidden="true">
            {p.labs.map((l) => (
              <span key={l} className={`stripe stripe--${l}`} />
            ))}
          </div>
        )}

        {/* Project Title */}
        <h3 className="pcard__title">{p.title}</h3>

        {/* Full Rich Summary */}
        <p className="pcard__summary">{p.summary}</p>

        {/* Deliverables & Technology Tags */}
        <ul className="pcard__tags" aria-label="Technologies and deliverables">
          {p.tools.slice(0, 4).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {/* Card Footer with Metadata and CTA */}
        <div className="pcard__footer">
          <span className="pcard__meta-status">{statusLabel[p.status]}</span>
          <span className="pcard__meta-year">{p.year}</span>
          <span className="pcard__arrow" aria-hidden="true">
            View case study →
          </span>
        </div>
      </div>
    </Link>
  );
}
