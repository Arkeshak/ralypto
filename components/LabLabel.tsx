import { LabId } from "@/lib/content";

/* Section label written in each lab's own language. */
export default function LabLabel({ lab, name }: { lab: LabId; name: string }) {
  if (lab === "software") return <span className="lbl lbl--software">// {name.toLowerCase()}</span>;
  if (lab === "creative") return <span className="lbl lbl--creative">{name}</span>;
  return (
    <span className="lbl lbl--hardware">
      <span>Sheet</span>
      <span>{name}</span>
    </span>
  );
}
