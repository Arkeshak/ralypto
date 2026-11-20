import type { Metadata } from "next";
import ChipiYuyk from "@/components/products/ChipiYuyk";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Meet Chipi, a keychain-sized interactive companion from Ralypto. Register for limited early-bird pre-orders.",
};

export default function ProductsPage() {
  return <ChipiYuyk />;
}
