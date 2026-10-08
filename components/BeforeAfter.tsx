"use client";
import { useState } from "react";

/* Drag to compare. Pass real image paths when you have them. */
export default function BeforeAfter({
  before,
  after,
  caption,
}: {
  before?: string;
  after?: string;
  caption: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="ba">
      <div className="ba__frame" style={{ ["--pos" as string]: `${pos}%` }}>
        <div className="ba__img ba__img--after">
          {after ? (
            <img src={after} alt="After editing" />
          ) : (
            <span className="ba__demo ba__demo--after" />
          )}
        </div>
        <div className="ba__img ba__img--before">
          {before ? (
            <img src={before} alt="Before editing" />
          ) : (
            <span className="ba__demo ba__demo--before" />
          )}
        </div>
        <span className="ba__handle" aria-hidden="true" />
        <span className="ba__tag ba__tag--before">Before</span>
        <span className="ba__tag ba__tag--after">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare before and after"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
