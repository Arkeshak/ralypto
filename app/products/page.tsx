import type { Metadata } from "next";
import ChipiShowcase from "@/components/products/ChipiShowcase";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Meet Chipi, a keychain-sized interactive companion from Ralypto. Register for limited early-bird pre-orders.",
};

export default function ProductsPage() {
  return <ChipiShowcase />;
}
