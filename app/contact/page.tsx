import type { Metadata } from "next";
import { Suspense } from "react";
import BriefBuilder from "@/components/BriefBuilder";
import { site } from "@/lib/content";
import PhoneIcon from "@/components/PhoneIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = { title: "Start a project" };

export default function ContactPage() {
  return (
    <div className="page contact">
      <header className="page-head">
        <h1>Start a project</h1>
        <p className="contact__intro">
          Four quick steps and your brief is ready to send on WhatsApp or email.
          Prefer to talk first? Reach us any of these ways.
        </p>
        <ul className="contact__methods">
          {site.phones.map((phone) => (
            <li key={phone}>
              <a href={`tel:${phone.replace(/s+/g, "")}`} className="contact__link contact__link--phone">
                <PhoneIcon size={14} className="contact__icon" />
                <span>{phone}</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="contact__link contact__link--whatsapp"
            >
              <WhatsAppIcon size={15} className="contact__icon contact__icon--whatsapp" />
              <span>WhatsApp ({site.whatsappDisplay})</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="contact__link">{site.email}</a>
          </li>
        </ul>
      </header>
      <Suspense fallback={null}>
        <BriefBuilder />
      </Suspense>
    </div>
  );
}
