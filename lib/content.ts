/* ------------------------------------------------------------------
   RALYPTO — site content
   Edit this file to change text, add projects, or update the team.
   Every project below is SAMPLE content: replace it with real work.
------------------------------------------------------------------- */

export type LabId = "software" | "creative" | "hardware";
export type ProjectStatus = "client" | "personal" | "concept";

export const site = {
  name: "Ralypto",
  tagline: "We code it, design it, and build it.",
  intro:
    "Ralypto is a three-person studio from Sri Lanka. One of us writes software, one designs and markets, one builds machines. Bring us an idea and we take it all the way to something real.",
  email: "hello@ralypto.com",
  whatsapp: "94771234567",
  location: "Sri Lanka",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Behance", href: "https://behance.net/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
};

export type Lab = {
  id: LabId;
  name: string;
  path: string;
  promise: string;
  doorLine: string;
  services: { title: string; text: string }[];
  tools: string[];
  process: { title: string; text: string }[];
  leadId: string;
};

export const labs: Record<LabId, Lab> = {
  software: {
    id: "software",
    name: "Software Lab",
    path: "/software",
    promise: "Websites, business systems and AI agents that do real work.",
    doorLine: "Code, systems, AI",
    services: [
      { title: "Websites", text: "Fast company sites, landing pages and online stores you can update yourself." },
      { title: "ERP and business systems", text: "Billing, stock, HR and customer records in one system built around how you work." },
      { title: "Custom software", text: "Booking tools, dashboards, portals: if a spreadsheet is slowing you down, we replace it." },
      { title: "Mobile apps", text: "Android and iOS apps that connect to your systems." },
      { title: "AI agents and automation", text: "Assistants that answer customers, read documents and handle repetitive tasks." },
      { title: "Integrations", text: "Connect your tools: payments, WhatsApp, accounting software, CRMs." },
    ],
    tools: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Firebase", "Docker", "OpenAI / Claude APIs", "Zoho / NetSuite"],
    process: [
      { title: "Map the workflow", text: "We sit with the people who will use the system and write down how work really happens." },
      { title: "Prototype", text: "Clickable screens within the first week, so you see it before we build it." },
      { title: "Build in sprints", text: "Working features every two weeks, tested on real data." },
      { title: "Launch and support", text: "Deployment, training for your team, and fixes after go-live." },
    ],
    leadId: "founder-software",
  },
  creative: {
    id: "creative",
    name: "Creative Studio",
    path: "/creative",
    promise: "Brands, visuals and campaigns that make people stop scrolling.",
    doorLine: "Design, video, marketing",
    services: [
      { title: "Logo and brand identity", text: "Logo, colours, type and a brand guide your whole team can follow." },
      { title: "Graphic design", text: "Posters, packaging, menus, flyers and anything that gets printed or posted." },
      { title: "Video editing", text: "Reels, ads, YouTube videos, event films and motion graphics." },
      { title: "Photo editing", text: "Product retouching, colour grading and cut-outs for online stores." },
      { title: "Social media management", text: "Monthly content calendars, design and posting on Instagram, Facebook and TikTok." },
      { title: "Paid ads", text: "Meta and Google ad campaigns, from creative to targeting to budget tracking." },
      { title: "SEO and content", text: "Website content and search setup so customers find you on Google." },
      { title: "Campaign strategy", text: "Launch plans that tie design, content and ads to one clear goal." },
    ],
    tools: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Figma", "Lightroom", "Meta Ads Manager", "Google Ads", "Google Analytics", "Canva"],
    process: [
      { title: "Brief", text: "Who are we talking to, what should they feel, and what should they do next?" },
      { title: "Directions", text: "Two or three visual directions to choose from, not one take-it-or-leave-it option." },
      { title: "Make", text: "Design, shoot, edit, write. You review at set points." },
      { title: "Launch and measure", text: "We publish, run the ads and report what worked each month." },
    ],
    leadId: "founder-creative",
  },
  hardware: {
    id: "hardware",
    name: "Hardware Lab",
    path: "/hardware",
    promise: "Embedded systems, robots and smart devices, designed and built.",
    doorLine: "Embedded, robotics, CAD",
    services: [
      { title: "Embedded systems", text: "Microcontroller boards and firmware for products and machines." },
      { title: "Robotics", text: "Mobile robots, robotic arms and automation rigs, from prototype to demo." },
      { title: "IoT devices", text: "Sensors and controllers that report to your phone or a dashboard." },
      { title: "Relay and control design", text: "Control panels, relay logic and motor control for pumps, gates and machines." },
      { title: "3D and AutoCAD design", text: "Technical drawings, enclosures and parts ready for 3D printing or fabrication." },
      { title: "Prototyping", text: "A working first version you can test, show investors or take to a manufacturer." },
    ],
    tools: ["Arduino", "ESP32", "Raspberry Pi", "STM32", "AutoCAD", "SolidWorks", "Fusion 360", "KiCad", "3D printing", "C / C++"],
    process: [
      { title: "Requirements", text: "What must the device do, where will it live, what can it cost?" },
      { title: "Design", text: "Circuit, mechanical drawings and a parts list before anything is soldered." },
      { title: "Prototype and test", text: "Build, break, fix. Every version is tested against the requirements." },
      { title: "Handover", text: "Drawings, code and documentation so the device can be built again." },
    ],
    leadId: "founder-hardware",
  },
};

