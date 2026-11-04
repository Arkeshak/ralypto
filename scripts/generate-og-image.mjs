import sharp from "sharp";
import { writeFileSync } from "fs";

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050F2E" />
      <stop offset="45%" stop-color="#071233" />
      <stop offset="100%" stop-color="#030818" />
    </linearGradient>

    <radialGradient id="glow-amber" cx="20%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#FFAF0D" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#FFAF0D" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="glow-pink" cx="80%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FF2E93" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#FF2E93" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="glow-blue" cx="70%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#3A78FF" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#3A78FF" stop-opacity="0" />
    </radialGradient>

    <!-- Glass Card Gradients -->
    <linearGradient id="card-sw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e172e" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#060b17" stop-opacity="0.98" />
    </linearGradient>

    <linearGradient id="card-cr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1f0f29" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#0b0512" stop-opacity="0.98" />
    </linearGradient>

    <linearGradient id="card-hw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091b38" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#040b17" stop-opacity="0.98" />
    </linearGradient>

    <!-- Drop Shadows -->
    <filter id="shadow-card" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.65" />
    </filter>

    <filter id="glow-amber-dot" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#FFAF0D" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- Base Canvas -->
  <rect width="${W}" height="${H}" fill="url(#bg-grad)" />

  <!-- Ambient Light Orbs -->
  <rect width="${W}" height="${H}" fill="url(#glow-amber)" />
  <rect width="${W}" height="${H}" fill="url(#glow-pink)" />
  <rect width="${W}" height="${H}" fill="url(#glow-blue)" />

  <!-- Subtle Studio Grid Pattern -->
  <g opacity="0.04" stroke="#FFFFFF" stroke-width="1">
    <line x1="60" y1="0" x2="60" y2="630" />
    <line x1="180" y1="0" x2="180" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="420" y1="0" x2="420" y2="630" />
    <line x1="540" y1="0" x2="540" y2="630" />
    <line x1="660" y1="0" x2="660" y2="630" />
    <line x1="780" y1="0" x2="780" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1020" y1="0" x2="1020" y2="630" />
    <line x1="1140" y1="0" x2="1140" y2="630" />

    <line x1="0" y1="70" x2="1200" y2="70" />
    <line x1="0" y1="175" x2="1200" y2="175" />
    <line x1="0" y1="280" x2="1200" y2="280" />
    <line x1="0" y1="385" x2="1200" y2="385" />
    <line x1="0" y1="490" x2="1200" y2="490" />
    <line x1="0" y1="560" x2="1200" y2="560" />
  </g>

  <!-- ========================================================
       LEFT COLUMN: BRANDING, HEADLINE, VALUE PROPOSITION
       ======================================================== -->

  <!-- Top Studio Kicker -->
  <g transform="translate(80, 68)">
    <rect width="180" height="30" rx="15" fill="#0c1736" stroke="#1e2c56" stroke-width="1.5" />
    <circle cx="18" cy="15" r="4.5" fill="#FFAF0D" filter="url(#glow-amber-dot)" />
    <text x="32" y="19.5" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5">THREE CRAFTS • ONE STUDIO</text>
  </g>

  <!-- Official Ralypto Logo Mark + Wordmark -->
  <g transform="translate(80, 115)">
    <!-- R Icon -->
    <g transform="scale(0.38)">
      <path fill="#FFFFFF" fill-rule="evenodd" d="M67,12L105,12L105,13L112,13L112,14L120,15L120,16L130,20L131,22L133,22L136,26L138,26L143,31L143,33L147,36L147,38L149,39L149,41L150,41L150,43L153,47L153,50L154,50L154,53L155,53L155,56L156,56L156,62L157,62L157,74L156,74L155,84L154,84L154,87L153,87L149,97L142,104L142,106L140,108L138,108L134,113L132,113L128,117L124,118L123,121L127,125L127,127L130,129L130,131L134,134L134,136L137,138L137,140L140,142L140,144L143,146L143,148L146,150L146,152L149,154L149,156L153,159L153,161L156,163L156,165L159,167L159,169L162,171L162,173L166,176L166,178L172,184L172,186L174,187L174,190L172,190L172,189L170,189L170,190L168,190L168,189L167,190L158,190L158,189L124,189L124,188L122,188L118,184L118,182L115,180L113,175L110,173L110,171L106,168L106,166L101,161L101,159L97,156L97,154L89,146L89,144L86,142L86,140L78,132L78,130L75,128L75,126L72,124L72,122L69,122L63,116L63,114L65,113L65,111L67,109L67,106L68,106L68,92L98,92L98,91L102,91L102,90L106,89L111,84L111,82L114,79L114,75L115,75L115,66L114,66L113,61L111,60L111,58L107,54L105,54L103,52L100,52L100,51L26,51L26,50L22,50L21,48L19,48L18,46L16,46L12,42L12,40L9,36L9,13L67,13Z" />
      <!-- Signature Amber Dot -->
      <circle cx="33" cy="96" r="25" fill="#FFAF0D" filter="url(#glow-amber-dot)" />
    </g>
    <!-- Brand Name Text -->
    <text x="82" y="52" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5">ralypto</text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(80, 245)">
    <text x="0" y="0" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" letter-spacing="-1.2">We <tspan fill="#FFAF0D">code it</tspan>,</text>
    <text x="0" y="54" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" letter-spacing="-1.2"><tspan fill="#FF2E93">design it</tspan>, and</text>
    <text x="0" y="108" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" letter-spacing="-1.2"><tspan fill="#3A78FF">build it</tspan>.</text>
  </g>

  <!-- Tagline / Subtitle -->
  <g transform="translate(80, 395)">
    <text x="0" y="0" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="500" letter-spacing="-0.2">
      Full-stack software, creative brand direction,
    </text>
    <text x="0" y="28" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="500" letter-spacing="-0.2">
      and custom hardware engineering from Sri Lanka.
    </text>
  </g>

  <!-- Three Service Badges -->
  <g transform="translate(80, 470)">
    <!-- Software Badge -->
    <g transform="translate(0, 0)">
      <rect width="136" height="34" rx="17" fill="rgba(255, 175, 13, 0.12)" stroke="#FFAF0D" stroke-width="1.5" />
      <circle cx="16" cy="17" r="4" fill="#FFAF0D" />
      <text x="28" y="22" fill="#FFAF0D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">SOFTWARE</text>
    </g>

    <!-- Creative Badge -->
    <g transform="translate(148, 0)">
      <rect width="134" height="34" rx="17" fill="rgba(255, 46, 147, 0.12)" stroke="#FF2E93" stroke-width="1.5" />
      <circle cx="16" cy="17" r="4" fill="#FF2E93" />
      <text x="28" y="22" fill="#FF2E93" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">CREATIVE</text>
    </g>

    <!-- Hardware Badge -->
    <g transform="translate(294, 0)">
      <rect width="140" height="34" rx="17" fill="rgba(58, 120, 255, 0.14)" stroke="#3A78FF" stroke-width="1.5" />
      <circle cx="16" cy="17" r="4" fill="#3A78FF" />
      <text x="28" y="22" fill="#3A78FF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">HARDWARE</text>
    </g>
  </g>

  <!-- Bottom Metadata -->
  <g transform="translate(80, 560)">
    <text x="0" y="0" fill="#38BDF8" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" letter-spacing="0.5">https://www.ralypto.tech</text>
    <text x="225" y="0" fill="#475569" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">•</text>
    <text x="245" y="0" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Instagram: @ralypto_</text>
    <text x="400" y="0" fill="#475569" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">•</text>
    <text x="420" y="0" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Founder: Arkeshkar prashanthkumar</text>
  </g>

  <!-- ========================================================
       RIGHT COLUMN: THE 3 VISUAL CRAFT CARDS
       ======================================================== -->

  <!-- CARD 1: SOFTWARE LAB (TOP-RIGHT) -->
  <g transform="translate(680, 55)" filter="url(#shadow-card)">
    <rect width="440" height="155" rx="14" fill="url(#card-sw-grad)" stroke="#1e293b" stroke-width="1.5" />
    <rect x="0" y="0" width="440" height="34" rx="14" fill="#0b1120" />
    <!-- Window controls -->
    <circle cx="20" cy="17" r="4" fill="#ef4444" />
    <circle cx="34" cy="17" r="4" fill="#f59e0b" />
    <circle cx="48" cy="17" r="4" fill="#10b981" />
    <text x="65" y="21" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="11">ralypto-cloud :: software-lab</text>
    <rect x="330" y="7" width="95" height="20" rx="10" fill="rgba(255, 175, 13, 0.15)" stroke="#FFAF0D" stroke-width="1" />
    <text x="345" y="21" fill="#FFAF0D" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">SOFTWARE</text>

    <!-- Terminal Code lines -->
    <text x="20" y="62" fill="#FFAF0D" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600">$ ralypto deploy --env=prod</text>
    <text x="20" y="86" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11.5">✓ Next.js ERP &amp; AI Booking Agent synced</text>
    <text x="20" y="108" fill="#10b981" font-family="'JetBrains Mono', monospace" font-size="11.5">✓ Multi-warehouse POS: 1,284 SKUs live</text>
    <text x="20" y="132" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">⚡ Latency: 0.6s • WhatsApp API • PostgreSQL</text>
  </g>

  <!-- CARD 2: CREATIVE STUDIO (MIDDLE-RIGHT) -->
  <g transform="translate(640, 235)" filter="url(#shadow-card)">
    <rect width="480" height="160" rx="14" fill="url(#card-cr-grad)" stroke="#381944" stroke-width="1.5" />
    
    <!-- Header with 4K REC badge -->
    <g transform="translate(20, 16)">
      <circle cx="6" cy="6" r="5" fill="#ef4444" />
      <text x="18" y="10" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">REC [4K UHD / 60FPS]</text>
      <text x="190" y="10" fill="#FF2E93" font-family="'JetBrains Mono', monospace" font-size="11">TC 00:01:24:18</text>
      <rect x="345" y="-5" width="95" height="20" rx="10" fill="rgba(255, 46, 147, 0.18)" stroke="#FF2E93" stroke-width="1" />
      <text x="360" y="9" fill="#FF2E93" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">CREATIVE</text>
    </g>

    <!-- Artwork preview text & badges -->
    <text x="20" y="66" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">Kopi &amp; Co. Specialty Brand &amp; Aero 3D Motion</text>
    <text x="20" y="90" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Art Direction • Cinema 4D • 4.8x ROAS Campaign Launch</text>

    <!-- Color palette swatches -->
    <g transform="translate(20, 110)">
      <circle cx="12" cy="12" r="11" fill="#FF2E93" stroke="#FFFFFF" stroke-width="1.5" />
      <circle cx="42" cy="12" r="11" fill="#FFAF0D" stroke="#FFFFFF" stroke-width="1.5" />
      <circle cx="72" cy="12" r="11" fill="#00F0FF" stroke="#FFFFFF" stroke-width="1.5" />
      <circle cx="102" cy="12" r="11" fill="#A259FF" stroke="#FFFFFF" stroke-width="1.5" />
      <circle cx="132" cy="12" r="11" fill="#050F2E" stroke="#FFFFFF" stroke-width="1.5" />

      <!-- Pantone / Spec tag -->
      <rect x="160" y="2" width="160" height="20" rx="4" fill="rgba(255,255,255,0.08)" />
      <text x="170" y="16" fill="#f1f5f9" font-family="'JetBrains Mono', monospace" font-size="10">PANTONE® + OCTANE 3D</text>
    </g>
  </g>

  <!-- CARD 3: HARDWARE LAB (BOTTOM-RIGHT) -->
  <g transform="translate(680, 420)" filter="url(#shadow-card)">
    <rect width="440" height="155" rx="14" fill="url(#card-hw-grad)" stroke="#1e3a6e" stroke-width="1.5" />
    
    <g transform="translate(20, 16)">
      <text x="0" y="10" fill="#60A5FA" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">AQUAPULSE TELEMETRY // ESP32</text>
      <rect x="315" y="-5" width="105" height="20" rx="10" fill="rgba(58, 120, 255, 0.18)" stroke="#3A78FF" stroke-width="1" />
      <text x="330" y="9" fill="#60A5FA" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">HARDWARE</text>
    </g>

    <!-- Simulated Oscilloscope / Sensor Telemetry Curve -->
    <path d="M 20 85 Q 70 45, 120 75 T 220 50 T 320 80 T 420 55" fill="none" stroke="#3A78FF" stroke-width="2.5" />
    <path d="M 20 85 Q 70 45, 120 75 T 220 50 T 320 80 T 420 55 L 420 100 L 20 100 Z" fill="#3A78FF" fill-opacity="0.08" />

    <text x="20" y="122" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">TankSense Automated Pump Controller</text>
    <text x="20" y="140" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="10.5">LoRaWAN • Ultrasonic Sensing • 180+ Days Uptime</text>
  </g>

  <!-- Bottom Accent Stripe linking the 3 crafts -->
  <g transform="translate(0, 624)">
    <rect x="0" y="0" width="400" height="6" fill="#FFAF0D" />
    <rect x="400" y="0" width="400" height="6" fill="#FF2E93" />
    <rect x="800" y="0" width="400" height="6" fill="#3A78FF" />
  </g>
