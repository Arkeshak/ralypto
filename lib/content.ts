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
    "Ralypto is a software, creative and hardware studio from Sri Lanka. Our team writes software, designs and markets brands, and builds machines. Bring us an idea and we take it all the way to something real.",
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
      {
        title: "Websites",
        text: "Fast company sites, landing pages and online stores you can update yourself.",
      },
      {
        title: "ERP and business systems",
        text: "Billing, stock, HR and customer records in one system built around how you work.",
      },
      {
        title: "Custom software",
        text: "Booking tools, dashboards, portals: if a spreadsheet is slowing you down, we replace it.",
      },
      {
        title: "Mobile apps",
        text: "Android and iOS apps that connect to your systems.",
      },
      {
        title: "AI agents and automation",
        text: "Assistants that answer customers, read documents and handle repetitive tasks.",
      },
      {
        title: "Integrations",
        text: "Connect your tools: payments, WhatsApp, accounting software, CRMs.",
      },
    ],
    tools: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Firebase",
      "Docker",
      "OpenAI / Claude APIs",
      "Zoho / NetSuite",
    ],
    process: [
      {
        title: "Map the workflow",
        text: "We sit with the people who will use the system and write down how work really happens.",
      },
      {
        title: "Prototype",
        text: "Clickable screens within the first week, so you see it before we build it.",
      },
      {
        title: "Build in sprints",
        text: "Working features every two weeks, tested on real data.",
      },
      {
        title: "Launch and support",
        text: "Deployment, training for your team, and fixes after go-live.",
      },
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
      {
        title: "Logo and brand identity",
        text: "Logo, colours, type and a brand guide your whole team can follow.",
      },
      {
        title: "Graphic design",
        text: "Posters, packaging, menus, flyers and anything that gets printed or posted.",
      },
      {
        title: "Video editing",
        text: "Reels, ads, YouTube videos, event films and motion graphics.",
      },
      {
        title: "Photo editing",
        text: "Product retouching, colour grading and cut-outs for online stores.",
      },
      {
        title: "Social media management",
        text: "Monthly content calendars, design and posting on Instagram, Facebook and TikTok.",
      },
      {
        title: "Paid ads",
        text: "Meta and Google ad campaigns, from creative to targeting to budget tracking.",
      },
      {
        title: "SEO and content",
        text: "Website content and search setup so customers find you on Google.",
      },
      {
        title: "Campaign strategy",
        text: "Launch plans that tie design, content and ads to one clear goal.",
      },
    ],
    tools: [
      "Photoshop",
      "Illustrator",
      "Premiere Pro",
      "After Effects",
      "Figma",
      "Lightroom",
      "Meta Ads Manager",
      "Google Ads",
      "Google Analytics",
      "Canva",
    ],
    process: [
      {
        title: "Brief",
        text: "Who are we talking to, what should they feel, and what should they do next?",
      },
      {
        title: "Directions",
        text: "Two or three visual directions to choose from, not one take-it-or-leave-it option.",
      },
      {
        title: "Make",
        text: "Design, shoot, edit, write. You review at set points.",
      },
      {
        title: "Launch and measure",
        text: "We publish, run the ads and report what worked each month.",
      },
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
      {
        title: "Embedded systems",
        text: "Microcontroller boards and firmware for products and machines.",
      },
      {
        title: "Robotics",
        text: "Mobile robots, robotic arms and automation rigs, from prototype to demo.",
      },
      {
        title: "IoT devices",
        text: "Sensors and controllers that report to your phone or a dashboard.",
      },
      {
        title: "Relay and control design",
        text: "Control panels, relay logic and motor control for pumps, gates and machines.",
      },
      {
        title: "3D and AutoCAD design",
        text: "Technical drawings, enclosures and parts ready for 3D printing or fabrication.",
      },
      {
        title: "Prototyping",
        text: "A working first version you can test, show investors or take to a manufacturer.",
      },
    ],
    tools: [
      "Arduino",
      "ESP32",
      "Raspberry Pi",
      "STM32",
      "AutoCAD",
      "SolidWorks",
      "Fusion 360",
      "KiCad",
      "3D printing",
      "C / C++",
      "Python",
      "ROS 2",
      "YOLO",
    ],
    process: [
      {
        title: "Requirements",
        text: "What must the device do, where will it live, what can it cost?",
      },
      {
        title: "Design",
        text: "Circuit, mechanical drawings and a parts list before anything is soldered.",
      },
      {
        title: "Prototype and test",
        text: "Build, break, fix. Every version is tested against the requirements.",
      },
      {
        title: "Handover",
        text: "Drawings, code and documentation so the device can be built again.",
      },
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
    name: "hithush",
    role: "Software Lab lead",
    lab: "software",
    bio: "Builds websites, ERP systems and AI agents. Happiest when a slow manual process becomes one button.",
    skills: ["Full-stack web", "ERP systems", "AI agents"],
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
    ],
    photo: "/team/founder-software.jpg",
  },
  {
    id: "founder-creative",
    name: "Arkesh",
    role: "Creative Studio lead",
    lab: "creative",
    bio: "Designs brands, edits video and runs campaigns. Thinks about how something looks and who it reaches.",
    skills: ["Branding", "Video editing", "Digital marketing"],
    links: [
      { label: "Behance", href: "https://behance.net/" },
      { label: "Instagram", href: "https://instagram.com/" },
    ],
    photo: "/team/founder-creative.jpg",
  },
  {
    id: "founder-hardware",
    name: "abieshake",
    role: "Hardware Lab lead",
    lab: "hardware",
    bio: "Mechatronics engineer. Designs circuits, writes firmware and draws the parts in AutoCAD.",
    skills: ["Embedded systems", "Robotics", "AutoCAD"],
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/" },
      { label: "YouTube", href: "https://youtube.com/" },
    ],
    photo: "/team/founder-hardware.jpg",
  },
];

