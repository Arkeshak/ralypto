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
                <Image 
                  src={p.imageBefore} 
                  alt={`${p.title} Before`} 
                  fill 
                  className="cr-ba-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="cr-ba-mask" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}>
                  <Image 
                    src={p.imageAfter} 
                    alt={`${p.title} After`} 
                    fill 
                    className="cr-ba-img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="cr-ba-line" />
                <span className="cr-ba-chip cr-ba-chip--before">Before</span>
                <span className="cr-ba-chip cr-ba-chip--after">After</span>
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
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill 
                  className="cr-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
              <Image 
                src={p.image} 
                alt={p.title} 
                fill 
                className="cr-img"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
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
