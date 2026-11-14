import type { Metadata } from "next";
import IdeaMachine from "@/components/IdeaMachine";
import SectionHead from "@/components/SectionHead";

export const metadata: Metadata = {
  title: "Idea Lab",
  description:
    "Describe something you want made and watch Ralypto's three labs sketch it in seconds. Then send it to us as a real brief.",
};

/* The interactive idea tool, moved here from the homepage. */
export default function IdeaLabPage() {
  return (
    <div className="band band--paper">
      <div className="band__inner">
        <SectionHead
          label="Idea Lab"
          title="Type an idea, watch it take shape"
          intro="Describe something you want made. Our three labs sketch it in seconds, then you can send it to us as a real brief."
        />
        <IdeaMachine />
      </div>
    </div>
  );
}
