import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "..", "public", "work");

// Helper to wrap SVG in sharp and save as PNG
async function saveSvgAsPng(svgContent, filename, width = 1600, height = 1000) {
  const filePath = path.join(outDir, filename);
  await sharp(Buffer.from(svgContent.trim()))
    .resize(width, height)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(filePath);
  console.log(`Generated: ${filename} (${width}x${height})`);
}

// 1. StockLine Billing & Inventory ERP Dashboard
function buildStockLineDashboard() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E121E"/>
      <stop offset="100%" stop-color="#080A10"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181F33"/>
      <stop offset="100%" stop-color="#121726"/>
    </linearGradient>
    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFB000" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#FFB000" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFB000"/>
      <stop offset="100%" stop-color="#FF7A1A"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace; }
    .sans { font-family: 'Figtree', 'Segoe UI', -apple-system, sans-serif; }
    .title { font-weight: 800; font-size: 26px; fill: #FFFFFF; }
    .kpi-val { font-weight: 800; font-size: 32px; fill: #FFFFFF; }
    .kpi-lbl { font-size: 14px; fill: #8E9BAE; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .tag { font-size: 12px; font-weight: 700; }
  </style>

  <!-- Background -->
  <rect width="1600" height="1000" fill="url(#bgGrad)"/>

  <!-- Top App Window Header -->
  <rect x="0" y="0" width="1600" height="60" fill="#111625"/>
  <circle cx="35" cy="30" r="7" fill="#FF5F56"/>
  <circle cx="60" cy="30" r="7" fill="#FFBD2E"/>
  <circle cx="85" cy="30" r="7" fill="#27C93F"/>

  <!-- Window Title -->
  <text x="140" y="37" class="mono" font-size="16" fill="#8E9BAE" font-weight="600">StockLine ERP Enterprise v3.4 — Multi-Warehouse Point of Sale</text>
  <rect x="1380" y="16" width="180" height="28" rx="14" fill="#1C2438"/>
  <circle cx="1400" cy="30" r="4" fill="#27C93F"/>
  <text x="1415" y="35" class="mono" font-size="12" fill="#27C93F" font-weight="700">TERMINAL SYNCED</text>

  <!-- Left Sidebar -->
  <rect x="0" y="60" width="240" height="940" fill="#0C0F1A" border-right="1px solid #1C2438"/>
  <line x1="240" y1="60" x2="240" y2="1000" stroke="#1D263B" stroke-width="1"/>

  <!-- Sidebar Items -->
  <rect x="16" y="85" width="208" height="44" rx="8" fill="url(#accentGrad)"/>
  <text x="35" y="113" class="sans" font-size="16" fill="#000" font-weight="800">📊 POS &amp; Billing</text>

  <g transform="translate(16, 145)">
    <rect width="208" height="40" rx="8" fill="transparent"/>
    <text x="20" y="26" class="sans" font-size="15" fill="#8E9BAE" font-weight="600">📦 Inventory Control</text>
  </g>
  <g transform="translate(16, 195)">
    <rect width="208" height="40" rx="8" fill="transparent"/>
    <text x="20" y="26" class="sans" font-size="15" fill="#8E9BAE" font-weight="600">🏬 Multi-Warehouse</text>
  </g>
  <g transform="translate(16, 245)">
    <rect width="208" height="40" rx="8" fill="transparent"/>
    <text x="20" y="26" class="sans" font-size="15" fill="#8E9BAE" font-weight="600">🧾 Tax &amp; Invoices</text>
  </g>
  <g transform="translate(16, 295)">
    <rect width="208" height="40" rx="8" fill="transparent"/>
    <text x="20" y="26" class="sans" font-size="15" fill="#8E9BAE" font-weight="600">👥 Supplier Portal</text>
  </g>
  <g transform="translate(16, 345)">
    <rect width="208" height="40" rx="8" fill="transparent"/>
    <text x="20" y="26" class="sans" font-size="15" fill="#8E9BAE" font-weight="600">📈 Sales Analytics</text>
  </g>

  <!-- Store Info Pill Bottom Sidebar -->
  <rect x="16" y="890" width="208" height="80" rx="12" fill="#141A29"/>
  <text x="32" y="925" class="sans" font-size="14" fill="#FFFFFF" font-weight="700">Central Hub Depot</text>
  <text x="32" y="948" class="mono" font-size="12" fill="#FFB000">Cashier #04 • Online</text>

  <!-- Main Content Dashboard -->
  <!-- Top KPI Cards -->
  <!-- Card 1: Daily Revenue -->
  <g transform="translate(270, 85)" filter="url(#shadow)">
    <rect width="300" height="135" rx="14" fill="url(#cardGrad)" stroke="#222B42" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Today's Gross Sales</text>
    <text x="24" y="84" class="kpi-val mono">LKR 842,500</text>
    <rect x="24" y="98" width="92" height="24" rx="12" fill="#163828"/>
    <text x="34" y="114" class="sans" font-size="12" fill="#27C93F" font-weight="700">▲ +18.4% vs yst</text>
  </g>

  <!-- Card 2: Orders Processed -->
  <g transform="translate(595, 85)" filter="url(#shadow)">
    <rect width="300" height="135" rx="14" fill="url(#cardGrad)" stroke="#222B42" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Orders Processed</text>
    <text x="24" y="84" class="kpi-val mono">1,482</text>
    <rect x="24" y="98" width="115" height="24" rx="12" fill="#182E3E"/>
    <text x="34" y="114" class="sans" font-size="12" fill="#00A9FF" font-weight="700">3.2 orders / min</text>
  </g>

  <!-- Card 3: In-Stock SKUs -->
  <g transform="translate(920, 85)" filter="url(#shadow)">
    <rect width="300" height="135" rx="14" fill="url(#cardGrad)" stroke="#222B42" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Active In-Stock SKUs</text>
    <text x="24" y="84" class="kpi-val mono">12,450</text>
    <rect x="24" y="98" width="120" height="24" rx="12" fill="#1A2D2A"/>
    <text x="34" y="114" class="sans" font-size="12" fill="#00D084" font-weight="700">3 Warehouses</text>
  </g>

  <!-- Card 4: Low Stock Alert -->
  <g transform="translate(1245, 85)" filter="url(#shadow)">
    <rect width="320" height="135" rx="14" fill="url(#cardGrad)" stroke="#222B42" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Low Stock Alerts</text>
    <text x="24" y="84" class="kpi-val mono" fill="#FF5252">4 Items</text>
    <rect x="24" y="98" width="138" height="24" rx="12" fill="#3D1C1E"/>
    <text x="34" y="114" class="sans" font-size="12" fill="#FF5252" font-weight="700">Auto-PO Dispatched</text>
  </g>

  <!-- Middle Left: Live Sales Velocity Graph -->
  <g transform="translate(270, 245)" filter="url(#shadow)">
    <rect width="780" height="340" rx="16" fill="url(#cardGrad)" stroke="#222B42" stroke-width="1.5"/>
    <text x="28" y="42" class="title sans">Real-Time Invoicing &amp; Revenue Velocity</text>
    <text x="28" y="66" class="mono" font-size="13" fill="#8E9BAE">Intraday transaction volume tracked second-by-second across all POS registers</text>

    <!-- Graph Axis Grid Lines -->
    <line x1="50" y1="120" x2="730" y2="120" stroke="#222B42" stroke-width="1" stroke-dasharray="4"/>
    <line x1="50" y1="180" x2="730" y2="180" stroke="#222B42" stroke-width="1" stroke-dasharray="4"/>
    <line x1="50" y1="240" x2="730" y2="240" stroke="#222B42" stroke-width="1" stroke-dasharray="4"/>

    <!-- Y labels -->
    <text x="20" y="125" class="mono" font-size="11" fill="#58657B">100k</text>
    <text x="20" y="185" class="mono" font-size="11" fill="#58657B">50k</text>
    <text x="20" y="245" class="mono" font-size="11" fill="#58657B">0k</text>

    <!-- SVG Area Chart -->
    <path d="M 50,270 L 110,240 L 180,250 L 250,210 L 320,195 L 390,220 L 460,160 L 530,130 L 600,145 L 670,115 L 730,95 L 730,270 Z" fill="url(#chartGrad)"/>
    <path d="M 50,270 L 110,240 L 180,250 L 250,210 L 320,195 L 390,220 L 460,160 L 530,130 L 600,145 L 670,115 L 730,95" fill="none" stroke="#FFB000" stroke-width="3.5" stroke-linecap="round"/>

    <!-- Peak Dot -->
    <circle cx="730" cy="95" r="6" fill="#FFB000"/>
    <circle cx="730" cy="95" r="12" fill="#FFB000" fill-opacity="0.25"/>

    <!-- X labels -->
    <text x="50" y="300" class="mono" font-size="12" fill="#58657B">08:00</text>
    <text x="180" y="300" class="mono" font-size="12" fill="#58657B">10:00</text>
    <text x="320" y="300" class="mono" font-size="12" fill="#58657B">12:00</text>
    <text x="460" y="300" class="mono" font-size="12" fill="#58657B">14:00</text>
    <text x="600" y="300" class="mono" font-size="12" fill="#58657B">16:00</text>
    <text x="700" y="300" class="mono" font-size="12" fill="#FFB000" font-weight="700">NOW (18:00)</text>
  </g>

  <!-- Middle Right: Warehouse Multi-Depot Stock Breakdown -->
  <g transform="translate(1075, 245)" filter="url(#shadow)">
    <rect width="490" height="340" rx="16" fill="url(#cardGrad)" stroke="#222B42" stroke-width="1.5"/>
    <text x="28" y="42" class="title sans">Multi-Warehouse Capacity</text>
    <text x="28" y="66" class="mono" font-size="13" fill="#8E9BAE">Real-time sync between central storage and retail depots</text>

    <!-- Depot 1 -->
    <g transform="translate(28, 95)">
      <text x="0" y="16" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Central Logistics Depot (Colombo 03)</text>
      <text x="375" y="16" class="mono" font-size="14" fill="#00D084" font-weight="700">92% cap</text>
      <rect x="0" y="28" width="430" height="12" rx="6" fill="#1F283D"/>
      <rect x="0" y="28" width="395" height="12" rx="6" fill="#00D084"/>
      <text x="0" y="58" class="mono" font-size="12" fill="#8E9BAE">8,420 items • 4 bays active • Latency: 14ms</text>
    </g>

    <!-- Depot 2 -->
    <g transform="translate(28, 175)">
      <text x="0" y="16" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">North Regional Fulfillment Center</text>
      <text x="375" y="16" class="mono" font-size="14" fill="#FFB000" font-weight="700">76% cap</text>
      <rect x="0" y="28" width="430" height="12" rx="6" fill="#1F283D"/>
      <rect x="0" y="28" width="326" height="12" rx="6" fill="#FFB000"/>
      <text x="0" y="58" class="mono" font-size="12" fill="#8E9BAE">2,810 items • 2 bays active • Latency: 22ms</text>
    </g>

    <!-- Depot 3 -->
    <g transform="translate(28, 255)">
      <text x="0" y="16" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Kandy Express Retail Store POS</text>
      <text x="375" y="16" class="mono" font-size="14" fill="#00A9FF" font-weight="700">48% cap</text>
      <rect x="0" y="28" width="430" height="12" rx="6" fill="#1F283D"/>
      <rect x="0" y="28" width="206" height="12" rx="6" fill="#00A9FF"/>
      <text x="0" y="58" class="mono" font-size="12" fill="#8E9BAE">1,220 items • 2 registers • Latency: 18ms</text>
    </g>
  </g>

  <!-- Bottom: Live Transactions & Barcode Scans Table -->
  <g transform="translate(270, 610)" filter="url(#shadow)">
    <rect width="1295" height="355" rx="16" fill="url(#cardGrad)" stroke="#222B42" stroke-width="1.5"/>
    <text x="28" y="42" class="title sans">Live POS Invoicing Stream</text>
    <text x="28" y="66" class="mono" font-size="13" fill="#8E9BAE">Connected barcode scanners and cashier registers reporting instant sales</text>

    <!-- Table Header -->
    <rect x="28" y="85" width="1240" height="36" rx="6" fill="#121726"/>
    <text x="45" y="108" class="mono" font-size="12" fill="#8E9BAE" font-weight="700">INVOICE #</text>
    <text x="180" y="108" class="mono" font-size="12" fill="#8E9BAE" font-weight="700">TIME</text>
    <text x="300" y="108" class="mono" font-size="12" fill="#8E9BAE" font-weight="700">CUSTOMER / CLIENT</text>
    <text x="600" y="108" class="mono" font-size="12" fill="#8E9BAE" font-weight="700">ITEMS</text>
    <text x="800" y="108" class="mono" font-size="12" fill="#8E9BAE" font-weight="700">PAYMENT</text>
    <text x="980" y="108" class="mono" font-size="12" fill="#8E9BAE" font-weight="700">TOTAL AMOUNT</text>
    <text x="1150" y="108" class="mono" font-size="12" fill="#8E9BAE" font-weight="700">STATUS</text>

    <!-- Row 1 -->
    <g transform="translate(28, 130)">
      <text x="17" y="22" class="mono" font-size="14" fill="#FFFFFF" font-weight="700">#INV-9042</text>
      <text x="152" y="22" class="mono" font-size="13" fill="#8E9BAE">18:04:12</text>
      <text x="272" y="22" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Lanka Super Center (Retail Branch)</text>
      <text x="572" y="22" class="mono" font-size="13" fill="#8E9BAE">14 items (Packaged goods)</text>
      <rect x="765" y="4" width="75" height="24" rx="4" fill="#1C283F"/>
      <text x="777" y="20" class="mono" font-size="11" fill="#00A9FF" font-weight="700">VISA / POS</text>
      <text x="952" y="22" class="mono" font-size="15" fill="#FFB000" font-weight="700">LKR 42,850.00</text>
      <rect x="1115" y="4" width="85" height="24" rx="12" fill="#163828"/>
      <text x="1132" y="20" class="sans" font-size="12" fill="#27C93F" font-weight="700">COMPLETED</text>
      <line x1="0" y1="36" x2="1240" y2="36" stroke="#1D263B" stroke-width="1"/>
    </g>

    <!-- Row 2 -->
    <g transform="translate(28, 175)">
      <text x="17" y="22" class="mono" font-size="14" fill="#FFFFFF" font-weight="700">#INV-9041</text>
      <text x="152" y="22" class="mono" font-size="13" fill="#8E9BAE">18:02:45</text>
      <text x="272" y="22" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Colombo Hardware &amp; Paint Supplies</text>
      <text x="572" y="22" class="mono" font-size="13" fill="#8E9BAE">6 items (Bulk order)</text>
      <rect x="765" y="4" width="85" height="24" rx="4" fill="#222B24"/>
      <text x="777" y="20" class="mono" font-size="11" fill="#27C93F" font-weight="700">BANK TRANS</text>
      <text x="952" y="22" class="mono" font-size="15" fill="#FFB000" font-weight="700">LKR 128,400.00</text>
      <rect x="1115" y="4" width="85" height="24" rx="12" fill="#163828"/>
      <text x="1132" y="20" class="sans" font-size="12" fill="#27C93F" font-weight="700">COMPLETED</text>
      <line x1="0" y1="36" x2="1240" y2="36" stroke="#1D263B" stroke-width="1"/>
    </g>

    <!-- Row 3 -->
    <g transform="translate(28, 220)">
      <text x="17" y="22" class="mono" font-size="14" fill="#FFFFFF" font-weight="700">#INV-9040</text>
      <text x="152" y="22" class="mono" font-size="13" fill="#8E9BAE">18:01:09</text>
      <text x="272" y="22" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Kandy City Grocers Ltd</text>
      <text x="572" y="22" class="mono" font-size="13" fill="#8E9BAE">28 items (Wholesale stock)</text>
      <rect x="765" y="4" width="75" height="24" rx="4" fill="#1C283F"/>
      <text x="777" y="20" class="mono" font-size="11" fill="#00A9FF" font-weight="700">MASTERCARD</text>
      <text x="952" y="22" class="mono" font-size="15" fill="#FFB000" font-weight="700">LKR 89,200.00</text>
      <rect x="1115" y="4" width="85" height="24" rx="12" fill="#163828"/>
      <text x="1132" y="20" class="sans" font-size="12" fill="#27C93F" font-weight="700">COMPLETED</text>
      <line x1="0" y1="36" x2="1240" y2="36" stroke="#1D263B" stroke-width="1"/>
    </g>

    <!-- Row 4 -->
    <g transform="translate(28, 265)">
      <text x="17" y="22" class="mono" font-size="14" fill="#FFFFFF" font-weight="700">#INV-9039</text>
      <text x="152" y="22" class="mono" font-size="13" fill="#8E9BAE">17:58:30</text>
      <text x="272" y="22" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Direct Cash Counter Sale #01</text>
      <text x="572" y="22" class="mono" font-size="13" fill="#8E9BAE">2 items (Beverages)</text>
      <rect x="765" y="4" width="55" height="24" rx="4" fill="#2E2416"/>
      <text x="777" y="20" class="mono" font-size="11" fill="#FFB000" font-weight="700">CASH</text>
      <text x="952" y="22" class="mono" font-size="15" fill="#FFB000" font-weight="700">LKR 3,450.00</text>
      <rect x="1115" y="4" width="85" height="24" rx="12" fill="#163828"/>
      <text x="1132" y="20" class="sans" font-size="12" fill="#27C93F" font-weight="700">COMPLETED</text>
    </g>
  </g>
</svg>
  `;
}

// 2. Sara Multilingual AI Booking Assistant Dashboard
function buildAiBookingDashboard() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="aiBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090D1A"/>
      <stop offset="100%" stop-color="#04060D"/>
    </linearGradient>
    <linearGradient id="aiCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141C30"/>
      <stop offset="100%" stop-color="#0E1322"/>
    </linearGradient>
    <linearGradient id="aiViolet" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6E3FF3"/>
      <stop offset="100%" stop-color="#A259FF"/>
    </linearGradient>
    <linearGradient id="msgAi" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#241B48"/>
      <stop offset="100%" stop-color="#191333"/>
    </linearGradient>
  </defs>

  <style>
    .mono { font-family: 'JetBrains Mono', 'Consolas', monospace; }
    .sans { font-family: 'Figtree', 'Segoe UI', sans-serif; }
    .title { font-weight: 800; font-size: 26px; fill: #FFFFFF; }
    .kpi-val { font-weight: 800; font-size: 32px; fill: #FFFFFF; }
    .kpi-lbl { font-size: 13px; fill: #8E9BAE; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
  </style>

  <rect width="1600" height="1000" fill="url(#aiBg)"/>

  <!-- Top App Window Bar -->
  <rect x="0" y="0" width="1600" height="60" fill="#101728"/>
  <circle cx="35" cy="30" r="7" fill="#FF5F56"/>
  <circle cx="60" cy="30" r="7" fill="#FFBD2E"/>
  <circle cx="85" cy="30" r="7" fill="#27C93F"/>
  <text x="140" y="37" class="mono" font-size="16" fill="#A259FF" font-weight="700">Sara AI Agent Control Console • WhatsApp Cloud API &amp; Calendar Engine</text>

  <rect x="1330" y="16" width="230" height="28" rx="14" fill="#1C2438"/>
  <circle cx="1350" cy="30" r="4" fill="#27C93F"/>
  <text x="1365" y="35" class="mono" font-size="12" fill="#27C93F" font-weight="700">AGENT ONLINE • 0.82s LATENCY</text>

  <!-- Left Column: KPI Cards -->
  <g transform="translate(60, 90)">
    <!-- KPI 1 -->
    <g transform="translate(0, 0)">
      <rect width="420" height="120" rx="14" fill="url(#aiCard)" stroke="#222B42" stroke-width="1.5"/>
      <text x="24" y="36" class="kpi-lbl">Total Appointments Scheduled</text>
      <text x="24" y="78" class="kpi-val mono">1,420</text>
      <rect x="24" y="90" width="135" height="20" rx="10" fill="#163828"/>
      <text x="34" y="104" class="sans" font-size="11" fill="#27C93F" font-weight="700">94.8% Auto-completion</text>
    </g>

    <!-- KPI 2 -->
    <g transform="translate(0, 140)">
      <rect width="420" height="120" rx="14" fill="url(#aiCard)" stroke="#222B42" stroke-width="1.5"/>
      <text x="24" y="36" class="kpi-lbl">Multilingual Language Split</text>
      <text x="24" y="78" class="kpi-val mono" font-size="24">EN (58%) • SI (28%) • TA (14%)</text>
      <rect x="24" y="90" width="145" height="20" rx="10" fill="#2C1B45"/>
      <text x="34" y="104" class="sans" font-size="11" fill="#A259FF" font-weight="700">Zero Translation Loss</text>
    </g>

    <!-- KPI 3 -->
    <g transform="translate(0, 280)">
      <rect width="420" height="120" rx="14" fill="url(#aiCard)" stroke="#222B42" stroke-width="1.5"/>
      <text x="24" y="36" class="kpi-lbl">Intent Recognition Accuracy</text>
      <text x="24" y="78" class="kpi-val mono" fill="#00E5FF">98.6%</text>
      <rect x="24" y="90" width="160" height="20" rx="10" fill="#102E38"/>
      <text x="34" y="104" class="sans" font-size="11" fill="#00E5FF" font-weight="700">RAG Context Verified</text>
    </g>

    <!-- Calendar Sync Preview Widget -->
    <g transform="translate(0, 420)">
      <rect width="420" height="450" rx="16" fill="url(#aiCard)" stroke="#222B42" stroke-width="1.5"/>
      <text x="24" y="38" class="title sans" font-size="20">Calendar Sync Queue</text>
      <text x="24" y="62" class="mono" font-size="12" fill="#8E9BAE">Synced directly to Google Calendar &amp; Outlook</text>

      <!-- Calendar Slot 1 -->
      <rect x="20" y="85" width="380" height="74" rx="10" fill="#171F34" stroke="#2A3859" stroke-width="1"/>
      <text x="36" y="112" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Dr. D. Perera — Dental Consultation</text>
      <text x="36" y="136" class="mono" font-size="12" fill="#A259FF">Tuesday, 10:00 AM • Patient ID: #9812</text>
      <rect x="290" y="100" width="95" height="24" rx="12" fill="#163828"/>
      <text x="306" y="116" class="sans" font-size="11" fill="#27C93F" font-weight="700">CONFIRMED</text>

      <!-- Calendar Slot 2 -->
      <rect x="20" y="175" width="380" height="74" rx="10" fill="#171F34" stroke="#2A3859" stroke-width="1"/>
      <text x="36" y="202" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Legal Advisory — Estate Planning</text>
      <text x="36" y="226" class="mono" font-size="12" fill="#A259FF">Tuesday, 02:30 PM • Client: #4102</text>
      <rect x="290" y="190" width="95" height="24" rx="12" fill="#163828"/>
      <text x="306" y="206" class="sans" font-size="11" fill="#27C93F" font-weight="700">CONFIRMED</text>

      <!-- Calendar Slot 3 -->
      <rect x="20" y="265" width="380" height="74" rx="10" fill="#171F34" stroke="#2A3859" stroke-width="1"/>
      <text x="36" y="292" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Studio Photoshoot — 2 Hr Session</text>
      <text x="36" y="316" class="mono" font-size="12" fill="#A259FF">Wednesday, 11:00 AM • Booker: #7721</text>
      <rect x="290" y="280" width="95" height="24" rx="12" fill="#163828"/>
      <text x="306" y="296" class="sans" font-size="11" fill="#27C93F" font-weight="700">CONFIRMED</text>

      <!-- Calendar Slot 4 -->
      <rect x="20" y="355" width="380" height="74" rx="10" fill="#171F34" stroke="#2A3859" stroke-width="1"/>
      <text x="36" y="382" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Automotive Service Inspection</text>
      <text x="36" y="406" class="mono" font-size="12" fill="#A259FF">Thursday, 09:15 AM • Vehicle: CAB-4412</text>
      <rect x="290" y="370" width="95" height="24" rx="12" fill="#163828"/>
      <text x="306" y="386" class="sans" font-size="11" fill="#27C93F" font-weight="700">CONFIRMED</text>
    </g>
  </g>

  <!-- Right Column: Live WhatsApp Interactive Conversation Stream -->
  <g transform="translate(510, 90)">
    <rect width="1030" height="780" rx="18" fill="url(#aiCard)" stroke="#222B42" stroke-width="1.5"/>

    <!-- Conversation Header -->
    <rect x="0" y="0" width="1030" height="70" rx="18" fill="#151D33"/>
    <circle cx="45" cy="35" r="20" fill="#25D366"/>
    <!-- WhatsApp phone icon inside -->
    <path d="M 40,28 A 9,9 0 0,1 50,38 L 51,43 L 46,42 Z" fill="#FFF"/>
    <text x="80" y="32" class="sans" font-size="17" fill="#FFFFFF" font-weight="800">Sara AI Booking Assistant (WhatsApp Channel)</text>
    <text x="80" y="52" class="mono" font-size="12" fill="#25D366">● Active Session with +94 77 124 8892 • Intent: Booking Scheduling</text>

    <!-- Message 1: User -->
    <g transform="translate(580, 105)">
      <rect width="410" height="56" rx="12" fill="#1B2640" stroke="#2B3A60" stroke-width="1"/>
      <text x="20" y="34" class="sans" font-size="15" fill="#FFFFFF">Hi Sara, I'd like to book an appointment next week.</text>
      <text x="345" y="48" class="mono" font-size="10" fill="#71829B">14:20</text>
    </g>

    <!-- Message 2: Sara AI -->
    <g transform="translate(40, 185)">
      <rect width="580" height="96" rx="14" fill="url(#msgAi)" stroke="#6E3FF3" stroke-width="1.5"/>
      <text x="24" y="32" class="sans" font-size="15" fill="#FFFFFF">Hello! I can help you schedule that right away. 😊</text>
      <text x="24" y="56" class="sans" font-size="15" fill="#FFFFFF">We have slots open on Tuesday (Nov 4) at 10:00 AM, 2:30 PM,</text>
      <text x="24" y="80" class="sans" font-size="15" fill="#FFFFFF">or Wednesday (Nov 5) at 11:00 AM. Which time works best?</text>
      <text x="515" y="88" class="mono" font-size="10" fill="#A259FF">14:20 • Sara AI</text>
    </g>

    <!-- Message 3: User in Sinhala -->
    <g transform="translate(640, 305)">
      <rect width="350" height="56" rx="12" fill="#1B2640" stroke="#2B3A60" stroke-width="1"/>
      <text x="20" y="34" class="sans" font-size="15" fill="#FFFFFF">Tuesday 2:30 PM mata puluwanda?</text>
      <text x="285" y="48" class="mono" font-size="10" fill="#71829B">14:21</text>
    </g>

    <!-- Message 4: Sara AI Auto-translates & confirms slot -->
    <g transform="translate(40, 385)">
      <rect width="640" height="120" rx="14" fill="url(#msgAi)" stroke="#6E3FF3" stroke-width="1.5"/>
      <text x="24" y="32" class="sans" font-size="15" fill="#FFFFFF">ඔව්, අනිවාර්යයෙන්ම! (Yes, absolutely!)</text>
      <text x="24" y="56" class="sans" font-size="15" fill="#FFFFFF">Tuesday, Nov 4 at 2:30 PM is reserved for you.</text>
      <text x="24" y="80" class="sans" font-size="15" fill="#FFFFFF">Could you please share your full name and email for the</text>
      <text x="24" y="104" class="sans" font-size="15" fill="#FFFFFF">calendar invitation?</text>
      <text x="575" y="112" class="mono" font-size="10" fill="#A259FF">14:21 • Sara AI</text>
    </g>

    <!-- Message 5: User details -->
    <g transform="translate(620, 525)">
      <rect width="370" height="56" rx="12" fill="#1B2640" stroke="#2B3A60" stroke-width="1"/>
      <text x="20" y="34" class="sans" font-size="15" fill="#FFFFFF">Arkesh Prashanth, arkesh@example.com</text>
      <text x="305" y="48" class="mono" font-size="10" fill="#71829B">14:22</text>
    </g>

    <!-- Message 6: Final Booking Confirmation Card from Sara -->
    <g transform="translate(40, 600)">
      <rect width="680" height="150" rx="14" fill="#172338" stroke="#00E5FF" stroke-width="2"/>
      <text x="24" y="34" class="sans" font-size="16" fill="#00E5FF" font-weight="800">✅ APPOINTMENT CONFIRMED #BK-9024</text>
      <text x="24" y="64" class="sans" font-size="14" fill="#FFFFFF">Name: Arkesh Prashanth • Channel: WhatsApp</text>
      <text x="24" y="88" class="sans" font-size="14" fill="#FFFFFF">Date &amp; Time: Tuesday, November 4, 2026 at 2:30 PM</text>
      <text x="24" y="112" class="sans" font-size="14" fill="#FFFFFF">Calendar invite and SMS reminders have been dispatched automatically.</text>
      <text x="24" y="136" class="mono" font-size="12" fill="#27C93F">Status: Synced with Google Calendar API • Zero Manual Intervention</text>
    </g>
  </g>
</svg>
  `;
}

// 3. AquaPulse Smart Water Meter IoT Telemetry Dashboard
function buildWaterMeterDashboard() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="iotBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07121E"/>
      <stop offset="100%" stop-color="#03080F"/>
    </linearGradient>
    <linearGradient id="iotCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0E2235"/>
      <stop offset="100%" stop-color="#081726"/>
    </linearGradient>
    <linearGradient id="waterFlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00A9FF" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#00A9FF" stop-opacity="0.0"/>
    </linearGradient>
  </defs>

  <style>
    .mono { font-family: 'JetBrains Mono', 'Consolas', monospace; }
    .sans { font-family: 'Figtree', 'Segoe UI', sans-serif; }
    .title { font-weight: 800; font-size: 26px; fill: #FFFFFF; }
    .kpi-val { font-weight: 800; font-size: 34px; fill: #FFFFFF; }
    .kpi-lbl { font-size: 13px; fill: #7FB3D5; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
  </style>

  <rect width="1600" height="1000" fill="url(#iotBg)"/>

  <!-- Top App Window Bar -->
  <rect x="0" y="0" width="1600" height="60" fill="#0C1F33"/>
  <circle cx="35" cy="30" r="7" fill="#FF5F56"/>
  <circle cx="60" cy="30" r="7" fill="#FFBD2E"/>
  <circle cx="85" cy="30" r="7" fill="#27C93F"/>
  <text x="140" y="37" class="mono" font-size="16" fill="#00A9FF" font-weight="700">AquaPulse IoT Water Telemetry Cloud • Ultrasonic Flow Sensing &amp; Leak Defense</text>
  <rect x="1330" y="16" width="230" height="28" rx="14" fill="#081524"/>
  <circle cx="1350" cy="30" r="4" fill="#27C93F"/>
  <text x="1365" y="35" class="mono" font-size="12" fill="#27C93F" font-weight="700">LORAWAN GATEWAY CONNECTED</text>

  <!-- Top Row: 4 Telemetry Gauge Cards -->
  <!-- 1. Real-time Flow Rate -->
  <g transform="translate(60, 85)">
    <rect width="350" height="140" rx="14" fill="url(#iotCard)" stroke="#163C5C" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Current Flow Rate</text>
    <text x="24" y="86" class="kpi-val mono" fill="#00A9FF">24.6 <tspan font-size="20">L/min</tspan></text>
    <text x="24" y="118" class="mono" font-size="12" fill="#00D084">● Ultrasonic Sensor Active</text>
  </g>

  <!-- 2. Today Consumption -->
  <g transform="translate(440, 85)">
    <rect width="350" height="140" rx="14" fill="url(#iotCard)" stroke="#163C5C" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Today's Consumption</text>
    <text x="24" y="86" class="kpi-val mono">382 <tspan font-size="20">Liters</tspan></text>
    <text x="24" y="118" class="mono" font-size="12" fill="#7FB3D5">Estimated Bill: LKR 142.50</text>
  </g>

  <!-- 3. Line Pressure -->
  <g transform="translate(820, 85)">
    <rect width="350" height="140" rx="14" fill="url(#iotCard)" stroke="#163C5C" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Line Pressure</text>
    <text x="24" y="86" class="kpi-val mono" fill="#00D084">48.2 <tspan font-size="20">PSI</tspan></text>
    <text x="24" y="118" class="mono" font-size="12" fill="#00D084">Optimal Operating Range</text>
  </g>

  <!-- 4. Solenoid Valve Status -->
  <g transform="translate(1200, 85)">
    <rect width="340" height="140" rx="14" fill="url(#iotCard)" stroke="#163C5C" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Motorized Shutoff Valve</text>
    <text x="24" y="86" class="kpi-val mono" fill="#27C93F">OPEN</text>
    <text x="24" y="118" class="mono" font-size="12" fill="#7FB3D5">Auto-Shutoff Ready (Leak Arm)</text>
  </g>

  <!-- Flow Rate Telemetry Curve -->
  <g transform="translate(60, 255)">
    <rect width="1020" height="420" rx="16" fill="url(#iotCard)" stroke="#163C5C" stroke-width="1.5"/>
    <text x="28" y="42" class="title sans">High-Frequency Flow Velocity &amp; Pressure Curve</text>
    <text x="28" y="66" class="mono" font-size="13" fill="#7FB3D5">Telemetry sampled every 500ms via LoRaWAN RF network</text>

    <!-- Grid -->
    <line x1="50" y1="120" x2="970" y2="120" stroke="#163C5C" stroke-width="1" stroke-dasharray="4"/>
    <line x1="50" y1="200" x2="970" y2="200" stroke="#163C5C" stroke-width="1" stroke-dasharray="4"/>
    <line x1="50" y1="280" x2="970" y2="280" stroke="#163C5C" stroke-width="1" stroke-dasharray="4"/>

    <!-- Y labels -->
    <text x="15" y="125" class="mono" font-size="11" fill="#7FB3D5">40 L/m</text>
    <text x="15" y="205" class="mono" font-size="11" fill="#7FB3D5">20 L/m</text>
    <text x="15" y="285" class="mono" font-size="11" fill="#7FB3D5">0 L/m</text>

    <!-- Curve -->
    <path d="M 50,330 L 120,330 L 200,310 L 280,180 L 360,150 L 440,240 L 520,320 L 600,300 L 680,260 L 760,160 L 840,140 L 920,210 L 970,195 L 970,350 L 50,350 Z" fill="url(#waterFlowGrad)"/>
    <path d="M 50,330 L 120,330 L 200,310 L 280,180 L 360,150 L 440,240 L 520,320 L 600,300 L 680,260 L 760,160 L 840,140 L 920,210 L 970,195" fill="none" stroke="#00A9FF" stroke-width="4" stroke-linecap="round"/>

    <circle cx="970" cy="195" r="7" fill="#00A9FF"/>
    <circle cx="970" cy="195" r="14" fill="#00A9FF" fill-opacity="0.3"/>

    <!-- X labels -->
    <text x="50" y="380" class="mono" font-size="12" fill="#7FB3D5">00:00</text>
    <text x="250" y="380" class="mono" font-size="12" fill="#7FB3D5">06:00 (Morning Rush)</text>
    <text x="500" y="380" class="mono" font-size="12" fill="#7FB3D5">12:00 (Noon)</text>
    <text x="750" y="380" class="mono" font-size="12" fill="#7FB3D5">18:00 (Evening Peak)</text>
    <text x="910" y="380" class="mono" font-size="12" fill="#00A9FF" font-weight="700">CURRENT (LIVE)</text>
  </g>

  <!-- Right: Leak Detection & Device Health Status -->
  <g transform="translate(1110, 255)">
    <rect width="430" height="420" rx="16" fill="url(#iotCard)" stroke="#163C5C" stroke-width="1.5"/>
    <text x="28" y="42" class="title sans" font-size="22">Acoustic Leak Guard</text>
    <text x="28" y="66" class="mono" font-size="12" fill="#7FB3D5">Continuous pipe vibration anomaly AI</text>

    <!-- Status Shield -->
    <rect x="28" y="90" width="374" height="80" rx="12" fill="#0C253B" stroke="#00D084" stroke-width="1.5"/>
    <text x="48" y="125" class="sans" font-size="16" fill="#00D084" font-weight="800">🛡️ NO LEAKS DETECTED</text>
    <text x="48" y="150" class="mono" font-size="12" fill="#7FB3D5">Zero drop-pressure signatures detected in 48 hrs</text>

    <!-- Diagnostics list -->
    <g transform="translate(28, 195)">
      <text x="0" y="20" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Battery Level (LiFePO4 Solar)</text>
      <text x="320" y="20" class="mono" font-size="14" fill="#00D084" font-weight="700">96% (3.34V)</text>

      <text x="0" y="60" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">LoRaWAN RF Signal (RSSI)</text>
      <text x="320" y="60" class="mono" font-size="14" fill="#00A9FF" font-weight="700">-84 dBm</text>

      <text x="0" y="100" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Water Temperature</text>
      <text x="320" y="100" class="mono" font-size="14" fill="#FFFFFF" font-weight="700">24.2 °C</text>

      <text x="0" y="140" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Firmware Build</text>
      <text x="320" y="140" class="mono" font-size="14" fill="#7FB3D5">v2.14-OTA</text>

      <text x="0" y="180" class="sans" font-size="14" fill="#FFFFFF" font-weight="600">Tamper &amp; Reverse Flow Sensor</text>
      <text x="320" y="180" class="mono" font-size="14" fill="#00D084">OK (Normal)</text>
    </g>
  </g>

  <!-- Bottom Log Feed -->
  <g transform="translate(60, 705)">
    <rect width="1480" height="260" rx="16" fill="url(#iotCard)" stroke="#163C5C" stroke-width="1.5"/>
    <text x="28" y="40" class="title sans" font-size="20">Live Telemetry Packet Stream</text>
    <text x="28" y="64" class="mono" font-size="12" fill="#7FB3D5">Encrypted payload decoded from node: 0x88F2-AquaPulse</text>

    <!-- Terminal Lines -->
    <rect x="28" y="80" width="1424" height="155" rx="10" fill="#071320"/>
    <text x="45" y="112" class="mono" font-size="13" fill="#00D084">[18:05:42.204] LORAWAN RX: pkt_id=482109 rssi=-84 snr=9.2 dev_eui=70B3D57ED0054802</text>
    <text x="45" y="137" class="mono" font-size="13" fill="#FFFFFF">[18:05:42.205] TELEMETRY PARSED: flow_rate=24.60L/m pressure=48.20psi temp=24.2C total_liters=382.41L</text>
    <text x="45" y="162" class="mono" font-size="13" fill="#00A9FF">[18:05:42.206] CLOUD SYNC: Published to AWS IoT Core topic: ralypto/aquapulse/AP-8802/telemetry [200 OK]</text>
    <text x="45" y="187" class="mono" font-size="13" fill="#FFB000">[18:05:42.207] LEAK ENGINE: Fourier acoustic frequency analysis = PASS (0 anomaly peaks detected)</text>
    <text x="45" y="212" class="mono" font-size="13" fill="#7FB3D5">[18:05:42.208] BATTERY STATUS: Vcell=3.34V (96%) Charge_state=Float Charging via Solar harvesting</text>
  </g>
</svg>
  `;
}

// 4. Kopi & Co Specialty Cafe Brand & Packaging Visual Showcase
function buildCafeBrandShowcase() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="cafeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1512"/>
      <stop offset="100%" stop-color="#0E0B09"/>
    </linearGradient>
    <linearGradient id="pouchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#241E1A"/>
      <stop offset="50%" stop-color="#332B25"/>
      <stop offset="100%" stop-color="#1C1713"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD700"/>
      <stop offset="50%" stop-color="#E5A823"/>
      <stop offset="100%" stop-color="#B8860B"/>
    </linearGradient>
    <filter id="pouchShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <style>
    .serif { font-family: 'Instrument Serif', 'Georgia', serif; }
    .sans { font-family: 'Figtree', 'Segoe UI', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>

  <rect width="1600" height="1000" fill="url(#cafeBg)"/>

  <!-- Subtle Studio Brand Grid Lines -->
  <line x1="100" y1="0" x2="100" y2="1000" stroke="#2B221B" stroke-width="1" stroke-dasharray="4"/>
  <line x1="1500" y1="0" x2="1500" y2="1000" stroke="#2B221B" stroke-width="1" stroke-dasharray="4"/>
  <line x1="0" y1="100" x2="1600" y2="100" stroke="#2B221B" stroke-width="1" stroke-dasharray="4"/>
  <line x1="0" y1="900" x2="1600" y2="900" stroke="#2B221B" stroke-width="1" stroke-dasharray="4"/>

  <!-- Left: Brand Identity Board & Logo Lockup -->
  <g transform="translate(140, 140)">
    <rect x="0" y="0" width="100" height="26" rx="13" fill="#3D3025"/>
    <text x="14" y="18" class="mono" font-size="12" fill="#E5A823" font-weight="700">BRAND IDENTITY &amp; PACKAGING</text>

    <text x="0" y="100" class="serif" font-size="76" fill="#F8F4EC" font-style="italic">Kopi &amp; Co.</text>
    <text x="0" y="145" class="sans" font-size="20" fill="#E5A823" font-weight="700" letter-spacing="4">SPECIALTY ARTISAN COFFEE ROASTERS</text>
    <text x="0" y="195" class="sans" font-size="16" fill="#A89A8E" max-width="500">
      Single-origin Ceylon Arabica beans roasted in small batches in Nuwara Eliya.
    </text>
    <text x="0" y="225" class="sans" font-size="16" fill="#A89A8E">
      Complete creative identity: Custom gold-foil coffee packaging, typography,
    </text>
    <text x="0" y="255" class="sans" font-size="16" fill="#A89A8E">
      storefront menu boards, branded cups, and retail merchandise collateral.
    </text>

    <!-- Color Palette Swatches -->
    <text x="0" y="325" class="mono" font-size="13" fill="#F8F4EC" font-weight="700">BRAND PALETTE SPECIFICATION:</text>
    <g transform="translate(0, 345)">
      <circle cx="25" cy="25" r="24" fill="#1C1713" stroke="#4D3E33" stroke-width="2"/>
      <text x="10" y="70" class="mono" font-size="11" fill="#A89A8E">#1C1713</text>
      <text x="6" y="86" class="sans" font-size="12" fill="#FFF" font-weight="600">Espresso</text>

      <circle cx="105" cy="25" r="24" fill="#E5A823" stroke="#FFF" stroke-width="1"/>
      <text x="90" y="70" class="mono" font-size="11" fill="#A89A8E">#E5A823</text>
      <text x="86" y="86" class="sans" font-size="12" fill="#FFF" font-weight="600">Warm Gold</text>

      <circle cx="185" cy="25" r="24" fill="#F8F4EC" stroke="#4D3E33" stroke-width="1"/>
      <text x="170" y="70" class="mono" font-size="11" fill="#A89A8E">#F8F4EC</text>
      <text x="170" y="86" class="sans" font-size="12" fill="#FFF" font-weight="600">Cream</text>

      <circle cx="265" cy="25" r="24" fill="#8B4513" stroke="#4D3E33" stroke-width="1"/>
      <text x="250" y="70" class="mono" font-size="11" fill="#A89A8E">#8B4513</text>
      <text x="250" y="86" class="sans" font-size="12" fill="#FFF" font-weight="600">Cinnamon</text>
    </g>

    <!-- Typography Specs -->
    <g transform="translate(0, 485)">
      <rect width="480" height="180" rx="12" fill="#1A1410" stroke="#33271E" stroke-width="1.5"/>
      <text x="25" y="35" class="mono" font-size="12" fill="#E5A823" font-weight="700">TYPE ARCHITECTURE</text>
      <text x="25" y="75" class="serif" font-size="32" fill="#FFF" font-style="italic">Instrument Serif Display</text>
      <text x="25" y="115" class="sans" font-size="18" fill="#FFF" font-weight="700">Figtree Grotesque Headlines</text>
      <text x="25" y="145" class="mono" font-size="14" fill="#A89A8E">JetBrains Mono Specifications &amp; Weights</text>
    </g>
  </g>

  <!-- Right: Realistic 3D Mockup of Coffee Bag & Cup -->
  <!-- Coffee Pouch Mockup -->
  <g transform="translate(860, 130)" filter="url(#pouchShadow)">
    <!-- Bag Silhouette -->
    <path d="M 60,30 L 380,30 L 420,680 L 20,680 Z" fill="url(#pouchGrad)" stroke="#45382E" stroke-width="1.5"/>
    <!-- Fold and seal lines -->
    <line x1="60" y1="65" x2="380" y2="65" stroke="#15110E" stroke-width="3"/>
    <line x1="60" y1="67" x2="380" y2="67" stroke="#4A3B31" stroke-width="1"/>

    <!-- Foil Label -->
    <rect x="75" y="150" width="290" height="380" rx="8" fill="#14100D" stroke="url(#goldGrad)" stroke-width="2"/>

    <!-- Emblem -->
    <circle cx="220" cy="225" r="45" fill="none" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <text x="220" y="235" text-anchor="middle" class="serif" font-size="38" fill="url(#goldGrad)" font-style="italic">K</text>

    <text x="220" y="300" text-anchor="middle" class="serif" font-size="36" fill="#F8F4EC" font-style="italic">Kopi &amp; Co.</text>
    <text x="220" y="325" text-anchor="middle" class="sans" font-size="11" fill="url(#goldGrad)" font-weight="700" letter-spacing="3">SINGLE ORIGIN CEYLON</text>

    <line x1="110" y1="350" x2="330" y2="350" stroke="#382C23" stroke-width="1"/>

    <!-- Roast details -->
    <text x="220" y="380" text-anchor="middle" class="mono" font-size="12" fill="#E5A823">NUWARA ELIYA HIGHLANDS</text>
    <text x="220" y="405" text-anchor="middle" class="sans" font-size="13" fill="#A89A8E">Elevation: 1,890m • Washed Process</text>
    <text x="220" y="430" text-anchor="middle" class="sans" font-size="13" fill="#A89A8E">Tasting Notes: Dark Cocoa, Wild Honey, Citrus</text>
    <text x="220" y="475" text-anchor="middle" class="mono" font-size="14" fill="#F8F4EC" font-weight="700">NET WT. 250G / 8.8 OZ</text>

    <!-- Valve Icon on pouch -->
    <circle cx="220" cy="105" r="8" fill="#1A1512" stroke="#4A3B31" stroke-width="1"/>
    <circle cx="220" cy="105" r="3" fill="#0C0A08"/>
  </g>

  <!-- Takeaway Coffee Cup Beside Bag -->
  <g transform="translate(1220, 360)" filter="url(#pouchShadow)">
    <path d="M 30,0 L 210,0 L 180,380 L 60,380 Z" fill="#F8F4EC" stroke="#DDD" stroke-width="1"/>
    <!-- Lid -->
    <path d="M 20,-25 L 220,-25 L 215,0 L 25,0 Z" fill="#241E1A"/>

    <!-- Cup Sleeve -->
    <path d="M 38,110 L 202,110 L 188,270 L 52,270 Z" fill="#241E1A"/>
    <text x="120" y="185" text-anchor="middle" class="serif" font-size="28" fill="url(#goldGrad)" font-style="italic">Kopi &amp; Co.</text>
    <text x="120" y="210" text-anchor="middle" class="sans" font-size="9" fill="#FFF" font-weight="700" letter-spacing="2">EST. 2026</text>
  </g>
</svg>
  `;
}

// 5. Thread Lane Campaign Performance & Ad Analytics Dashboard
function buildLaunchCampaignDashboard() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="campBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140A18"/>
      <stop offset="100%" stop-color="#08030B"/>
    </linearGradient>
    <linearGradient id="campCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#24102C"/>
      <stop offset="100%" stop-color="#180B1E"/>
    </linearGradient>
    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF2E93"/>
      <stop offset="100%" stop-color="#FF75C3"/>
    </linearGradient>
    <linearGradient id="roasArea" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF2E93" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#FF2E93" stop-opacity="0.0"/>
    </linearGradient>
  </defs>

  <style>
    .mono { font-family: 'JetBrains Mono', monospace; }
    .sans { font-family: 'Figtree', 'Segoe UI', sans-serif; }
    .title { font-weight: 800; font-size: 26px; fill: #FFFFFF; }
    .kpi-val { font-weight: 800; font-size: 34px; fill: #FFFFFF; }
    .kpi-lbl { font-size: 13px; fill: #D697E0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
  </style>

  <rect width="1600" height="1000" fill="url(#campBg)"/>

  <!-- Top App Window Bar -->
  <rect x="0" y="0" width="1600" height="60" fill="#1E0D24"/>
  <circle cx="35" cy="30" r="7" fill="#FF5F56"/>
  <circle cx="60" cy="30" r="7" fill="#FFBD2E"/>
  <circle cx="85" cy="30" r="7" fill="#27C93F"/>
  <text x="140" y="37" class="mono" font-size="16" fill="#FF2E93" font-weight="700">Thread Lane 30-Day Brand Launch Campaign • Performance &amp; Ad Creative Engine</text>

  <rect x="1330" y="16" width="230" height="28" rx="14" fill="#31143A"/>
  <circle cx="1350" cy="30" r="4" fill="#27C93F"/>
  <text x="1365" y="35" class="mono" font-size="12" fill="#FF75C3" font-weight="700">CAMPAIGN ACTIVE • DAY 28/30</text>

  <!-- Top Metrics Row -->
  <!-- Metric 1: Total Reach -->
  <g transform="translate(60, 85)">
    <rect width="350" height="140" rx="14" fill="url(#campCard)" stroke="#451E52" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Total Impressions</text>
    <text x="24" y="86" class="kpi-val mono">1,248,900</text>
    <text x="24" y="118" class="sans" font-size="13" fill="#27C93F" font-weight="700">▲ +340% organic virality</text>
  </g>

  <!-- Metric 2: Blended ROAS -->
  <g transform="translate(440, 85)">
    <rect width="350" height="140" rx="14" fill="url(#campCard)" stroke="#451E52" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Blended Return on Ad Spend</text>
    <text x="24" y="86" class="kpi-val mono" fill="#FF2E93">4.82x <tspan font-size="18">ROAS</tspan></text>
    <text x="24" y="118" class="sans" font-size="13" fill="#00D084">Meta Ads + TikTok Spark</text>
  </g>

  <!-- Metric 3: Online Store Revenue -->
  <g transform="translate(820, 85)">
    <rect width="350" height="140" rx="14" fill="url(#campCard)" stroke="#451E52" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Launch Storefront Revenue</text>
    <text x="24" y="86" class="kpi-val mono" fill="#FFD700">LKR 3.42M</text>
    <text x="24" y="118" class="sans" font-size="13" fill="#00D084">910 Apparel Units Shipped</text>
  </g>

  <!-- Metric 4: Conversion Rate -->
  <g transform="translate(1200, 85)">
    <rect width="340" height="140" rx="14" fill="url(#campCard)" stroke="#451E52" stroke-width="1.5"/>
    <text x="24" y="38" class="kpi-lbl">Storefront Conversion</text>
    <text x="24" y="86" class="kpi-val mono" fill="#00E5FF">3.84%</text>
    <text x="24" y="118" class="sans" font-size="13" fill="#00E5FF">Industry Benchmark: 1.8%</text>
  </g>

  <!-- Campaign Performance Trajectory Chart -->
  <g transform="translate(60, 255)">
    <rect width="980" height="420" rx="16" fill="url(#campCard)" stroke="#451E52" stroke-width="1.5"/>
    <text x="28" y="42" class="title sans">30-Day Conversion Velocity &amp; Ad Creative Scale</text>
    <text x="28" y="66" class="mono" font-size="13" fill="#D697E0">Daily revenue ramp vs targeted advertising expenditure across Meta &amp; TikTok</text>

    <!-- Grid -->
    <line x1="50" y1="120" x2="930" y2="120" stroke="#361740" stroke-width="1" stroke-dasharray="4"/>
    <line x1="50" y1="200" x2="930" y2="200" stroke="#361740" stroke-width="1" stroke-dasharray="4"/>
    <line x1="50" y1="280" x2="930" y2="280" stroke="#361740" stroke-width="1" stroke-dasharray="4"/>

    <path d="M 50,330 L 120,320 L 200,305 L 280,260 L 360,240 L 440,210 L 520,170 L 600,160 L 680,120 L 760,110 L 840,80 L 930,65 L 930,350 L 50,350 Z" fill="url(#roasArea)"/>
    <path d="M 50,330 L 120,320 L 200,305 L 280,260 L 360,240 L 440,210 L 520,170 L 600,160 L 680,120 L 760,110 L 840,80 L 930,65" fill="none" stroke="#FF2E93" stroke-width="4" stroke-linecap="round"/>

    <circle cx="930" cy="65" r="7" fill="#FF2E93"/>
    <circle cx="930" cy="65" r="14" fill="#FF2E93" fill-opacity="0.3"/>

    <!-- Labels -->
    <text x="50" y="380" class="mono" font-size="12" fill="#D697E0">Day 1 (Teaser Drop)</text>
    <text x="270" y="380" class="mono" font-size="12" fill="#D697E0">Day 10 (Influencer Push)</text>
    <text x="560" y="380" class="mono" font-size="12" fill="#D697E0">Day 20 (TikTok Viral Video)</text>
    <text x="820" y="380" class="mono" font-size="12" fill="#FF2E93" font-weight="700">Day 30 (LKR 3.4M Peak)</text>
  </g>

  <!-- Right: Top Performing Ad Creatives -->
  <g transform="translate(1070, 255)">
    <rect width="470" height="420" rx="16" fill="url(#campCard)" stroke="#451E52" stroke-width="1.5"/>
    <text x="28" y="42" class="title sans" font-size="22">Top Converting Ad Assets</text>
    <text x="28" y="66" class="mono" font-size="12" fill="#D697E0">High-converting 9:16 reels &amp; motion graphics</text>

    <!-- Creative 1 -->
    <rect x="24" y="90" width="422" height="90" rx="12" fill="#1C0C22" stroke="#3D1A48" stroke-width="1"/>
    <rect x="36" y="102" width="66" height="66" rx="8" fill="#FF2E93"/>
    <text x="69" y="142" text-anchor="middle" font-size="24">🎬</text>
    <text x="115" y="125" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Lookbook Reel 01: Streetwear Edit</text>
    <text x="115" y="147" class="mono" font-size="12" fill="#FF75C3">TikTok Spark Ad • 482k Views • 5.4x ROAS</text>

    <!-- Creative 2 -->
    <rect x="24" y="195" width="422" height="90" rx="12" fill="#1C0C22" stroke="#3D1A48" stroke-width="1"/>
    <rect x="36" y="207" width="66" height="66" rx="8" fill="#A259FF"/>
    <text x="69" y="247" text-anchor="middle" font-size="24">👕</text>
    <text x="115" y="230" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Product Spotlight: Heavyweight Hoodie</text>
    <text x="115" y="252" class="mono" font-size="12" fill="#A259FF">Instagram Carousel • 28k Clicks • 4.6x ROAS</text>

    <!-- Creative 3 -->
    <rect x="24" y="300" width="422" height="90" rx="12" fill="#1C0C22" stroke="#3D1A48" stroke-width="1"/>
    <rect x="36" y="312" width="66" height="66" rx="8" fill="#00E5FF"/>
    <text x="69" y="352" text-anchor="middle" font-size="24">⚡</text>
    <text x="115" y="335" class="sans" font-size="15" fill="#FFFFFF" font-weight="700">Founder Story &amp; Behind The Craft</text>
    <text x="115" y="357" class="mono" font-size="12" fill="#00E5FF">Meta Video Ad • 190k Views • 4.2x ROAS</text>
  </g>

  <!-- Bottom Channel Breakdown Table -->
  <g transform="translate(60, 705)">
    <rect width="1480" height="260" rx="16" fill="url(#campCard)" stroke="#451E52" stroke-width="1.5"/>
    <text x="28" y="40" class="title sans" font-size="20">Multi-Channel Attribution &amp; Conversion Breakdown</text>
    <text x="28" y="64" class="mono" font-size="12" fill="#D697E0">Consolidated analytics across Meta Ads, TikTok, Influencer Affiliate Links, and Email Flow</text>

    <rect x="28" y="85" width="1424" height="34" rx="6" fill="#190B1E"/>
    <text x="45" y="107" class="mono" font-size="12" fill="#D697E0" font-weight="700">MARKETING CHANNEL</text>
    <text x="350" y="107" class="mono" font-size="12" fill="#D697E0" font-weight="700">TOTAL SPEND</text>
    <text x="580" y="107" class="mono" font-size="12" fill="#D697E0" font-weight="700">STORE IMPRESSIONS</text>
    <text x="850" y="107" class="mono" font-size="12" fill="#D697E0" font-weight="700">PURCHASES</text>
    <text x="1080" y="107" class="mono" font-size="12" fill="#D697E0" font-weight="700">REVENUE GENERATED</text>
    <text x="1350" y="107" class="mono" font-size="12" fill="#D697E0" font-weight="700">ROAS</text>

    <!-- Channel 1 -->
    <g transform="translate(28, 130)">
      <text x="17" y="20" class="sans" font-size="14" fill="#FFFFFF" font-weight="700">Meta Ads (Instagram / Facebook)</text>
      <text x="322" y="20" class="mono" font-size="14" fill="#8E9BAE">LKR 420,000</text>
      <text x="552" y="20" class="mono" font-size="14" fill="#8E9BAE">680,400</text>
      <text x="822" y="20" class="mono" font-size="14" fill="#8E9BAE">512 orders</text>
      <text x="1052" y="20" class="mono" font-size="14" fill="#27C93F" font-weight="700">LKR 2,140,000</text>
      <text x="1322" y="20" class="mono" font-size="14" fill="#FF2E93" font-weight="700">5.09x</text>
      <line x1="0" y1="34" x2="1424" y2="34" stroke="#2B1233" stroke-width="1"/>
    </g>

    <!-- Channel 2 -->
    <g transform="translate(28, 175)">
      <text x="17" y="20" class="sans" font-size="14" fill="#FFFFFF" font-weight="700">TikTok Spark &amp; Influencer UGC</text>
      <text x="322" y="20" class="mono" font-size="14" fill="#8E9BAE">LKR 210,000</text>
      <text x="552" y="20" class="mono" font-size="14" fill="#8E9BAE">442,100</text>
      <text x="822" y="20" class="mono" font-size="14" fill="#8E9BAE">298 orders</text>
      <text x="1052" y="20" class="mono" font-size="14" fill="#27C93F" font-weight="700">LKR 980,000</text>
      <text x="1322" y="20" class="mono" font-size="14" fill="#FF2E93" font-weight="700">4.66x</text>
    </g>
  </g>
</svg>
  `;
}

async function main() {
  console.log("Generating high-resolution project dashboard screenshots...");
  await saveSvgAsPng(buildStockLineDashboard(), "shop-erp-dashboard.png");
  await saveSvgAsPng(buildAiBookingDashboard(), "booking-agent-dashboard.png");
  await saveSvgAsPng(buildWaterMeterDashboard(), "water-meter-dashboard.png");
  await saveSvgAsPng(buildCafeBrandShowcase(), "cafe-brand-identity.png");
  await saveSvgAsPng(buildLaunchCampaignDashboard(), "launch-campaign-dashboard.png");
  console.log("All project screenshots generated successfully!");
}

main().catch(console.error);

