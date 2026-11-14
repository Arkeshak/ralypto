/* ------------------------------------------------------------------
   RALYPTO — products
   Everything about Chipi that may change (price, status, launch
   details, FAQ answers, confirmed hardware specs) lives here.
------------------------------------------------------------------- */
import { site } from "@/lib/content";

export type LaunchStatus = "opening-soon" | "early-bird";
export type FeatureIcon = "keychain" | "display" | "face" | "touch" | "motion" | "chip";

export const chipi = {
  name: "CHIPI",
  tagline: "A Pocket Companion by Ralypto",
  category: "Smart Pocket Companion / Mini Interactive Gadget",
  /* "opening-soon" or "early-bird". Changes the label on the product card. */
  status: "early-bird" as LaunchStatus,
  price: "LKR 3,000 – 3,500",
  description:
    "Meet Chipi – your compact smart pocket companion by Ralypto. Designed and engineered in our Hardware Lab, Chipi combines an expressive blue OLED display, capacitive petting sensor, and motion responsiveness into a durable, pocket-sized keychain companion.",
  teaser: "Small enough to carry. Smart enough to surprise.",
  images: [
    {
      src: "/products/chipi/chipi-hero.jpg",
      alt: "Chipi, a keychain-sized interactive companion with an animated blue OLED display",
    },
  ],
  features: [
    { icon: "motion", title: "Motion / Petting Sensor", text: "Top-mounted capacitive sensor reacts to affectionate petting, gentle taps, and movement." },
    { icon: "display", title: "OLED Display (Expressions)", text: "High-contrast monochrome blue OLED screen showing real-time animated personality." },
    { icon: "keychain", title: "Keychain Ready", text: "Integrated molded corner loop and durable stainless-steel ring for everyday carry." },
    { icon: "chip", title: "ESP32-Powered Core", text: "Dual-core computing engine with custom firmware engineered in Ralypto Hardware Lab." },
  ] as { icon: FeatureIcon; title: string; text: string }[],
};

/* Confirmed physical hardware specifications */
export const chipiSpecs = [
  { label: "Dimensions", value: "32 mm × 16 mm × 32 mm (Approx.)" },
  { label: "Enclosure", value: "Matte-black impact-resistant casing with chamfered geometry" },
  { label: "Processor", value: "ESP32 dual-core 32-bit microcontroller" },
  { label: "Display", value: "High-contrast blue OLED graphical display" },
  { label: "Sensors", value: "Top capacitive petting/touch sensor & motion accelerometer" },
  { label: "Attachment", value: "Molded corner eyelet with stainless-steel keychain ring" },
  { label: "Origin", value: "Designed & prototyped by Ralypto Hardware Lab, Sri Lanka" },
];

/* 4 Display Expressions from confirmed reference */
export const chipiExpressions = [
  {
    id: "normal",
    name: "Normal",
    subtitle: "Determined & curious",
    desc: "Chipi's signature attentive gaze—observing its surroundings and ready to interact.",
    img: "/products/chipi/expr-normal.png",
  },
  {
    id: "happy",
    name: "Happy",
    subtitle: "Affectionate & joyful",
    desc: "Beams with delight and curved eyes whenever you pet or tap its top capacitive sensor.",
    img: "/products/chipi/expr-happy.png",
  },
  {
    id: "sleepy",
    name: "Sleepy",
    subtitle: "Resting & calm",
    desc: "Gently closes its eyes into low-power resting mode when placed still on your desk.",
    img: "/products/chipi/expr-sleepy.png",
  },
  {
    id: "surprised",
    name: "Surprised",
    subtitle: "Alert & responsive",
    desc: "Reacts with wide circular eyes when picked up, suddenly tilted, or shaken.",
    img: "/products/chipi/expr-surprised.png",
  },
];

/* Exploded assembly stages from confirmed reference */
export const chipiArchitecture = [
  { step: "01", name: "Front Cover", desc: "Matte-black chamfered shell with precision-milled bezel for the OLED window." },
  { step: "02", name: "OLED Display", desc: "Crisp blue graphical screen delivering fluid, high-contrast facial animations." },
  { step: "03", name: "Motion & Petting Sensor", desc: "Top capacitive dome detecting touches, petting gestures, and physical orientation." },
  { step: "04", name: "ESP32 Mainboard", desc: "Compact custom motherboard housing the processing unit, power management, and logic." },
  { step: "05", name: "Back Cover", desc: "Precision-molded rear casing with reinforced corner attachment and fastener mounts." },
];

export const earlyBird = {
  heading: "Be Among the First to Own CHIPI.",
  text: "Get early access to our first limited product release. Early-bird customers will receive an exclusive software benefit with their Chipi purchase.",
  highlights: [
    "Limited initial production batch",
    "Estimated price: LKR 3,000 – 3,500",
    "Early-bird software benefit included",
    "Priority access to the first delivery release",
  ],
};

export const trust = [
  { title: "Designed by Ralypto Hardware Lab", text: "Made in Sri Lanka by the same team behind our robots and IoT devices." },
  { title: "Limited initial release", text: "The first batch is small, so early registrations matter." },
  { title: "Early-bird benefits", text: "First customers get an exclusive software benefit." },
  { title: "Direct help on WhatsApp", text: "Talk to our team directly, from questions to next steps." },
];

export const faq = [
  { q: "What is Chipi?", a: "Chipi is a keychain-sized interactive companion with an animated blue OLED display. It responds to touch, petting, and motion, powered by an ESP32 microcontroller." },
  { q: "How much does Chipi cost?", a: `The estimated price is ${chipi.price}. The final price will be confirmed by our team when you register your pre-order interest.` },
  { q: "When will Chipi be available?", a: "We have not confirmed a public launch date yet. Registering now secures your place in line for the first limited early-bird batch, and we will update you as soon as production batches are ready." },
  { q: "How does the pre-order process work?", a: "Submit the short registration form and continue to WhatsApp with your details pre-filled. Our team replies personally to confirm your pre-order and share next steps. No payment is taken on the website." },
  { q: "How will I receive my product?", a: "Delivery details and shipping will be coordinated directly with you on WhatsApp once your pre-order is confirmed. That is why we ask for your delivery address." },
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
