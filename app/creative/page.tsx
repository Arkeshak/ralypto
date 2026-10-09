import type { Metadata } from "next";
import LabPage from "@/components/LabPage";
import CreativeHero from "@/components/CreativeHero";
import MarketingSection from "@/components/MarketingSection";
import BeforeAfter from "@/components/BeforeAfter";
import SectionHead from "@/components/SectionHead";
import LabLabel from "@/components/LabLabel";
import { labs } from "@/lib/content";

export const metadata: Metadata = {
  title: labs.creative.name,
  description: labs.creative.promise
};

export default function CreativePage() {
  return (
    <LabPage
      lab="creative"
      hero={<CreativeHero />}
      extra={
        <>
          <MarketingSection />
          <section className="lab-band lab-band--b" data-chapter="Photo editing">
            <div className="lab-band__inner">
              <SectionHead
                label={<LabLabel lab="creative" name="Photo editing" />}
                title="Side by side"
                intro="Drag the slider to compare a raw product photo with our edit."
              />
              {/* Replace with real files: before="/work/shoe-before.jpg" after="/work/shoe-after.jpg" */}
              <BeforeAfter caption="Product retouch: colour, light and background cleaned up for an online store." />
            </div>
          </section>
        </>
      }
    />
  );
}