</svg>
`;

async function main() {
  console.log("Generating high-resolution Open Graph banner...");

  const svgBuffer = Buffer.from(svg.trim());

  // 1. Generate public/og-image.jpg (High-quality baseline JPEG)
  await sharp(svgBuffer)
    .resize(W, H)
    .jpeg({ quality: 95, progressive: false, chromaSubsampling: "4:4:4" })
    .toFile("public/og-image.jpg");
  console.log("✓ Created public/og-image.jpg (1200x630 JPEG)");

  // 2. Generate public/og-image.png (High-quality PNG)
  await sharp(svgBuffer)
    .resize(W, H)
    .png({ compressionLevel: 8 })
    .toFile("public/og-image.png");
  console.log("✓ Created public/og-image.png (1200x630 PNG)");

  // 3. Generate app/opengraph-image.jpg (Next.js file-based convention)
  await sharp(svgBuffer)
    .resize(W, H)
    .jpeg({ quality: 95, progressive: false })
    .toFile("app/opengraph-image.jpg");
  console.log("✓ Created app/opengraph-image.jpg");

  // 4. Generate app/opengraph-image.png
  await sharp(svgBuffer)
    .resize(W, H)
    .png({ compressionLevel: 8 })
    .toFile("app/opengraph-image.png");
  console.log("✓ Created app/opengraph-image.png");

  // 5. Generate app/twitter-image.jpg
  await sharp(svgBuffer)
    .resize(W, H)
    .jpeg({ quality: 95, progressive: false })
    .toFile("app/twitter-image.jpg");
  console.log("✓ Created app/twitter-image.jpg");

  // Print file size info
  const meta = await sharp("public/og-image.jpg").metadata();
  console.log("JPEG Metadata:", JSON.stringify(meta, null, 2));
}

main().catch((err) => {
  console.error("Error generating OG images:", err);
  process.exit(1);
});

