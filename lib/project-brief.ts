import { site } from "./content";

/** Prepare drafts only; the visitor reviews and sends in their chosen service. */
export function projectBriefLinks(message: string) {
  const subject = encodeURIComponent("New project brief");
  // mailto bodies use CRLF line endings, including when Gmail handles the URI.
  const body = encodeURIComponent(message.replace(/\r?\n/g, "\r\n"));
  const emailApp = `mailto:${site.email}?subject=${subject}&body=${body}`;

  return {
    // Pass the complete email through Gmail's mailto handler rather than its
    // standalone compose view, so the recipient, subject and body travel together.
    email: `https://mail.google.com/mail/?extsrc=mailto&url=${encodeURIComponent(emailApp)}`,
    emailApp,
    whatsapp: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`,
  };
}
