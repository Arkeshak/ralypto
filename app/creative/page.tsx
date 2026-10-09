import type { Metadata } from "next";
import Link from "next/link";
import CreativeHero from "@/components/CreativeHero";
import MarketingSection from "@/components/MarketingSection";
import BeforeAfter from "@/components/BeforeAfter";
import SectionHead from "@/components/SectionHead";
import LabLabel from "@/components/LabLabel";
import ProjectCard from "@/components/ProjectCard";
import CreativeGallery from "@/components/CreativeGallery";
import { labs, projectsForLab } from "@/lib/content";
import { creativeManifest } from "@/lib/creative-data";

export const metadata: Metadata = {
  title: labs.creative.name,
  description: labs.creative.promise
};

export default function CreativePage() {
  const L = labs.creative;
  const work = projectsForLab("creative");

  const logos = creativeManifest.filter((p) => p.category === "logo");
  const graphics = creativeManifest.filter((p) => p.category === "graphic");
  const photos = creativeManifest.filter((p) => p.category === "photo");
  const videos = creativeManifest.filter((p) => p.category === "video");
  const socials = creativeManifest.filter((p) => p.category === "social");
  const marketing = creativeManifest.filter((p) => p.category === "marketing");

  return (
    <div className="lab lab--creative">
      <section className="lab-hero" data-chapter="Intro">
        <CreativeHero />
      </section>

      <section className="lab-band lab-band--a" data-chapter="Services">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Services" />}
            title="What we build"
            intro={`Everything the ${L.name} can make for you.`}
          />
          <div className="service-grid">
            {L.services.map((s, i) => (
              <article
                key={s.title}
                className="service"
                data-reveal
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-band lab-band--b" data-chapter="Work">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Work" />}
            title="Selected work"
            intro="Recent cross-lab and creative projects. Open any card for the full story."
          />
          <div className="card-grid">
            {work.map((p, i) => (
              <div
                key={p.slug}
                data-reveal
                className="card-reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-band lab-band--a" data-chapter="Logo Design">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Logo & Branding Design" />}
            title="Logo & Branding Design"
            intro="Memorable logos and complete brand identities for startups, businesses and products."
          />
          <CreativeGallery category="logo" items={logos} />
        </div>
      </section>

      <section className="lab-band lab-band--b" data-chapter="Graphic Design">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Graphic Design" />}
            title="Graphic Design"
            intro="Posters, brochures, banners, packaging and more."
          />
          <CreativeGallery category="graphic" items={graphics} />
        </div>
      </section>

      <section className="lab-band lab-band--a" data-chapter="Photo Editing">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Photo Editing" />}
            title="Photo Editing (Before / After)"
            intro="Enhance product photos, portraits, landscapes and more."
          />
          {/* Main interactive demo */}
          <div style={{ marginBottom: '3rem' }}>
            <BeforeAfter 
              before="/work/shoe-before.jpg" 
              after="/work/shoe-after.jpg" 
              caption="Interactive product retouch comparison." 
            />
          </div>
          {/* Gallery of other photo edits */}
          <CreativeGallery category="photo" items={photos} />
        </div>
      </section>

      <section className="lab-band lab-band--b" data-chapter="Video Editing">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Video & Motion" />}
            title="Video Editing & Motion Graphics"
            intro="Promotional videos, reels, motion graphics, and product videos."
          />
          <CreativeGallery category="video" items={videos} />
        </div>
      </section>

      <section className="lab-band lab-band--a" data-chapter="Social Media">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Social Media" />}
            title="Social Media Content"
            intro="Scroll-stopping content for Instagram, Facebook, TikTok and LinkedIn."
          />
          <CreativeGallery category="social" items={socials} />
        </div>
      </section>

      <section className="lab-band lab-band--b" data-chapter="Marketing">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Marketing Design" />}
            title="Marketing & Advertisement Design"
            intro="Ad campaigns, flyers, billboards and promotional materials."
          />
          <CreativeGallery category="marketing" items={marketing} />
        </div>
      </section>

      <MarketingSection />

      <section className="lab-band lab-band--b" data-chapter="Process">
        <div className="lab-band__inner">
          <SectionHead
            label={<LabLabel lab="creative" name="Process" />}
            title="How this lab works"
            intro="How a project moves from the first call to handover."
          />
          <ol className="lab-process">
            {L.process.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lab-cta" data-chapter="Start">
        <h2>Got something for the {L.name}?</h2>
        <Link href="/contact?need=creative" className="btn">
          Start a project
        </Link>
      </section>
    </div>
  );
}
