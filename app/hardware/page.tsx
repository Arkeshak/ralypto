import type { Metadata } from "next";
import LabPage from "@/components/LabPage";
import HardwareHero from "@/components/HardwareHero";
import ExplodedView from "@/components/ExplodedView";
import HardwareViewer from "@/components/three/HardwareViewer";
import SectionHead from "@/components/SectionHead";
import LabLabel from "@/components/LabLabel";
import { labs } from "@/lib/content";

export const metadata: Metadata = {
  title: labs.hardware.name,
  description: labs.hardware.promise
};

export default function HardwarePage() {
  return (
    <LabPage
      lab="hardware"
      hero={<HardwareHero />}
      extra={
        <>
          <section className="lab-band lab-band--3d" data-chapter="3D models">
            <div className="lab-band__inner">
              <SectionHead
                label={<LabLabel lab="hardware" name="3D models" />}
                title="Turn our builds around"
                intro="Drag any model to look at it from every side. Switch on part names to see what goes inside."
              />
              <HardwareViewer />
            </div>
          </section>
          <ExplodedView />
        </>
      }
    />
  );
}
