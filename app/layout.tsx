import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LabCursor from "@/components/LabCursor";
import RevealOnScroll from "@/components/RevealOnScroll";
import { site } from "@/lib/content";
import "@/styles/base.css";
import "@/styles/home.css";
import "@/styles/software.css";
import "@/styles/creative.css";
import "@/styles/hardware.css";
import "@/styles/pages.css";
import "@/styles/extras.css";
import "@/styles/showcase.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ralypto.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.intro,
    url: "https://ralypto.com",
    siteName: site.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const fonts =
  "https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;700&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Barlow+Condensed:wght@400;600;700&display=swap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={fonts} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <LabCursor />
        <RevealOnScroll />
      </body>
    </html>
  );
}
