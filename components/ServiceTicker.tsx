import Link from "next/link";
import { labOrder, labs } from "@/lib/content";

/* "What we do": three lab summaries, then three moving lanes listing every service. */
export default function ServiceTicker() {
  return (
    <>
      <div className="labsum">
        {labOrder.map((id, i) => (
          <Link
            key={id}
            href={labs[id].path}
            className={`labsum__item labsum__item--${id}`}
            data-reveal
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <h3>{labs[id].name}</h3>
            <p>{labs[id].promise}</p>
            <ul>
              {labs[id].services.slice(0, 3).map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
            <span className="labsum__go">Visit the {labs[id].name}</span>
          </Link>
        ))}
      </div>

      <div className="lanes">
        {labOrder.map((id, i) => {
          const items = labs[id].services.map((s) => s.title);
          return (
            <Link
              key={id}
              href={labs[id].path}
              className={`lane lane--${id}`}
              aria-label={`${labs[id].name}: ${items.join(", ")}`}
            >
              <span className="lane__name">{labs[id].name}</span>
              <span className="lane__track" aria-hidden="true">
                <span className={`lane__move ${i % 2 ? "lane__move--rev" : ""}`}>
                  {[...items, ...items].map((t, k) => (
                    <span key={k} className="lane__item">
                      {t}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
