import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="page">
      <header className="page-head">
        <h1>Work</h1>
        <p>
          Everything we have built, designed and engineered. Each project is marked as client work,
          a personal project or a concept, so you know exactly what you are looking at.
        </p>
      </header>
      <WorkGrid />
    </div>
  );
}
