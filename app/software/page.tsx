import type { Metadata } from "next";
import LabPage from "@/components/LabPage";
import TerminalHero from "@/components/TerminalHero";
import HiddenTerminal from "@/components/HiddenTerminal";
import { labs } from "@/lib/content";

export const metadata: Metadata = { title: labs.software.name, description: labs.software.promise };

export default function SoftwarePage() {
  return (
    <>
      <LabPage lab="software" hero={<TerminalHero />} />
      <HiddenTerminal />
    </>
  );
}
