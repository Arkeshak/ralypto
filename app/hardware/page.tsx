import type { Metadata } from "next";
import LabPage from "@/components/LabPage";
import HardwareHero from "@/components/HardwareHero";
import ExplodedView from "@/components/ExplodedView";
import { labs } from "@/lib/content";

export const metadata: Metadata = { title: labs.hardware.name, description: labs.hardware.promise };

export default function HardwarePage() {
  return <LabPage lab="hardware" hero={<HardwareHero />} extra={<ExplodedView />} />;
}
