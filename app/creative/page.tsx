import type { Metadata } from "next";
import LabPage from "@/components/LabPage";
import CreativeHero from "@/components/CreativeHero";
import MarketingSection from "@/components/MarketingSection";
import BeforeAfter from "@/components/BeforeAfter";
import { labs } from "@/lib/content";

export const metadata: Metadata = { title: labs.creative.name, description: labs.creative.promise };

export default function CreativePage() {
  return (
    <LabPage
      lab="creative"
      hero={<CreativeHero />}
      extra={
        <>
          <MarketingSection />
          <section className="lab-section">
            <h2>Photo editing, side by side</h2>
            {/* Replace with real files: before="/work/shoe-before.jpg" after="/work/shoe-after.jpg" */}
            <BeforeAfter 
              before="/work/shoe-before.jpg" 
              after="/work/shoe-after.jpg" 
              caption="Product retouch: colour, light and background cleaned up for an online store." 
            />
          </section>
        </>
      }
    />
  );
}