export const labOrder: LabId[] = ["software", "creative", "hardware"];

export type Founder = {
  id: string;
  name: string;
  role: string;
  lab: LabId;
  bio: string;
  skills: string[];
  links: { label: string; href: string }[];
  photo?: string; // e.g. "/team/founder-software.jpg" placed in /public/team
};

export const team: Founder[] = [
  {
    id: "founder-software",
    name: "Kavindu",
    role: "Software Lab lead",
    lab: "software",
    bio: "Builds websites, ERP systems and AI agents. Happiest when a slow manual process becomes one button.",
    skills: ["Full-stack web", "ERP systems", "AI agents"],
    links: [{ label: "GitHub", href: "https://github.com/" }, { label: "LinkedIn", href: "https://linkedin.com/" }],
    photo: "/team/founder-software.jpg"
  },
  {
    id: "founder-creative",
    name: "Ayesha",
    role: "Creative Studio lead",
    lab: "creative",
    bio: "Designs brands, edits video and runs campaigns. Thinks about how something looks and who it reaches.",
    skills: ["Branding", "Video editing", "Digital marketing"],
    links: [{ label: "Behance", href: "https://behance.net/" }, { label: "Instagram", href: "https://instagram.com/" }],
    photo: "/team/founder-creative.jpg"
  },
  {
    id: "founder-hardware",
    name: "Malith",
    role: "Hardware Lab lead",
    lab: "hardware",
    bio: "Mechatronics engineer. Designs circuits, writes firmware and draws the parts in AutoCAD.",
    skills: ["Embedded systems", "Robotics", "AutoCAD"],
    links: [{ label: "LinkedIn", href: "https://linkedin.com/" }, { label: "YouTube", href: "https://youtube.com/" }],
    photo: "/team/founder-hardware.jpg"
  },
];

export type Project = {
  slug: string;
  title: string;
  labs: LabId[]; // first lab is the main one; more than one = cross-lab project
  status: ProjectStatus;
  year: number;
  summary: string;
  challenge: string;
  built: string;
  tools: string[];
  result: string;
  metrics?: { value: string; label: string }[];
  video?: string; // YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID
  images?: string[]; // files in /public/work/
  featured?: boolean;
};

export const statusLabel: Record<ProjectStatus, string> = {
  client: "Client project",
  personal: "Personal project",
  concept: "Concept",
};

