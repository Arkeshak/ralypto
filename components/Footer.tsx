import Link from "next/link";
import { labOrder, labs, site } from "@/lib/content";

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
          <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>
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