export type Visual =
  | "device" | "dashboard" | "chat" | "brand" | "social" | "circuit" | "robot"
  | "farm" | "factory" | "security" | "product" | "office-delivery" | "tea-plucking";

export type Project = {
  slug: string;
  title: string;
  labs: LabId[]; // first lab is the main one; more than one = cross-lab project
  status: ProjectStatus;
  year: number;
  client: string; // who it was for (or "Concept")
  summary: string;
  challenge: string;
  built: string;
  tools: string[];
  result: string;
  metrics?: { value: string; label: string }[];
  visual: Visual; // mock image style used until real images are added
  video?: string; // YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID
  images?: string[]; // files in /public/work/ — the first one replaces the mock image
  featured?: boolean; // shown in the home page slideshow
};

export const statusLabel: Record<ProjectStatus, string> = {
  client: "Client project",
  personal: "Personal project",
  concept: "Concept",
};

// MOCK PROJECTS — replace every entry with real work before going live
export const projects: Project[] = [
  {
    slug: "smart-water-meter",
    title: "AquaPulse smart water meter",
    labs: ["hardware", "software", "creative"],
    status: "concept",
    year: 2026,
    client: "Household product concept",
    summary:
      "A meter that reads water use, sends it to a phone app, and ships in a box with its own brand.",
    challenge:
      "Households only learn about leaks when the monthly bill arrives.",
    built:
      "An ESP32 flow sensor in a 3D-printed case, a phone app with daily usage charts, and the product name, packaging and launch video.",
    tools: [
      "ESP32",
      "Fusion 360",
      "Next.js",
      "Firebase",
      "Illustrator",
      "Premiere Pro",
    ],
    result:
      "A working prototype that flags unusual night-time use within an hour.",
    metrics: [
      { value: "1 hr", label: "to detect a leak" },
      { value: "3", label: "labs on one product" },
    ],
    visual: "device",
    featured: true,
  },
  {
    slug: "shop-erp",
    title: "StockLine billing and stock system",
    labs: ["software"],
    status: "client",
    year: 2026,
    client: "Local hardware shop",
    summary: "Point of sale, stock levels and supplier orders in one system.",
    challenge:
      "Stock was tracked in notebooks, so popular items ran out without warning.",
    built:
      "A web-based POS with barcode scanning, low-stock alerts and a daily sales report sent to the owner on WhatsApp.",
    tools: ["Next.js", "PostgreSQL", "WhatsApp API"],
    result: "Stock counts that update with every sale.",
    metrics: [
      { value: "3 hrs", label: "saved every week" },
      { value: "1,284", label: "items tracked" },
    ],
    visual: "dashboard",
    featured: true,
  },
  {
    slug: "booking-agent",
    title: "Sara, an AI booking assistant",
    labs: ["software"],
    status: "personal",
    year: 2026,
    client: "Built for clinics and salons",
    summary:
      "An AI agent that answers questions and books appointments over WhatsApp.",
    challenge: "Small clinics miss bookings when nobody can answer the phone.",
    built:
      "An agent connected to a calendar that replies in English, Sinhala and Tamil and confirms bookings automatically.",
    tools: ["Python", "Claude API", "Google Calendar API"],
    result: "Books an appointment in under a minute, any time of day.",
    metrics: [
      { value: "0.8 s", label: "average reply" },
      { value: "24/7", label: "bookings" },
    ],
    visual: "chat",
    featured: true,
  },
  {
    slug: "cafe-brand",
    title: "Kopi & Co. café identity",
    labs: ["creative"],
    status: "concept",
    year: 2026,
    client: "Neighbourhood café",
    summary: "Logo, colours, menu and cups for a neighbourhood café.",
    challenge: "A new café needed to look established from day one.",
    built:
      "A logo system, a warm colour palette, menu design, cup and bag mockups and an Instagram launch grid.",
    tools: ["Illustrator", "Photoshop", "Figma"],
    result: "A brand guide the owner uses for every new menu and post.",
    metrics: [
      { value: "24", label: "brand assets" },
      { value: "2 wks", label: "start to launch" },
    ],
    visual: "brand",
    featured: true,
  },
  {
    slug: "launch-campaign",
    title: "30-day launch for Thread Lane",
    labs: ["creative"],
    status: "concept",
    year: 2026,
    client: "Clothing label",
    summary: "Content calendar, reels and paid ads for a new clothing label.",
    challenge: "Zero followers and a launch date four weeks away.",
    built:
      "A 30-day content plan, 12 reels, carousel posts and a Meta ads campaign aimed at 18 to 30 year olds in Colombo and Kandy.",
    tools: ["Premiere Pro", "Meta Ads Manager", "Canva", "Google Analytics"],
    result: "A launch week with orders from the first ad set.",
    metrics: [
      { value: "2,400", label: "followers in 30 days" },
      { value: "4.1x", label: "return on ad spend" },
    ],
    visual: "social",
    featured: true,
  },
  {
    slug: "pump-controller",
    title: "TankSense pump controller",
    labs: ["hardware"],
    status: "personal",
    year: 2025,
    client: "Home automation",
    summary:
      "Turns a pump on and off from the tank level, with manual override from a phone.",
    challenge:
      "Tanks overflow or run dry when someone forgets the pump switch.",
    built:
      "A relay control board with float sensors, dry-run protection and a phone switch over Wi-Fi.",
    tools: ["ESP32", "KiCad", "AutoCAD", "C++"],
    result: "Running daily in a two-storey house without overflow.",
    metrics: [
      { value: "0", label: "overflows since install" },
      { value: "180", label: "days running" },
    ],
    visual: "circuit",
    featured: true,
  },
  {
    slug: "line-robot",
    title: "Runner, a workshop delivery robot",
    labs: ["hardware"],
    status: "personal",
    year: 2025,
    client: "Workshop automation",
    summary:
      "A small robot that carries items along a marked route in a workshop.",
    challenge: "Moving parts between benches by hand wasted time.",
    built:
      "A two-wheel chassis with IR sensors, PID steering and an obstacle stop.",
    tools: ["Arduino", "Fusion 360", "3D printing"],
    result: "Follows a 20-metre route and stops for people in its path.",
    metrics: [
      { value: "20 m", label: "route" },
      { value: "2 kg", label: "payload" },
    ],
    visual: "robot",
    featured: true,
  },
  {
    slug: "smart-agriculture-platform",
    title: "Smart Agriculture Platform",
    labs: ["hardware", "software"],
    status: "concept",
    year: 2026,
    client: "Concept Demonstration",
    summary: "A smart farming system connecting physical sensors and automated irrigation to a web dashboard.",
    challenge: "Monitoring crop conditions and managing irrigation manually is inefficient and resource-intensive.",
    built: "Soil-moisture sensors, ESP32 integration, pump automation, and a responsive data-analytics dashboard.",
    tools: ["ESP32", "Sensors", "React", "Python", "Data Analytics"],
    result: "Automated irrigation based on real-time soil data and historical trend analysis.",
    metrics: [
      { value: "Hardware", label: "Sensors & Pump" },
      { value: "Software", label: "Dashboard & AI" },
    ],
    visual: "farm",
    featured: true,
  },
  {
    slug: "factory-machine-monitoring",
    title: "Factory Machine Monitoring",
    labs: ["hardware", "software"],
    status: "concept",
    year: 2026,
    client: "Concept Demonstration",
    summary: "Industrial sensor network and connected software for machine condition monitoring.",
    challenge: "Unexpected machine downtime due to unnoticed faults or temperature spikes.",
    built: "Sensor integration for temperature/vibration, backend APIs, and a live monitoring dashboard with anomaly detection.",
    tools: ["Sensors", "IoT", "Next.js", "Python", "Predictive AI"],
    result: "Live status reporting, alerts, and historical trend analysis for predictive maintenance.",
    metrics: [
      { value: "Hardware", label: "Sensor modules" },
      { value: "Software", label: "Anomaly detection" },
    ],
    visual: "factory",
    featured: true,
  },
  {
    slug: "ai-security-monitoring",
    title: "AI Security and Monitoring",
    labs: ["hardware", "software"],
    status: "concept",
    year: 2026,
    client: "Concept Demonstration",
    summary: "A connected security system combining cameras, sensors, computer vision, and a web application.",
    challenge: "Traditional surveillance requires manual observation and lacks automated event classification.",
    built: "Edge camera integration, motion sensors, computer vision pipeline, and an alert-management interface.",
    tools: ["Cameras", "OpenCV", "YOLO", "Node.js", "WebSockets"],
    result: "Automated person-detection, event timeline, and instant notification dashboard.",
    metrics: [
      { value: "Hardware", label: "Camera & Edge" },
      { value: "Software", label: "Vision & Alerts" },
    ],
    visual: "security",
    featured: true,
  },
  {
    slug: "digital-product-dev",
    title: "Digital Product Development",
    labs: ["hardware", "software", "creative"],
    status: "concept",
    year: 2026,
    client: "Concept Demonstration",
    summary: "Taking a product idea from mechanical design and electronics through to connected software and branding.",
    challenge: "Coordinating physical product design with companion software and launch marketing.",
    built: "Mechanical CAD, embedded electronics, companion web application, cloud APIs, and launch assets.",
    tools: ["SolidWorks", "KiCad", "Next.js", "Cloud APIs", "Figma"],
    result: "A cohesive product ecosystem showing the workflow: Hardware → Software → Data and AI.",
    metrics: [
      { value: "Hardware", label: "CAD & PCB" },
      { value: "Software", label: "Companion App" },
    ],
    visual: "product",
    featured: true,
  },
  {
    slug: "office-delivery-robot",
    title: "Autonomous Office Delivery Robot",
    labs: ["hardware", "software"],
    status: "personal",
    year: 2026,
    client: "Internal R&D",
    summary: "An autonomous mobile robot designed to transport files and documents between office cabins using SLAM-based mapping.",
    challenge: "Transporting files and documents between office cabins requires dedicated personnel time.",
    built: "An autonomous mobile robot with mapping, localisation, path planning, obstacle avoidance, differential-drive control, and an ESP32 microcontroller.",
    tools: ["ROS 2", "SLAM", "LiDAR", "A*", "AMCL", "ESP32", "Robotics"],
    result: "Generates its own path and dynamically plans alternative routes to avoid obstacles.",
    images: ["/work/office-delivery-robot.jpg"],
    visual: "office-delivery",
    featured: true,
  },
  {
    slug: "tea-leaf-plucking-robot",
    title: "Autonomous Tea-Leaf Plucking Robot",
    labs: ["hardware", "software"],
    status: "personal",
    year: 2026,
    client: "Internal R&D",
    summary: "An agricultural robotics project combining mobility, machine vision, and automated harvesting.",
    challenge: "Identifying suitable tea leaves and automating the picking process in agricultural environments.",
    built: "A mobile rover integrating a rocker-bogie chassis, robotic arm, and computer vision powered by a Raspberry Pi 5 and ESP32.",
    tools: ["Robotics", "Raspberry Pi 5", "ESP32", "Computer Vision", "Embedded Systems", "AI"],
    result: "Demonstrates the potential of automated tea harvesting through integrated mechanical design and AI-based image processing.",
    images: ["/work/tea-leaf-plucking-robot.jpg"],
    visual: "tea-plucking",
    featured: true,
  }
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
