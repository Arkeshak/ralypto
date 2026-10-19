import Link from "next/link";
import { labOrder, labs, site } from "@/lib/content";
import PhoneIcon from "@/components/PhoneIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__big">
        <p>Have an idea?</p>
        <Link href="/contact">Let&apos;s build it.</Link>
      </div>
      <div className="footer__cols">
        <div>
          <h2>Labs</h2>
          {labOrder.map((id) => (
            <Link key={id} href={labs[id].path}>
              {labs[id].name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Studio</h2>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h2>Talk to us</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="footer__contact-link footer__contact-link--whatsapp"
          >
            <WhatsAppIcon size={14} className="footer__icon--whatsapp" />
            <span>WhatsApp ({site.whatsappDisplay})</span>
          </a>
          {site.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="footer__contact-link"
            >
              <PhoneIcon size={14} />
              <span>{phone}</span>
            </a>
          ))}
        </div>
        <div>
          <h2>Follow</h2>
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className="footer__fine">
        © {new Date().getFullYear()} Ralypto, {site.location}
      </p>
    </footer>
  );
}
