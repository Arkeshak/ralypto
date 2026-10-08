"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects, labs, labOrder, isCrossLab, LabId } from "@/lib/content";

type Filter = "all" | LabId | "cross";

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const options: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...labOrder.map((id) => ({ id, label: labs[id].name })),
    { id: "cross", label: "Cross-lab" },
  ];
  const list = projects.filter((p) =>
    filter === "all" ? true : filter === "cross" ? isCrossLab(p) : p.labs[0] === filter && !isCrossLab(p)
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {options.map((o) => (
          <button
            key={o.id}
            className={`filter filter--${o.id}`}
            aria-pressed={filter === o.id}
            onClick={() => setFilter(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="filters__count" aria-live="polite">{list.length} projects</p>
      <div className="card-grid">
        {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </>
  );
}
