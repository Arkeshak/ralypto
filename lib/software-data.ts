export type SoftwareCategory = 
  | "erp"
  | "mobile"
  | "web"
  | "ai"
  | "custom"
  | "integrations";

export type SoftwareSystem = {
  id: string;
  title: string;
  subtitle: string;
  category: SoftwareCategory;
  client: string;
  year: number;
  metric: { value: string; label: string };
  summary: string;
  challenge: string;
  built: string;
  capabilities: string[];
  tools: string[];
  visualStyle: "erp-pos" | "mobile-app" | "web-store" | "ai-chat" | "cloud-scada" | "api-pipeline";
  demoActionLabel: string;
};

export type CategoryMeta = {
  id: SoftwareCategory;
  name: string;
  badge: string;
  title: string;
  description: string;
  leadIcon: string;
  tools: string[];
};

export const softwareCategories: CategoryMeta[] = [
  {
    id: "erp",
    name: "ERP & Business Systems",
    badge: "01 / ENTERPRISE",
    title: "ERP, Billing & Inventory Systems",
    description: "Multi-warehouse inventory, point-of-sale billing counters, automated purchase ordering, and accounting ledgers built around exact workflows.",
    leadIcon: "🏢",
    tools: ["Next.js 15", "PostgreSQL", "Prisma", "Docker", "Redis", "WhatsApp API", "WebSockets"],
  },
  {
    id: "mobile",
    name: "Mobile Applications",
    badge: "02 / MOBILE",
    title: "iOS & Android Native & Cross-Platform Apps",
    description: "High-performance smartphone apps for delivery couriers, IoT utility monitoring, field sales teams, and customer booking portals.",
    leadIcon: "📱",
    tools: ["React Native", "Expo", "Flutter", "SQLite", "Firebase", "Mapbox", "Bluetooth SDK"],
  },
  {
    id: "web",
    name: "Websites & E-Commerce",
    badge: "03 / WEB & COMMERCE",
    title: "High-Speed Websites & E-Commerce Platforms",
    description: "Sub-second load times, headless e-commerce checkouts, interactive product configurators, and B2B export portals that convert.",
    leadIcon: "🌐",
    tools: ["Next.js 15", "Shopify API", "Algolia", "TailwindCSS", "Framer Motion", "Sanity CMS"],
  },
  {
    id: "ai",
    name: "AI Agents & Automation",
    badge: "04 / INTELLIGENCE",
    title: "AI Agents & Autonomous Workflow Systems",
    description: "Conversational WhatsApp bots in English, Sinhala and Tamil, automated invoice OCR extraction, customer support triage, and price scrapers.",
    leadIcon: "🤖",
    tools: ["Claude 3.5 Sonnet", "OpenAI", "Python", "FastAPI", "Whisper", "LangChain", "Vector DB"],
  },
  {
    id: "custom",
    name: "Custom Software & Dashboards",
    badge: "05 / CLOUD PLATFORMS",
    title: "Custom Cloud Software & Telemetry Dashboards",
    description: "Industrial SCADA monitoring consoles, offline QR access ticketing, real-time GPS fleet tracking, and agronomy command centers.",
    leadIcon: "📊",
    tools: ["TimescaleDB", "Recharts", "WebSockets", "Go", "Leaflet", "PWA", "TypeScript"],
  },
  {
    id: "integrations",
    name: "API Integrations & Gateways",
    badge: "06 / INFRASTRUCTURE",
    title: "API Pipelines, Payment Gateways & Webhooks",
    description: "Unified Sri Lankan & international payment checkouts, WhatsApp Cloud API notification engines, and two-way marketplace inventory sync.",
    leadIcon: "⚡",
    tools: ["Stripe", "PayHere", "Meta Cloud API", "BullMQ", "MQTT", "QuickBooks API", "Celery"],
  },
];