// SAMPLE PROJECTS — replace every entry with real work
export const projects: Project[] = [
  {
    slug: "smart-water-meter",
    title: "Smart water meter",
    labs: ["hardware", "software", "creative"],
    status: "concept",
    year: 2026,
    summary: "A meter that reads water use, sends it to a phone app, and ships in a box with its own brand.",
    challenge: "Households only learn about leaks when the monthly bill arrives.",
    built: "An ESP32 flow sensor in a 3D-printed case, a dashboard and mobile app showing daily use, and the product name, packaging and launch video.",
    tools: ["ESP32", "Fusion 360", "Next.js", "Firebase", "Illustrator", "Premiere Pro"],
    result: "A working prototype that flags unusual night-time use within an hour.",
    featured: true,
  },
  {
    slug: "shop-erp",
    title: "Billing and stock system for a hardware shop",
    labs: ["software"],
    status: "concept",
    year: 2026,
    summary: "Point of sale, stock levels and supplier orders in one system.",
    challenge: "Stock was tracked in notebooks, so popular items ran out without warning.",
    built: "A web-based POS with barcode scanning, low-stock alerts and a daily sales report sent to the owner on WhatsApp.",
    tools: ["Next.js", "PostgreSQL", "WhatsApp API"],
    result: "Stock counts that update with every sale.",
    metrics: [{ value: "3 hrs", label: "saved per week on stock counts" }],
    featured: true,
  },
  {
    slug: "booking-agent",
    title: "AI booking assistant",
    labs: ["software"],
    status: "personal",
    year: 2026,
    summary: "An AI agent that answers questions and books appointments over WhatsApp.",
    challenge: "Small clinics miss bookings when nobody can answer the phone.",
    built: "An agent connected to a calendar that replies in English, Sinhala and Tamil and confirms bookings automatically.",
    tools: ["Python", "Claude API", "Google Calendar API"],
    result: "Books an appointment in under a minute, any time of day.",
  },
  {
    slug: "cafe-brand",
    title: "Brand identity for a café",
    labs: ["creative"],
    status: "concept",
    year: 2026,
    summary: "Logo, colours, menu and cups for a neighbourhood café.",
    challenge: "A new café needed to look established from day one.",
    built: "A logo system, a warm colour palette, menu design, cup and bag mockups and an Instagram launch grid.",
    tools: ["Illustrator", "Photoshop", "Figma"],
    result: "A brand guide the owner uses for every new menu and post.",
    featured: true,
  },
  {
    slug: "launch-campaign",
    title: "30-day social launch campaign",
    labs: ["creative"],
    status: "concept",
    year: 2026,
    summary: "Content calendar, reels and paid ads for a new clothing label.",
    challenge: "Zero followers and a launch date four weeks away.",
    built: "A 30-day content plan, 12 reels, carousel posts and a Meta ads campaign aimed at 18 to 30 year olds in Colombo and Kandy.",
    tools: ["Premiere Pro", "Meta Ads Manager", "Canva", "Google Analytics"],
    result: "A launch week with orders from the first ad set.",
    metrics: [
      { value: "2,400", label: "followers in 30 days" },
      { value: "4.1x", label: "return on ad spend" },
    ],
  },
  {
    slug: "pump-controller",
    title: "Smart relay controller for water pumps",
    labs: ["hardware"],
    status: "personal",
    year: 2025,
    summary: "Turns a pump on and off from the tank level, with manual override from a phone.",
    challenge: "Tanks overflow or run dry when someone forgets the pump switch.",
    built: "A relay control board with float sensors, dry-run protection and a phone switch over Wi-Fi.",
    tools: ["ESP32", "KiCad", "AutoCAD", "C++"],
    result: "Running daily in a two-storey house without overflow.",
    featured: true,
  },
  {
    slug: "line-robot",
    title: "Line-following delivery robot",
    labs: ["hardware"],
    status: "personal",
    year: 2025,
    summary: "A small robot that carries items along a marked route in a workshop.",
    challenge: "Moving parts between benches by hand wasted time.",
    built: "A two-wheel chassis with IR sensors, PID steering and an obstacle stop.",
    tools: ["Arduino", "Fusion 360", "3D printing"],
    result: "Follows a 20-metre route and stops for people in its path.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsForLab(lab: LabId) {
  return projects.filter((p) => p.labs.includes(lab));
}

export function isCrossLab(p: Project) {
  return p.labs.length > 1;
}
