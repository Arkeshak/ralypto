import { Founder } from "@/lib/content";

/* Each founder card takes the look of the founder's lab. */
export default function FounderCard({ f }: { f: Founder }) {
  const initials = f.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <article
      className={`founder founder--${f.lab}`}
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="founder__photo">
        {f.photo ? (
          <img src={f.photo} alt={f.name} itemProp="image" />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>
      <h3 itemProp="name">{f.name}</h3>
      <p className="founder__role" itemProp="jobTitle">
        {f.role}
      </p>
      <p itemProp="description">{f.bio}</p>
      <ul className="founder__skills">
        {f.skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <p className="founder__links">
        {f.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            itemProp="sameAs"
          >
            {l.label}
          </a>
        ))}
      </p>
      <p className="founder__lab">Directs Software, Creative & Hardware</p>
    </article>
  );
}
