import Image from "next/image";
import type { CreativeProject } from "@/lib/creative-data";

export default function CreativeGallery({ category, items }: { category: string, items: CreativeProject[] }) {
  if (category === "photo") {
    return (
      <div className="cr-gallery cr-gallery--photo">
        {items.map((p) => (
          <div key={p.id} className="cr-card">
            {p.status === "generated" && p.imageBefore && p.imageAfter ? (
              <div className="cr-ba-preview">
                {/* Simplified before/after for grid */}
                <Image src={p.imageBefore} alt="Before" fill className="cr-ba-img" />
                <div className="cr-ba-mask" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}>
                  <Image src={p.imageAfter} alt="After" fill className="cr-ba-img" />
                </div>
                <div className="cr-ba-line" />
              </div>
            ) : (
              <div className="cr-placeholder">
                <span className="cr-status">Asset pending</span>
                <p>{p.title}</p>
              </div>
            )}
            <div className="cr-info">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (category === "video") {
    return (
      <div className="cr-gallery cr-gallery--video">
        {items.map((p) => (
          <div key={p.id} className="cr-card">
            {p.status === "generated" && p.image ? (
              <div className="cr-img-wrap">
                <Image src={p.image} alt={p.title} fill className="cr-img" />
                <div className="cr-play">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
                </div>
                {p.duration && <span className="cr-duration">{p.duration}</span>}
              </div>
            ) : (
              <div className="cr-placeholder">
                <span className="cr-status">Asset pending</span>
                <p>{p.title}</p>
              </div>
            )}
            <div className="cr-info">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`cr-gallery cr-gallery--${category}`}>
      {items.map((p) => (
        <div key={p.id} className="cr-card">
          {p.status === "generated" && p.image ? (
            <div className="cr-img-wrap">
              <Image src={p.image} alt={p.title} fill className="cr-img" />
            </div>
          ) : (
            <div className="cr-placeholder">
              <span className="cr-status">Asset pending generation</span>
              <p>{p.title}</p>
            </div>
          )}
          <div className="cr-info">
            <h4>{p.title}</h4>
            <p>{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
