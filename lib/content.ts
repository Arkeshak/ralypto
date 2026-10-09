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

// REAL PROJECTS & PRODUCTION SHOWCASES
export const projects: Project[] = [
  {
    slug: "smart-water-meter",
    title: "AquaPulse Smart Water Meter",
    labs: ["hardware", "software", "creative"],
    status: "client",
    year: 2026,
    client: "AquaPulse Utility Solutions",
    summary:
      "An IoT telemetry meter monitoring residential water flow, detecting leaks via ultrasonic sensing, and syncing real-time consumption data to a mobile dashboard.",
    challenge:
      "Undetected underground pipe leaks and slow monthly billing resulted in thousands of litres of wasted water and surprise utility costs.",
    built:
      "Custom ESP32 flow sensor enclosure with LoRa/Wi-Fi telemetry, real-time consumption dashboard with anomaly alerts, and full brand packaging identity.",
    tools: [
      "ESP32",
      "Fusion 360",
      "Next.js",
      "PostgreSQL",
      "Illustrator",
      "Premiere Pro",
    ],
    result:
      "Deployed across 40 test residences, identifying abnormal night flows within 45 minutes.",
    metrics: [
      { value: "< 45 min", label: "leak alert trigger" },
      { value: "32%", label: "average water saved" },
    ],
    visual: "device",
    featured: true,
  },
  {
    slug: "shop-erp",
    title: "StockLine Billing and Inventory ERP",
    labs: ["software"],
    status: "client",
    year: 2026,
    client: "Apex Hardware & Building Supplies",
    summary:
      "Enterprise point-of-sale, multi-warehouse stock synchronisation, and supplier ordering system built for high-throughput retail.",
    challenge:
      "Manual inventory in physical notebooks led to frequent stockouts on fast-moving fasteners, unrecorded shrinkage, and delayed reordering.",
    built:
      "Barcode-integrated web POS, multi-bin inventory tracker, automated supplier PO generation, and daily end-of-day summary reports via WhatsApp API.",
    tools: ["Next.js", "PostgreSQL", "Prisma", "WhatsApp Business API", "Docker"],
    result:
      "Replaced paper ledgers completely, synchronising inventory in real-time across 3 billing counters and 1,280+ SKUs.",
    metrics: [
      { value: "3.5 hrs", label: "saved per day" },
      { value: "1,284", label: "SKUs tracked" },
    ],
    visual: "dashboard",
    featured: true,
  },
  {
    slug: "booking-agent",
    title: "Sara, Multilingual AI Booking Assistant",
    labs: ["software"],
    status: "client",
    year: 2026,
    client: "Aura Aesthetic Clinics",
    summary:
      "An intelligent conversational AI agent managing appointment scheduling, customer inquiries, and calendar bookings over WhatsApp.",
    challenge:
      "Front desk staff were overwhelmed handling repetitive phone inquiries, causing missed appointment bookings during off-hours.",
    built:
      "Conversational NLP pipeline powered by Claude & OpenAI APIs integrated with Google Calendar and Twilio WhatsApp gateway, supporting English, Sinhala, and Tamil.",
    tools: ["Python", "FastAPI", "Claude API", "OpenAI", "Google Calendar API", "Twilio"],
    result:
      "Handles 80% of scheduling conversations end-to-end with zero human intervention and 24/7 responsiveness.",
    metrics: [
      { value: "0.6 s", label: "average reply speed" },
      { value: "24/7", label: "automated bookings" },
    ],
    visual: "chat",
    featured: true,
  },
  {
    slug: "cafe-brand",
    title: "Kopi & Co. Specialty Café Identity",
    labs: ["creative"],
    status: "client",
    year: 2026,
    client: "Kopi & Co. Artisan Roasters",
    summary:
      "Complete visual identity system, packaging design, interior signage, and launch creative collateral for an artisan specialty coffee chain.",
    challenge:
      "A new roastery entering an established urban market needed an instantly recognizable brand language conveying craft heritage.",
    built:
      "Dynamic wordmark and custom badge system, bespoke coffee bag packaging with foil stamping guidelines, barista uniforms, menu system, and social launch kit.",
    tools: ["Illustrator", "Photoshop", "Figma", "InDesign"],
    result:
      "Delivered an extensive brand guideline manual and launch assets that drove a sold-out opening weekend.",
    metrics: [
      { value: "28", label: "brand touchpoints" },
      { value: "100%", label: "opening weekend sold out" },
    ],
    visual: "brand",
    featured: true,
  },
  {
    slug: "launch-campaign",
    title: "Thread Lane 30-Day Brand Launch Campaign",
    labs: ["creative"],
    status: "client",
    year: 2026,
    client: "Thread Lane Contemporary Apparel",
    summary:
      "Full-funnel digital launch campaign spanning short-form video production, influencer gifting, Meta performance advertising, and storefront conversion optimization.",
    challenge:
      "New apparel label entering with zero organic social footprint and four weeks until drop day.",
    built:
      "14 high-energy reels and product showcase videos, targeted Meta ad creatives, landing page conversion flow, and email remarketing automation.",
    tools: ["Premiere Pro", "After Effects", "Meta Ads Manager", "Shopify", "Klaviyo"],
    result:
      "Generated over 2,400 engaged followers pre-launch and achieved 4.1x return on ad spend during drop week.",
    metrics: [
      { value: "4.1x", label: "return on ad spend" },
      { value: "2,400+", label: "engaged followers" },
    ],
    visual: "social",
    featured: true,
  },
  {
    slug: "pump-controller",
    title: "TankSense Automated Pump Controller",
    labs: ["hardware"],
    status: "client",
    year: 2025,
    client: "Residential Water Management Systems",
    summary:
      "Automated multi-level overhead water tank controller with dry-run protection, ultrasonic water-depth sensing, and Wi-Fi mobile monitoring.",
    challenge:
      "Overhead tanks continuously overflowed during municipal supply hours, wasting water and electricity while running pumps dry during droughts.",
    built:
      "Custom industrial PCB with optocoupled relay triggers, ultrasonic sensor transceiver, ESP32 microcontroller, and local web dashboard with cloud status sync.",
    tools: ["ESP32", "KiCad", "AutoCAD", "C++", "MQTT"],
    result:
      "Operating continuously for over 180 days with zero overflows and automatic dry-run pump cutoff.",
    metrics: [
      { value: "0", label: "overflow incidents" },
      { value: "180+", label: "consecutive days uptime" },
    ],
    images: ["/work/pump-controller.jpg"],
    visual: "circuit",
    featured: true,
  },
  {
    slug: "line-robot",
    title: "Runner, Automated Workshop AGV",
    labs: ["hardware"],
    status: "client",
    year: 2025,
    client: "FabTech Precision Machining",
    summary:
      "Autonomous guided vehicle (AGV) engineered to transport tooling fixtures and raw billets between CNC machining centers.",
    challenge:
      "Machinists spent up to 45 minutes per shift walking between workstations transporting heavy tool holders and raw stock.",
    built:
      "Dual-motor differential chassis, PID line-following optical array, ultrasonic obstacle detection with automatic emergency stop, and custom CNC-bent aluminium frame.",
    tools: ["Arduino Mega", "Fusion 360", "3D Printing", "PID Control", "Embedded C"],
    result:
      "Automated routine workpiece transit across a 25-metre workshop track, safely stopping for shop-floor technicians.",
    metrics: [
      { value: "25 m", label: "automated route" },
      { value: "15 kg", label: "safe payload" },
    ],
    images: ["/work/runner-robot.jpg"],
    visual: "robot",
    featured: true,
  },
  {
    slug: "smart-agriculture-platform",
    title: "AgriPulse Smart Irrigation & Telemetry Platform",
    labs: ["hardware", "software"],
    status: "client",
    year: 2026,
    client: "Greenfield Commercial Agro-Farms",
    summary:
      "Integrated agro-telemetry station network connecting in-ground soil moisture, NPK sensors, and automated solenoid valves to a real-time web dashboard.",
    challenge:
      "Manual flood irrigation led to excessive water consumption, crop fungal issues, and inconsistent fertilizer application across open greenhouse acreage.",
    built:
      "Solar-powered ESP32 sensor nodes with RS485 Modbus probes, automated relay manifolds for drip solenoids, and a Next.js analytics portal with predictive watering triggers.",
    tools: ["ESP32", "Modbus RS485", "Next.js", "Python", "TimescaleDB", "MQTT"],
    result:
      "Automated precision drip cycles based on live volumetric water content, reducing irrigation water usage by 38%.",
    metrics: [
      { value: "38%", label: "water reduction" },
      { value: "15 ha", label: "automated acreage" },
    ],
    images: ["/work/smart-agriculture-bg.jpg"],
    visual: "farm",
    featured: true,
  },
  {
    slug: "factory-machine-monitoring",
    title: "OptiVibe Industrial Machine Condition Monitoring",
    labs: ["hardware", "software"],
    status: "client",
    year: 2026,
    client: "Lanka Precision Extrusions",
    summary:
      "High-frequency vibration and thermal telemetry network attached to industrial extruders with edge anomaly detection and predictive maintenance alerts.",
    challenge:
      "Unplanned bearing failures on primary drive motors caused costly unplanned production line shutdowns and ruined polymer batches.",
    built:
      "Tri-axial MEMS accelerometers with high-speed ADC sampling, edge ESP32-S3 signal processing (FFT analysis), and a centralized SCADA-style web monitoring suite.",
    tools: ["ESP32-S3", "MEMS Accelerometers", "FFT DSP", "Next.js", "Node.js", "WebSockets"],
    result:
      "Detects bearing harmonic degradation up to two weeks before catastrophic failure, maintaining 99.8% equipment availability.",
    metrics: [
      { value: "99.8%", label: "equipment availability" },
      { value: "< 1.5s", label: "fault alert propagation" },
    ],
    images: ["/work/factory-monitoring-bg.jpg"],
    visual: "factory",
    featured: true,
  },
  {
    slug: "ai-security-monitoring",
    title: "AegisEdge Computer Vision Security System",
    labs: ["hardware", "software"],
    status: "client",
    year: 2026,
    client: "Metro Logistics Warehouses",
    summary:
      "Edge AI video analytics appliance and sensor array delivering real-time perimeter intrusion classification, vehicle tracking, and automated security dispatches.",
    challenge:
      "Traditional CCTV required continuous manual monitoring by guards, resulting in missed after-hours perimeter breaches and dock safety violations.",
    built:
      "Edge compute appliance running optimized YOLO object detection on RTSP camera streams, microwave radar perimeter triggers, and a cloud dispatch console with instant push alerts.",
    tools: ["YOLOv8", "OpenCV", "Python", "RTSP", "WebSockets", "React", "Docker"],
    result:
      "Automated night-shift monitoring across 12 camera zones with sub-second alert delivery and 98.6% classification accuracy.",
    metrics: [
      { value: "98.6%", label: "detection precision" },
      { value: "< 0.8s", label: "incident alert latency" },
    ],
    images: ["/work/ai-security-bg.jpg"],
    visual: "security",
    featured: true,
  },
  {
    slug: "digital-product-dev",
    title: "Volttix Connected Battery Management System",
    labs: ["hardware", "software", "creative"],
    status: "client",
    year: 2026,
    client: "Volttix Energy Solutions",
    summary:
      "End-to-end design and engineering of an IoT lithium-ion battery management unit: custom multi-layer PCB, CAN bus telemetry, companion diagnostics mobile app, and brand identity.",
    challenge:
      "A clean energy startup needed to build a commercial energy storage prototype with hardware design, embedded firmware, companion software, and marketing identity delivered simultaneously.",
    built:
      "Bespoke 4-layer PCB with active cell balancing, Bluetooth/CAN transceiver, React Native diagnostic technician application, and comprehensive product branding and technical datasheets.",
    tools: ["KiCad", "SolidWorks", "Embedded C", "React Native", "Next.js", "Figma"],
    result:
      "Successfully completed prototype to functional production sample in 8 weeks, passing thermal stress testing and enabling initial fleet customer demos.",
    metrics: [
      { value: "8 wks", label: "concept to production" },
      { value: "3 Labs", label: "fully unified delivery" },
    ],
    images: ["/work/digital-product-bg.jpg"],
    visual: "product",
    featured: true,
  },
  {
    slug: "office-delivery-robot",
    title: "Autonomous Office Delivery Robot",
    labs: ["hardware", "software"],
    status: "client",
    year: 2026,
    client: "Corporate Operations & Facility Automation",
    summary:
      "An autonomous mobile robot designed to transport files, confidential documents, and laboratory samples between office cabins using SLAM-based LiDAR mapping.",
    challenge:
      "Facility staff spent cumulative hours each day manually walking documents and supplies across multi-wing commercial offices.",
    built:
      "An autonomous mobile robot with 360° LiDAR mapping, AMCL localisation, dynamic A* obstacle avoidance, differential-drive kinematics, and an ESP32 low-level motion controller.",
    tools: ["ROS 2", "SLAM", "LiDAR", "A*", "AMCL", "ESP32", "Robotics"],
    result:
      "Generates its own navigational paths and dynamically replans alternative routes around moving personnel with ±2 cm positioning accuracy.",
    metrics: [
      { value: "15 kg", label: "payload capacity" },
      { value: "±2 cm", label: "navigation precision" },
    ],
    images: ["/work/office-delivery-robot.jpg"],
    visual: "office-delivery",
    featured: true,
  },
  {
    slug: "tea-leaf-plucking-robot",
    title: "Autonomous Tea-Leaf Plucking Robot",
    labs: ["hardware", "software"],
    status: "client",
    year: 2026,
    client: "Highland Agro-Robotics Research",
    summary:
      "An agricultural robotics rover combining rough-terrain mobility, stereoscopic computer vision, and an automated harvesting arm for tea cultivation.",
    challenge:
      "Identifying optimal two-leaves-and-a-bud flushes and automating the delicate picking process in high-altitude agricultural environments.",
    built:
      "A mobile rover integrating a rocker-bogie terrain chassis, multi-axis robotic harvesting arm, and computer vision powered by a Raspberry Pi 5 and ESP32.",
    tools: ["Robotics", "Raspberry Pi 5", "ESP32", "Computer Vision", "Embedded Systems", "AI"],
    result:
      "Demonstrated automated tea bud recognition and selective harvesting with integrated mechanical design and real-time edge image processing.",
    metrics: [
      { value: "94%", label: "bud detection accuracy" },
      { value: "1.4s", label: "pluck cycle duration" },
    ],
    images: ["/work/tea-leaf-plucking-robot.jpg"],
    visual: "tea-plucking",
    featured: true,
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
