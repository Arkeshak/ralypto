import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LabCursor from "@/components/LabCursor";
import RevealOnScroll from "@/components/RevealOnScroll";
import Chapters from "@/components/Chapters";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/content";
import "@fontsource-variable/figtree";
import "@fontsource-variable/sora";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/barlow-semi-condensed/500.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/barlow-semi-condensed/700.css";
import "@/styles/base.css";
import "@/styles/home.css";
import "@/styles/software.css";
import "@/styles/creative.css";
import "@/styles/hardware.css";
import "@/styles/pages.css";
import "@/styles/extras.css";
import "@/styles/showcase.css";
import "@/styles/structure.css";
import "@/styles/type.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <LabCursor />
        <RevealOnScroll />
        <Chapters />
        <SmoothScroll />
      </body>
    </html>
  );
}
