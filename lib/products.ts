/* ------------------------------------------------------------------
   RALYPTO — products
   Everything about Chipi that may change (price, status, launch
   details, FAQ answers) lives here. Edit this file only.
------------------------------------------------------------------- */
import { site } from "@/lib/content";

export type LaunchStatus = "opening-soon" | "early-bird" | "open-24h";
export type FeatureIcon = "keychain" | "display" | "face" | "touch" | "motion" | "chip";

export const chipi = {
  name: "CHIPI",
  category: "Smart Pocket Companion / Mini Interactive Gadget",
  /* "open-24h", "early-bird" or "opening-soon". Changes the label on the product card. */
  status: "open-24h" as LaunchStatus,
  price: "LKR 3,000 – 3,500",
  description:
    "Meet Chipi – your tiny interactive companion. A compact, keychain-sized smart gadget designed to bring personality, interaction, and technology together in your everyday life.",
  teaser: "A tiny face with a big personality. It reacts when you touch it, tilt it or shake it.",
  /* Put real product photos in public/products/chipi/ and list them here.
     The first one is the main visual. Until the file exists, a neutral placeholder shows. */
  images: [
    {
      src: "/products/chipi/chipi-hero.jpg",
      alt: "Chipi, a keychain-sized interactive gadget with an animated face display",
    },
  ],
  features: [
    { icon: "keychain", title: "Keychain-sized", text: "Compact and portable. Clips on and goes everywhere." },
    { icon: "display", title: "Expressive display", text: "An animated screen that shows what Chipi feels." },
    { icon: "face", title: "Facial expressions", text: "Interactive faces that react to you." },
    { icon: "touch", title: "Touch interaction", text: "Tap and Chipi responds." },
    { icon: "motion", title: "Motion-responsive", text: "Tilt it or shake it and see what happens." },
    { icon: "chip", title: "ESP32-powered", text: "Real hardware, designed in our Hardware Lab." },
  ] as { icon: FeatureIcon; title: string; text: string }[],
};

export const earlyBird = {
  heading: "Be Among the First to Own Chipi.",
  text: "Get early access to our first limited product release. Early-bird customers will receive an exclusive software benefit with their Chipi purchase.",
  highlights: [
    "Limited initial production batch",
    "Early-bird software benefit",
    "Priority access to the first release",
    "Pre-order registration",
  ],
};

export const trust = [
  { title: "Designed by Ralypto Hardware Lab", text: "Made in Sri Lanka by the same team behind our robots and IoT devices." },
  { title: "Limited initial release", text: "The first batch is small, so early registrations matter." },
  { title: "Early-bird benefits", text: "First customers get an exclusive software benefit." },
  { title: "Direct help on WhatsApp", text: "Talk to our team directly, from questions to next steps." },
];

export const faq = [
  { q: "What is Chipi?", a: "Chipi is a keychain-sized interactive gadget with an animated face. It responds to touch and motion, and runs on an ESP32." },
  { q: "How much does Chipi cost?", a: `The estimated price is ${chipi.price}. The final price will be confirmed by our team when you pre-order.` },
  { q: "When will Chipi be available?", a: "We have not confirmed a launch date yet. Registering now puts you in line for the first limited release, and we will tell you as soon as dates are set." },
  { q: "How does the pre-order process work?", a: "Pre-order registration is open 24 hours a day. Fill in the short form and continue to WhatsApp with your details pre-filled. Our team replies personally to confirm your pre-order and share next steps. No payment is taken on the website." },
  { q: "How will I receive my product?", a: "Delivery details will be agreed with you on WhatsApp once your pre-order is confirmed. That is why we ask for your delivery address." },
];

/* ---------- WhatsApp message ---------- */
export type PreOrderData = { name: string; email: string; phone: string; address: string };

export function buildWhatsAppUrl(d: PreOrderData): string {
  const message = [
    "Hello Ralypto! I'm interested in pre-ordering CHIPI.",
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `WhatsApp Number: ${d.phone}`,
    `Delivery Address: ${d.address}`,
    "",
    `Product: ${chipi.name}`,
    `Estimated Price: ${chipi.price}`,
    "",
    "I'm interested in the early-bird offer. Please share the pre-order details and next steps.",
  ].join("\n");
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ---------- validation ---------- */
export type PreOrderErrors = Partial<Record<keyof PreOrderData | "consent", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validatePreOrder(d: PreOrderData, consent: boolean): PreOrderErrors {
  const e: PreOrderErrors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!d.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(d.email.trim())) e.email = "Please enter a valid email, like name@example.com.";
  const compact = d.phone.replace(/[\s\-().]/g, "");
  if (!compact) e.phone = "Please enter your WhatsApp number.";
  else if (!/^(\+|00)?\d{8,15}$/.test(compact))
    e.phone = "Enter a valid number with country code, like +94 77 123 4567.";
  if (d.address.trim().length < 8) e.address = "Please enter your full delivery address.";
  if (!consent) e.consent = "Please agree to be contacted so we can follow up.";
  return e;
}
