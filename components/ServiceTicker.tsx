import Link from "next/link";
import { labOrder, labs } from "@/lib/content";
/* "What we do": three moving lanes, one per lab, listing every service. */ export default function ServiceTicker() {
  return (
    <section className="ticker" aria-labelledby="ticker-title">
      {" "}
      <div className="ticker__head">
        {" "}
        <h2 id="ticker-title">What we do</h2>{" "}
        <p>
          {" "}
          Three skills, one team. We write the software, design the brand and
          campaign, and build the hardware, so your idea never has to change
          hands.{" "}
        </p>{" "}
      </div>{" "}
      {labOrder.map((id, i) => {
        const items = labs[id].services.map((s) => s.title);
        return (
          <Link
            key={id}
            href={labs[id].path}
            className={`lane lane--${id}`}
            aria-label={`${labs[id].name}: ${items.join(", ")}`}
          >
            {" "}
            <span className="lane__name">{labs[id].name}</span>{" "}
            <span className="lane__track" aria-hidden="true">
              {" "}
              <span className={`lane__move ${i % 2 ? "lane__move--rev" : ""}`}>
                {" "}
                {[...items, ...items].map((t, k) => (
                  <span key={k} className="lane__item">
                    {t}
                  </span>
                ))}{" "}
              </span>{" "}
            </span>{" "}
          </Link>
        );
      })}{" "}
    </section>
  );
}
