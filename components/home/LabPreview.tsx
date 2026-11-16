"use client";
import { SoftwarePreview } from "@/components/HomeHero";
import CreativeHeroPreview from "@/components/CreativeHeroPreview";
import RobotArm from "@/components/RobotArm";
import type { LabId } from "@/lib/content";

/* The live previews from the first version of the site, reused as the homepage card pictures:
   a typing terminal, a creative reel, and a moving blueprint robot arm. */
export default function LabPreview({ id }: { id: LabId }) {
  return (
    <div className={`hm-pv hm-pv--${id}`} aria-hidden="true">
      {id === "software" && <SoftwarePreview />}
      {id === "creative" && <CreativeHeroPreview />}
      {id === "hardware" && <RobotArm />}
    </div>
  );
}
