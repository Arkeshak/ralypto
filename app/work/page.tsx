import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="page">
      <header className="page-head">
        <h1>Work</h1>
        <p>
          Everything we have built, designed, and engineered across our three labs.
          Production systems, client deliverables, and working hardware technology.
        </p>
      </header>
      <WorkGrid />
    </div>
  );
}
