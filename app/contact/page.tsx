import type { Metadata } from "next";
import { Suspense } from "react";
import BriefBuilder from "@/components/BriefBuilder";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Start a project" };

export default function ContactPage() {
  return (
    <div className="page contact">
      <header className="page-head">
        <h1>Start a project</h1>
        <p>
          Four quick steps and your brief is ready to send on WhatsApp or email.
          Prefer to talk first? Call us directly:{" "}
          {site.phones.map((phone, i) => (
            <span key={phone}>
              {i > 0 && " · "}
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
            </span>
          ))}{" "}
          or message on{" "}
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
            WhatsApp ({site.whatsappDisplay})
          </a>{" "}
          or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </header>
      <Suspense fallback={null}>
        <BriefBuilder />
      </Suspense>
    </div>
  );
}