export const softwareSystems: SoftwareSystem[] = [
  // ==========================================
  // CATEGORY 1: ERP & BUSINESS SYSTEMS (5 Examples)
  // ==========================================
  {
    id: "stockline-erp",
    title: "StockLine Billing & Multi-Warehouse ERP",
    subtitle: "High-Throughput Hardware & Building Supplies ERP",
    category: "erp",
    client: "Apex Hardware & Building Supplies Wholesale",
    year: 2026,
    metric: { value: "3.5 hrs", label: "saved per day" },
    summary: "Enterprise point-of-sale, multi-warehouse stock synchronization, and supplier ordering system replacing paper ledgers across 3 billing counters.",
    challenge: "Manual paper ledger recording led to frequent stockouts on fast-moving fasteners, unrecorded shrinkage, and delayed reordering across 1,280+ SKUs.",
    built: "Barcode-integrated web POS register, multi-bin inventory tracker, automated supplier PO generation, and daily end-of-day summary reports via WhatsApp API.",
    capabilities: [
      "Sub-second barcode scanning with live inventory decrementing.",
      "Multi-counter cash & credit billing with custom thermal receipt layout.",
      "Automated reorder point threshold triggers with one-click supplier POs.",
      "Daily automated ledger closure & cashier revenue audits sent to owner WhatsApp."
    ],
    tools: ["Next.js 15", "PostgreSQL", "Prisma", "Docker", "WhatsApp Business API", "TailwindCSS"],
    visualStyle: "erp-pos",
    demoActionLabel: "Simulate POS Scan & Inventory Drop",
  },
  {
    id: "apexfabric-erp",
    title: "ApexFabric Garment & Apparel Production ERP",
    subtitle: "End-to-End Cut-to-Pack Manufacturing System",
    category: "erp",
    client: "TexStyle Apparels & Garment Manufacturing",
    year: 2026,
    metric: { value: "99.4%", label: "bill of materials accuracy" },
    summary: "Comprehensive apparel manufacturing ERP tracking fabric roll inventory, automated bill-of-materials, sewing line hourly efficiency, and export packing lists.",
    challenge: "Production supervisors lacked real-time visibility into fabric consumption variances and sewing line bottlenecks, delaying bulk export consignments.",
    built: "Roll-by-roll barcode tracking, cut-order planner with wastage optimization, live tablet line throughput monitors, and automated carton packing checklists.",
    capabilities: [
      "Fabric roll barcode tracking with shrinkage & defect rate recording.",
      "Automated multi-size cut order ratio calculator minimizing fabric remnants.",
      "Real-time tablet-based hourly sewing line output tracking.",
      "Export packing list & shipping container volume generator."
    ],
    tools: ["Next.js", "Node.js", "PostgreSQL", "WebSockets", "Prisma", "TypeScript"],
    visualStyle: "erp-pos",
    demoActionLabel: "Simulate Fabric Roll Cutting Batch",
  },
  {
    id: "profleet-erp",
    title: "ProFleet Logistics & Freight Dispatch ERP",
    subtitle: "Consignment Tracking & Trip Sheet Management",
    category: "erp",
    client: "TransLanka Freight & Inter-City Logistics",
    year: 2025,
    metric: { value: "100%", label: "diesel fuel audit coverage" },
    summary: "Multi-hub freight dispatch and consignment management system tracking cargo waypoints, trip-sheet expenditures, driver settlements, and fuel audits.",
    challenge: "Unrecorded manual diesel allowances and lost paper delivery notes caused invoice settlement disputes and delayed monthly customer invoicing.",
    built: "Digital trip-sheet management with fuel receipt photo verification, multi-waypoint consignment status tracking, automated driver commission calculations, and PDF billing.",
    capabilities: [
      "Waypoint barcode scanning at regional transit hubs.",
      "Diesel fuel pump receipts capture with OCR odometer cross-check.",
      "Automated driver incentive and per-kilometer payout calculations.",
      "Client consignment portal with live milestone tracking."
    ],
    tools: ["Next.js", "Express", "PostgreSQL", "Redis", "TimescaleDB", "TailwindCSS"],
    visualStyle: "erp-pos",
    demoActionLabel: "Simulate Waypoint Consignment Scan",
  },
  {
    id: "medicore-erp",
    title: "MediCore Polyclinic & Batch Pharmacy ERP",
    subtitle: "Clinical EHR & FEFO Expiry Controlled Pharmacy",
    category: "erp",
    client: "MetroHealth Polyclinic & Diagnostic Network",
    year: 2026,
    metric: { value: "0", label: "expired dispensed drugs" },
    summary: "Integrated healthcare clinical system featuring digital consultation records, multi-specialty token queues, and First-Expired-First-Out (FEFO) pharmacy inventory.",
    challenge: "Disorganized paper prescriptions and manual drug inventory caused patient consultation delays and pharmaceutical inventory write-offs due to expired shelf stock.",
    built: "Live digital waiting room token displays, secure physician consultation notes with digital prescription writing, and batch-wise pharmacy inventory with automated expiry quarantine.",
    capabilities: [
      "Digital token queue system with doctor room assignment screens.",
      "Electronic prescription generation with drug interaction warnings.",
      "FEFO batch pharmacy dispensing with barcode verification.",
      "Daily clinical revenue and insurance claim reconciliation."
    ],
    tools: ["Next.js", "PostgreSQL", "TypeScript", "TailwindCSS", "Docker", "Web Crypto"],
    visualStyle: "erp-pos",
    demoActionLabel: "Simulate Token Call & Drug Dispense",
  },
  {
    id: "agripack-erp",
    title: "AgriPack Cold-Storage & Warehouse ERP",
    subtitle: "High-Density Produce Pallet Slotting System",
    category: "erp",
    client: "Ceylon Fresh Agro-Exporters",
    year: 2026,
    metric: { value: "1,800", label: "pallet slots tracked live" },
    summary: "Industrial cold-storage warehouse ERP managing pallet slot allocations, RS-485 scale capture, temperature chamber monitoring, and export customs compliance.",
    challenge: "Perishable export fruit pallets were misplaced in chilled storage chambers, resulting in spoilage and inaccurate pallet weight declarations during container loading.",
    built: "3D pallet grid slotting interface, direct serial integration with heavy-duty floor scales, continuous cold-room telemetry logging, and quarantine lot tracing.",
    capabilities: [
      "Visual 3D rack and pallet slot occupancy grid.",
      "Direct RS-485 serial communication with industrial floor scales.",
      "Chamber temperature and humidity compliance logging for audit reports.",
      "Export container load manifests with traceability certification."
    ],
    tools: ["Next.js", "Node.js", "TimescaleDB", "MQTT", "SerialPort API", "PostgreSQL"],
    visualStyle: "erp-pos",
    demoActionLabel: "Simulate Pallet Weight Weigh-In",
  },

  // ==========================================
  // CATEGORY 2: MOBILE APPLICATIONS (5 Examples)
  // ==========================================
  {
    id: "quickdrop-mobile",
    title: "QuickDrop Last-Mile Courier & Rider App",
    subtitle: "High-Speed Turn-by-Turn Delivery Companion",
    category: "mobile",
    client: "CityRunner Express Logistics Network",
    year: 2026,
    metric: { value: "1,400+", label: "daily completed drops" },
    summary: "Native rider companion app featuring dynamic delivery sequencing, offline barcode verification, geofenced proof-of-delivery with digital signatures, and instant earnings.",
    challenge: "Couriers suffered from battery drain, lost cellular coverage in basements, and missing proof-of-delivery signatures leading to disputed claims.",
    built: "Offline-first React Native architecture with SQLite queue synchronization, battery-thrifty GPS breadcrumbs, in-app camera POD capture, and turn-by-turn map routing.",
    capabilities: [
      "Offline parcel barcode scanning with local verification.",
      "Customer signature and photo proof-of-delivery with GPS geostamp.",
      "Dynamic multi-stop route optimization reducing transit travel time.",
      "Instant rider earnings ledger and daily tip payout integration."
    ],
    tools: ["React Native", "Expo", "SQLite", "Node.js", "Firebase FCM", "Mapbox"],
    visualStyle: "mobile-app",
    demoActionLabel: "Simulate In-App Delivery POD Signature",
  },
  {
    id: "aquapulse-mobile",
    title: "AquaPulse Consumer Water Telemetry App",
    subtitle: "Ultrasonic Flow Monitoring & Instant Billing",
    category: "mobile",
    client: "AquaPulse Utility Solutions",
    year: 2026,
    metric: { value: "< 45 min", label: "leak notification trigger" },
    summary: "Utility consumer mobile app connecting via BLE and cellular IoT to display live ultrasonic water consumption, predictive monthly bills, and leak alarms.",
    challenge: "Homeowners and commercial property managers were blind to hidden underground pipe leaks until receiving inflated monthly utility bills.",
    built: "Consumer mobile app streaming real-time flow telemetry, historical consumption heatmaps, instant leak push notifications, and integrated debit/credit card billing.",
    capabilities: [
      "Live volumetric water flow rate gauge updated every minute.",
      "Instant push notification alerts on continuous night-time flow anomalies.",
      "Predictive end-of-month utility bill forecasting based on usage rate.",
      "One-click bill settlement via integrated PayHere payment gateway."
    ],
    tools: ["Flutter", "Dart", "Go", "TimescaleDB", "AWS IoT Core", "PayHere SDK"],
    visualStyle: "mobile-app",
    demoActionLabel: "Trigger Simulated Leak Alert Push Notification",
  },
  {
    id: "fieldforce-mobile",
    title: "FieldForce Van-Sales & Distribution App",
    subtitle: "Ruggedized Offline Ordering for FMCG Reps",
    category: "mobile",
    client: "Prime FMCG Wholesale Distributors",
    year: 2025,
    metric: { value: "LKR 4.2M", label: "daily processed orders" },
    summary: "Ruggedized field sales mobile app enabling travelling van sales reps to browse 500+ SKUs, create on-the-spot retail invoices, verify shop credit, and print thermal bills offline.",
    challenge: "Sales reps visiting remote retail shops had zero cellular connectivity, resulting in hand-written receipts, pricing errors, and delayed central ERP inventory sync.",
    built: "Full offline-first database sync with WatermelonDB, GPS store visit check-in verification, instant customer credit balance checks, and Bluetooth ESC/POS printer pairing.",
    capabilities: [
      "100% offline catalog browsing, pricing tiers, and order cart generation.",
      "Bluetooth pairing with portable thermal belt printers for instant receipts.",
      "GPS store check-in verification ensuring scheduled dealer visits.",
      "Two-way delta synchronization when re-entering cellular coverage."
    ],
    tools: ["React Native", "WatermelonDB", "TypeScript", "Bluetooth Thermal SDK", "Node.js"],
    visualStyle: "mobile-app",
    demoActionLabel: "Simulate Bluetooth Receipt Print",
  },
  {
    id: "fitpulse-mobile",
    title: "FitPulse Gym Member Portal & Class Booking App",
    subtitle: "Class Scheduling, Digital QR Pass & Payments",
    category: "mobile",
    client: "FitPulse Athletic & Wellness Clubs",
    year: 2026,
    metric: { value: "3,200", label: "active member bookings" },
    summary: "High-energy fitness club mobile app featuring real-time class booking schedules, personal trainer booking, NFC/QR gate pass access, and recurring subscription billing.",
    challenge: "Overbooked classes and manual reception turnstile check-ins created long queues during morning and evening peak workout hours.",
    built: "Interactive mobile app with live seat capacity counts, one-tap class booking, dynamic anti-screenshot QR gym entry pass, and automated Stripe card subscriptions.",
    capabilities: [
      "Live class booking calendar with automated waitlist notifications.",
      "Sub-second encrypted QR gate pass for hands-free turnstile entry.",
      "Personal workout logging and trainer messaging hub.",
      "Automated monthly recurring membership subscription management."
    ],
    tools: ["React Native", "Expo", "Supabase", "TailwindCSS", "Stripe SDK"],
    visualStyle: "mobile-app",
    demoActionLabel: "Simulate QR Gate Pass Access",
  },
  {
    id: "lankadine-mobile",
    title: "LankaDine Multi-Vendor Restaurant & Food App",
    subtitle: "Live GPS Delivery Tracking & Split Payments",
    category: "mobile",
    client: "UrbanEats Delivery Network",
    year: 2026,
    metric: { value: "18 min", label: "average food delivery time" },
    summary: "Consumer food ordering application featuring live restaurant menus, customizable dish options, interactive rider tracking via WebSockets, and split payment checkout.",
    challenge: "Customers experienced delayed updates and opaque order delivery stages, causing high cancellation rates on food deliveries.",
    built: "Real-time mobile experience with live kitchen order status transitions (Received -> Cooking -> Dispatched), animated map rider icon, and instant push updates.",
    capabilities: [
      "Interactive dish modifier engine (spiciness levels, toppings, drink sizes).",
      "Live WebSocket rider location updates with smooth map interpolation.",
      "Multi-payment support including card, mobile wallet, and cash on delivery.",
      "Automated promo code validation and loyalty point redemption."
    ],
    tools: ["React Native", "Node.js", "WebSockets", "Redis", "Google Maps API"],
    visualStyle: "mobile-app",
    demoActionLabel: "Simulate Real-Time Rider Location Ping",
  },

  // ==========================================
  // CATEGORY 3: WEBSITES & E-COMMERCE (5 Examples)
  // ==========================================
  {
    id: "kopi-web",
    title: "Kopi & Co. Specialty Coffee Global Storefront",
    subtitle: "Headless Next.js E-Commerce with Roast Subscriptions",
    category: "web",
    client: "Kopi & Co. Artisan Roasters",
    year: 2026,
    metric: { value: "0.4s", label: "average page transition speed" },
    summary: "Ultra-fast headless e-commerce experience with custom roast subscription configurator, interactive tasting notes visualizer, and dynamic international currency detection.",
    challenge: "A traditional monolithic e-commerce template was slow to load on mobile and could not accommodate customizable bi-weekly coffee bean subscription options.",
    built: "Headless Next.js 15 frontend powered by Shopify Storefront API, animated roast profile flavour wheels, instant search, and automated localized currency conversion.",
    capabilities: [
      "Custom coffee bean subscription engine with customizable grind and interval.",
      "Interactive SVG aroma and tasting notes radar chart.",
      "Sub-second page navigation powered by Next.js Server Components.",
      "Global multi-currency checkout with automatic GeoIP country detection."
    ],
    tools: ["Next.js 15", "Shopify Storefront API", "TailwindCSS", "Framer Motion", "Vercel"],
    visualStyle: "web-store",
    demoActionLabel: "Simulate 0.4s Page Transition & Currency Switch",
  },
  {
    id: "threadlane-web",
    title: "Thread Lane Contemporary Apparel Flagship Store",
    subtitle: "High-Fashion Lookbook & Drop-Day Flash Store",
    category: "web",
    client: "Thread Lane Contemporary Apparel",
    year: 2026,
    metric: { value: "4.1x", label: "return on ad spend" },
    summary: "Editorial high-fashion web destination engineered for drop-day traffic spikes, featuring lookbook-to-cart purchasing, instant predictive search, and smart size guides.",
    challenge: "Drop-day flash sales caused severe site slowdowns on competitor platforms, leading to cart dropouts and lost revenue during peak campaign hours.",
    built: "Edge-cached static pages with dynamic inventory reconciliation, Algolia instant search, fluid editorial video hero banners, and a frictionless 2-step checkout.",
    capabilities: [
      "High-concurrency architecture handling thousands of simultaneous checkouts.",
      "Editorial video lookbook with direct tap-to-add product pins.",
      "Instant multi-attribute faceted filter (size, color, collection, price).",
      "Automated cart recovery integration with Klaviyo marketing webhooks."
    ],
    tools: ["Next.js", "Algolia Search", "Sanity CMS", "Stripe", "TailwindCSS"],
    visualStyle: "web-store",
    demoActionLabel: "Simulate Lookbook Tap-to-Cart Flow",
  },
  {
    id: "ceylonspice-web",
    title: "CeylonSpice Direct Exporter B2B Portal",
    subtitle: "Wholesale RFQ Quote Builder & Container Estimator",
    category: "web",
    client: "Ceylon Spice Heritage Exports",
    year: 2026,
    metric: { value: "$1.8M", label: "wholesale RFQs generated" },
    summary: "Global export trade platform allowing international buyers to calculate container freight capacities, request bespoke bulk spice quotes, and download lab certificates.",
    challenge: "Overseas spice importers required complex container freight packing estimates and ISO laboratory certifications before submitting inquiries.",
    built: "Interactive 20ft/40ft container capacity calculator, multi-tier bulk price calculator, automated RFQ submission pipeline, and downloadable certificate vault.",
    capabilities: [
      "Interactive container load volume & pallet weight calculator.",
      "Multi-currency wholesale pricing tiers with bulk volume discounts.",
      "Instant RFQ quotation generation with direct sales WhatsApp alert.",
      "Comprehensive ISO, USDA Organic, and GMP certificate verification vault."
    ],
    tools: ["Next.js 15", "PostgreSQL", "Prisma", "TailwindCSS", "TypeScript"],
    visualStyle: "web-store",
    demoActionLabel: "Simulate 20ft Container Load Calculation",
  },
  {
    id: "aura-web",
    title: "Aura Luxury Medical Aesthetic & Clinic Platform",
    subtitle: "Treatment Visualizer & Calendar Booking Engine",
    category: "web",
    client: "Aura Aesthetic Clinics",
    year: 2026,
    metric: { value: "+140%", label: "monthly online bookings" },
    summary: "Refined minimalist digital presence for a luxury dermatology clinic featuring interactive before-and-after treatment visualizers and synchronized calendar booking.",
    challenge: "Prospective patients were hesitant to book high-end cosmetic treatments without seeing clear clinical results and transparent practitioner qualifications.",
    built: "Interactive dual-handle before/after visualizer, doctor bio portfolio with credentials, real-time consultation calendar booking, and VIP WhatsApp concierge button.",
    capabilities: [
      "Interactive before/after clinical comparison sliders.",
      "Live calendar consultation booking with automated SMS confirmation.",
      "Physician credential spotlights and treatment FAQ knowledge base.",
      "Seamless integration with Sara AI WhatsApp concierge booking."
    ],
    tools: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion", "Vercel"],
    visualStyle: "web-store",
    demoActionLabel: "Simulate Interactive Treatment Slider",
  },
  {
    id: "archstudio-web",
    title: "ArchStudio Architectural Portfolio & Client Hub",
    subtitle: "WebGL 3D Orbit Showcase & Blueprint Proofing Lounge",
    category: "web",
    client: "Studio Matrix Architecture & Spatial Design",
    year: 2025,
    metric: { value: "60 fps", label: "smooth WebGL model rendering" },
    summary: "Immersive architectural showcase site with high-resolution imagery, smooth inertia scrolling, interactive 3D floor plan orbit viewer, and a private client review lounge.",
    challenge: "Heavy architectural 4K renders and CAD plans caused lagging scroll performance and failed to engage high-net-worth commercial property developers.",
    built: "Hardware-accelerated WebGL 3D massing model viewer, Lenis smooth scrolling, client proofing portal with pin-point markup comments, and lightning load speeds.",
    capabilities: [
      "Interactive 3D building massing and floorplan orbit controls.",
      "High-resolution architectural photography lightbox with zero stutter.",
      "Password-protected client lounge for approving architectural revisions.",
      "Interactive timeline of completed commercial and residential projects."
    ],
    tools: ["Next.js", "Three.js / WebGL", "Lenis Smooth Scroll", "TailwindCSS"],
    visualStyle: "web-store",
    demoActionLabel: "Simulate WebGL 3D Floorplan Orbit",
  },

  // ==========================================
  // CATEGORY 4: AI AGENTS & WORKFLOW AUTOMATION (5 Examples)
  // ==========================================
  {
    id: "sara-ai",
    title: "Sara, Multilingual WhatsApp AI Booking Assistant",
    subtitle: "Autonomous Trilingual WhatsApp Concierge",
    category: "ai",
    client: "Aura Aesthetic Clinics & Hospitality Services",
    year: 2026,
    metric: { value: "0.6s", label: "average AI reply speed" },
    summary: "Conversational AI receptionist communicating fluently in English, Sinhala, and Tamil over WhatsApp, booking appointments and resolving schedule conflicts 24/7.",
    challenge: "Clinic receptionists missed dozens of appointment requests arriving outside business hours and during busy counter check-in periods.",
    built: "Conversational NLP agent powered by Claude 3.5 Sonnet integrated with Google Calendar and WhatsApp Business API, resolving inquiries with sub-second latency.",
    capabilities: [
      "Trilingual natural language understanding (English, Sinhala, Tamil).",
      "Real-time calendar slot querying and double-booking prevention.",
      "Automated appointment confirmation and Google Calendar invite generation.",
      "Graceful human operator escalation fallback with conversation transcript."
    ],
    tools: ["Python", "FastAPI", "Claude 3.5 Sonnet", "Twilio WhatsApp", "Google Calendar API"],
    visualStyle: "ai-chat",
    demoActionLabel: "Simulate Live WhatsApp Booking Conversation",
  },
  {
    id: "docuparse-ai",
    title: "DocuParse Automated Invoice & OCR Extraction Agent",
    subtitle: "Autonomous Multilingual Document Ingestion Engine",
    category: "ai",
    client: "Apex Hardware & Wholesale Logistics",
    year: 2026,
    metric: { value: "< 2 sec", label: "per PDF invoice extraction" },
    summary: "Intelligent document agent ingesting supplier PDF invoices and photos, extracting line items, VAT numbers, and totals, and posting ledger entries into the ERP.",
    challenge: "Data entry clerks spent over 14 hours per week manually typing numbers from hundreds of supplier invoices, introducing transcription mistakes.",
    built: "Autonomous multi-modal LLM pipeline extracting tabular line items, comparing totals with tax calculations, and triggering automated ERP purchase ledger journal entries.",
    capabilities: [
      "Table extraction from skewed mobile photos and multi-page PDFs.",
      "Mathematical cross-check validating subtotal + tax = invoice total.",
      "Automated vendor SKU matching against internal database catalogue.",
      "Duplicate invoice detection preventing double supplier payment."
    ],
    tools: ["Python", "Claude Vision", "FastAPI", "PostgreSQL", "RabbitMQ", "Docker"],
    visualStyle: "ai-chat",
    demoActionLabel: "Simulate Invoice Table Line Extraction",
  },
  {
    id: "ticketpilot-ai",
    title: "TicketPilot Autonomous Customer Support AI",
    subtitle: "RAG-Powered First-Response Customer Care Agent",
    category: "ai",
    client: "LankaDine Food Delivery & E-Commerce Network",
    year: 2026,
    metric: { value: "65%", label: "Tier-1 tickets resolved autonomously" },
    summary: "First-responder customer support AI agent analyzing incoming queries, querying live database order statuses, and issuing refunds or resolution steps automatically.",
    challenge: "Support ticket volume during peak dinner hours created long support response queues and unhappy customers with cold food or delayed deliveries.",
    built: "RAG-powered conversational engine querying internal order databases, evaluating delivery driver delays, and issuing automated compensation vouchers according to policy.",
    capabilities: [
      "Semantic knowledge retrieval over return and refund policy documents.",
      "Live order query tool calls fetching current kitchen and rider status.",
      "Sentiment analysis flagging frustrated customers for priority human handover.",
      "Automated compensation voucher generation within pre-set budget caps."
    ],
    tools: ["Node.js", "LangChain", "Claude API", "Pinecone Vector DB", "Zendesk API"],
    visualStyle: "ai-chat",
    demoActionLabel: "Simulate Live Support Ticket Resolution",
  },
  {
    id: "marketpulse-ai",
    title: "MarketPulse Competitor Price Intelligence Agent",
    subtitle: "Autonomous Retail Price Scraper & Margin Optimizer",
    category: "ai",
    client: "TechTrend Consumer Electronics Retail",
    year: 2026,
    metric: { value: "4,500+", label: "daily competitor prices tracked" },
    summary: "Automated market intelligence agent crawling competitor retail websites daily, tracking SKU pricing fluctuations, and recommending optimal markdown or pricing strategies.",
    challenge: "Competitors were secretly slashing prices on key smartphone accessories and laptops, resulting in lost retail footfall and delayed price matching.",
    built: "Headless browser scraping cluster with fuzzy AI product title matching, price change anomaly alerts, and dynamic pricing recommendation models.",
    capabilities: [
      "Automated anti-bot crawling across major domestic e-commerce retailers.",
      "Fuzzy AI product matching pairing varying competitor model descriptions.",
      "Instant Slack alert triggers when competitor drops price by > 5%.",
      "Dynamic price recommendation engine preserving target gross margins."
    ],
    tools: ["Python", "Playwright", "FastAPI", "PostgreSQL", "Claude API", "Docker"],
    visualStyle: "ai-chat",
    demoActionLabel: "Simulate Competitor Price Discrepancy Alert",
  },
  {
    id: "leadscout-ai",
    title: "LeadScout B2B Prospect Enrichment & Outreach Agent",
    subtitle: "Autonomous Trade Prospect Identification Pipeline",
    category: "ai",
    client: "CeylonSpice Heritage Exports",
    year: 2026,
    metric: { value: "32%", label: "inbound email reply rate" },
    summary: "Autonomous outbound intelligence pipeline identifying wholesale food distributors globally, extracting verified decision-maker emails, and generating personalized pitches.",
    challenge: "Export sales directors spent hours searching LinkedIn and trade directories for verified purchasing managers at overseas wholesale food distributors.",
    built: "Multi-step agent searching B2B registries, verifying corporate MX records, generating tailored pitch letters based on the distributor's catalog, and scheduling follow-ups.",
    capabilities: [
      "Automated buyer discovery across targeted international trade databases.",
      "Real-time MX record and email deliverability verification.",
      "Hyper-personalized email body drafting referencing buyer's current imports.",
      "Automated multi-stage follow-up scheduling with reply detection."
    ],
    tools: ["Python", "OpenAI", "Apollo API", "Hunter API", "Resend", "PostgreSQL"],
    visualStyle: "ai-chat",
    demoActionLabel: "Simulate Personalized B2B Pitch Generation",
  },

  // ==========================================
  // CATEGORY 5: CUSTOM SOFTWARE & DASHBOARDS (5 Examples)
  // ==========================================
  {
    id: "optivibe-dashboard",
    title: "OptiVibe Industrial SCADA Machine Telemetry Console",
    subtitle: "High-Frequency Harmonic Vibration & Thermal Dashboard",
    category: "custom",
    client: "Lanka Precision Extrusions Factory",
    year: 2026,
    metric: { value: "99.8%", label: "factory equipment availability" },
    summary: "Industrial telemetry dashboard receiving high-frequency vibration and thermal streams from factory extrusion motors, plotting real-time harmonic FFT spectra.",
    challenge: "Unplanned extruder motor bearing failures caused sudden factory downtime, ruined molten polymer batches, and thousands in repair costs.",
    built: "Real-time WebSocket telemetry suite plotting sub-second tri-axial vibration FFT waveforms, calculating ISO vibration severity standards, and sounding acoustic alarms.",
    capabilities: [
      "Sub-second real-time WebSocket FFT vibration spectra visualization.",
      "ISO 10816 vibration severity threshold zones (Good, Alert, Danger).",
      "Automated predictive bearing degradation trend forecasting.",
      "Instant sound alarms and SMS dispatch to plant maintenance engineers."
    ],
    tools: ["Next.js 15", "WebSockets", "TimescaleDB", "Recharts", "Go", "Docker"],
    visualStyle: "cloud-scada",
    demoActionLabel: "Simulate Vibration Spike & Bearing Alarm",
  },
  {
    id: "eventpass-custom",
    title: "EventPass Enterprise QR Ticketing & Access Hub",
    subtitle: "Offline Gate Check-In & Anti-Fraud Scanner Network",
    category: "custom",
    client: "Colombo Arena Live Events & Exhibitions",
    year: 2026,
    metric: { value: "< 100ms", label: "offline gate verification" },
    summary: "Mission-critical ticketing infrastructure featuring dynamic anti-screenshot QR codes, high-speed offline gate check-in PWAs, and live venue crowd density heatmaps.",
    challenge: "Fake ticket screenshots and sluggish gate check-in scanners created bottleneck stampedes at stadium entrance gates during sold-out concerts.",
    built: "Offline-first Progressive Web App with asymmetric cryptographic QR verification, peer-to-peer mesh synchronization, and a live executive attendance command center.",
    capabilities: [
      "Cryptographically signed rolling QR codes defeating screenshots.",
      "Sub-100ms offline ticket validation with audible buzzer feedback.",
      "Real-time turnstile attendee throughput heatmaps per stadium gate.",
      "Anti-passback protection preventing duplicate ticket re-entry."
    ],
    tools: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Web Crypto", "PWA"],
    visualStyle: "cloud-scada",
    demoActionLabel: "Simulate Sub-100ms Gate QR Scan",
  },
  {
    id: "fleetview-custom",
    title: "FleetView Real-Time GPS Vehicle Telematics Portal",
    subtitle: "220-Truck Moving Marker Map & Speed Violation Alerts",
    category: "custom",
    client: "Lanka Logistics Express",
    year: 2025,
    metric: { value: "220", label: "commercial trucks tracked live" },
    summary: "Central dispatch operational hub displaying live location of vehicle fleets, trip replay with speed graphs, geofence boundary alerts, and driver safety scorecards.",
    challenge: "Fleet managers could not verify if delivery trucks were taking unauthorized diversions, idling engines with air conditioning on, or speeding on highways.",
    built: "High-performance mapping portal rendering hundreds of moving vehicle markers, historical route trail replay, geofence polygon breach triggers, and fuel audit graphs.",
    capabilities: [
      "Live moving marker clustering with 5-second GPS telemetry pings.",
      "Historical route trip replay with speed and elevation profile charts.",
      "Custom polygon geofencing with instant enter/exit breach alerts.",
      "Driver safety scorecards evaluating harsh braking and speeding incidents."
    ],
    tools: ["React", "Leaflet", "Go", "PostgreSQL", "TimescaleDB", "Redis"],
    visualStyle: "cloud-scada",
    demoActionLabel: "Simulate Geofence Breach Event",
  },
  {
    id: "edutrack-custom",
    title: "EduTrack Institution Management & Student Portal",
    subtitle: "RFID Attendance & Automated Gradebook Computation",
    category: "custom",
    client: "Horizon International College",
    year: 2025,
    metric: { value: "1,800", label: "students managed seamlessly" },
    summary: "Comprehensive academic information system handling admissions, automated student attendance via RFID badges, gradebook computation, and report card PDF generation.",
    challenge: "Teachers spent weeks compiling end-of-term paper report cards, calculating class averages, and recording physical attendance ledgers by hand.",
    built: "Cloud academic management platform featuring automated RFID gate attendance, weighted formula gradebook calculations, one-click PDF report card compilation, and parent portals.",
    capabilities: [
      "RFID gate terminal integration logging student arrival timestamps.",
      "Weighted academic GPA and subject ranking calculation engine.",
      "One-click batch PDF report card compilation with teacher remarks.",
      "Parent portal for tracking fee payments, attendance, and exam marks."
    ],
    tools: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS", "PDFKit"],
    visualStyle: "cloud-scada",
    demoActionLabel: "Simulate Batch Report Card Generation",
  },
  {
    id: "agripulse-dashboard",
    title: "AgriPulse Greenhouse Telemetry & Agronomy Command",
    subtitle: "Soil Moisture, NPK & Automated Drip Solenoid Portal",
    category: "custom",
    client: "Greenfield Commercial Agro-Farms",
    year: 2026,
    metric: { value: "38%", label: "irrigation water saved" },
    summary: "Precision agriculture web dashboard visualizing soil moisture tension, ambient greenhouse humidity, NPK nutrient levels, and valve solenoid duty cycles.",
    challenge: "Manual open-hose flood irrigation wasted thousands of liters of borehole water and caused nutrient leaching across commercial vegetable greenhouses.",
    built: "Interactive telemetry portal streaming in-ground probe data, plotting evapotranspiration curves, and automatically pulsing solenoid valves when soil moisture dips below 35%.",
    capabilities: [
      "Multi-zone sensor gauge widgets (volumetric water, EC, temperature, NPK).",
      "Automated solenoid valve schedule control with manual override toggles.",
      "Solar battery reserve voltage and weather forecast integration.",
      "Agronomic recommendation logs optimizing fertilizer dosing cycles."
    ],
    tools: ["Next.js", "TimescaleDB", "Python", "MQTT", "Chart.js", "TailwindCSS"],
    visualStyle: "cloud-scada",
    demoActionLabel: "Simulate Automated Solenoid Valve Trigger",
  },

  // ==========================================
  // CATEGORY 6: API INTEGRATIONS & GATEWAYS (5 Examples)
  // ==========================================
  {
    id: "payomni-integration",
    title: "PayOmni Unified Multi-Channel Payment Gateway Engine",
    subtitle: "Sri Lanka Local IPG & Global Stripe Checkout Bridge",
    category: "integrations",
    client: "Retail & Hospitality Merchant Network",
    year: 2026,
    metric: { value: "< 180ms", label: "transaction authorization latency" },
    summary: "Unified payment aggregation middleware standardizing checkout across Sri Lankan local rails (PayHere, Commercial Bank, Sampath IPG) and global Stripe.",
    challenge: "Merchants had to maintain fragile separate codebases for local LKR bank gateways and international USD Stripe accounts, causing dropped checkouts.",
    built: "Unified hosted modal, idempotent API architecture preventing double-charges, automated webhook retries with exponential backoff, and instant PDF tax invoices.",
    capabilities: [
      "Single API endpoint abstracting multiple local and international payment rails.",
      "Idempotent transaction tokenization eliminating duplicate deductions.",
      "Resilient webhook dispatch engine with automated exponential backoff retries.",
      "Automated payment confirmation email and WhatsApp receipt generation."
    ],
    tools: ["Node.js", "Express", "Redis", "PostgreSQL", "Stripe SDK", "PayHere IPG"],
    visualStyle: "api-pipeline",
    demoActionLabel: "Trigger Simulated Payment & Webhook Pipeline",
  },
  {
    id: "whatsapp-cloud-api",
    title: "WhatsApp Cloud API High-Volume Notification Engine",
    subtitle: "Enterprise Order Updates, OTPs & Interactive Menus",
    category: "integrations",
    client: "E-Commerce & Service Brands Group",
    year: 2026,
    metric: { value: "99.2%", label: "delivered notification rate" },
    summary: "High-throughput messaging pipeline triggering automated order confirmations, dispatch tracking links, OTP verifications, and interactive quick-reply customer menus.",
    challenge: "SMS delivery rates were dropping while costs increased, and brands lacked an interactive, verified channel to send instant transactional order notifications.",
    built: "Resilient BullMQ message queue dispatcher interfacing with Meta's Graph API, handling rate-limiting tokens, delivery webhooks, and customer reply triage.",
    capabilities: [
      "Meta-verified pre-approved WhatsApp message template engine.",
      "High-throughput asynchronous BullMQ queue with rate-limiting throttling.",
      "Interactive button and list-picker response webhook handlers.",
      "Real-time delivery status tracking (Sent, Delivered, Read, Failed)."
    ],
    tools: ["Node.js", "Meta Graph API v20", "BullMQ", "Redis", "PostgreSQL"],
    visualStyle: "api-pipeline",
    demoActionLabel: "Simulate WhatsApp Order Confirmation Dispatch",
  },
  {
    id: "omnisync-integration",
    title: "OmniSync Multi-Marketplace Two-Way Inventory Bridge",
    subtitle: "Shopify, WooCommerce & Daraz Stock Synchronization",
    category: "integrations",
    client: "Consumer Brand Distributorships",
    year: 2026,
    metric: { value: "0", label: "overselling stock incidents" },
    summary: "Real-time bi-directional catalog and inventory synchronization pipeline connecting central ERP warehouse stock with Shopify, WooCommerce, and Daraz marketplaces.",
    challenge: "Selling across multiple digital storefronts led to frequent overselling when an item purchased on Daraz was not instantly deducted from Shopify.",
    built: "Two-way webhook and scheduled delta sync engine locking inventory stock across all channels within 3 seconds of a checkout event.",
    capabilities: [
      "Sub-3-second cross-platform inventory deduction upon sales event.",
      "Universal product catalog mapper reconciling varying SKU naming schemes.",
      "Automated order aggregation into a single centralized fulfillment queue.",
      "Rate-limit safe API throttling respecting marketplace request quotas."
    ],
    tools: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "Shopify API"],
    visualStyle: "api-pipeline",
    demoActionLabel: "Simulate Multi-Store Stock Lock Event",
  },
  {
    id: "telemetrix-integration",
    title: "Telemetrix RS485 & MQTT Telemetry Cloud Ingestion Pipe",
    subtitle: "10,000 Pings/Min Time-Series Broker for Industrial IoT",
    category: "integrations",
    client: "Smart Utility & Factory Automation Group",
    year: 2026,
    metric: { value: "10,000", label: "pings per minute ingested" },
    summary: "Ultra-low latency telemetry broker collecting raw packets from hundreds of remote ESP32 and RS485 Modbus nodes, decoding binary payloads, and streaming to dashboards.",
    challenge: "Hundreds of remote edge sensor devices flooded cloud servers with uncoordinated telemetry, causing packet drops and database connection exhaustion.",
    built: "High-concurrency Go ingestion worker interfacing with EMQX MQTT broker, batch-inserting into TimescaleDB hypertables, and broadcasting via WebSockets.",
    capabilities: [
      "Ultra-fast Go worker ingesting thousands of MQTT sensor payloads per second.",
      "Automated binary payload unpacking and sensor calibration adjustments.",
      "TimescaleDB hypertable automated continuous rollups and compression.",
      "Instant threshold violation webhooks to plant alerting channels."
    ],
    tools: ["Go", "EMQX MQTT Broker", "TimescaleDB", "Redis", "Docker"],
    visualStyle: "api-pipeline",
    demoActionLabel: "Simulate High-Throughput Packet Batch Ingestion",
  },
  {
    id: "taxsync-integration",
    title: "TaxSync POS-to-QuickBooks & Statutory Tax Ledger Bridge",
    subtitle: "Automated Double-Entry Ledger Synchronization",
    category: "integrations",
    client: "Corporate Wholesalers & Multi-Branch Retail",
    year: 2025,
    metric: { value: "100%", label: "audit-proof tax reconciliation" },
    summary: "Automated fiscal integration bridge transforming daily point-of-sale invoice batches into double-entry accounting ledger entries in QuickBooks and Xero.",
    challenge: "Accounting departments spent the first week of every month manually reconciling drawer cash, card receipts, and sales tax against accounting ledgers.",
    built: "Nightly automated ledger bridge mapping billing lines to general ledger chart-of-accounts, calculating statutory sales tax withholdings, and generating export audit sheets.",
    capabilities: [
      "Automated end-of-day sales batch posting to QuickBooks and Xero.",
      "Tax code categorization (Standard VAT, Excluded, Zero-Rated).",
      "Bank deposit payment reconciliation cross-checking merchant settlement slips.",
      "Tamper-proof audit export log for government revenue authority inspection."
    ],
    tools: ["Node.js", "TypeScript", "QuickBooks API", "Xero API", "PostgreSQL"],
    visualStyle: "api-pipeline",
    demoActionLabel: "Simulate End-of-Day Ledger Journal Post",
  },
];
