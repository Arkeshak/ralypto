"use client";

import React, { useState, useEffect, useRef } from "react";
import type { SoftwareCategory } from "@/lib/software-data";

export default function SoftwareDemoSimulator({ activeCategory }: { activeCategory: SoftwareCategory }) {
  // ------------------------------------------
  // ERP SIMULATOR STATE
  // ------------------------------------------
  const [erpStock, setErpStock] = useState(1284);
  const [erpScans, setErpScans] = useState([
    { sku: "SKU-8921", name: "M12 Zinc Hex Bolt (Pack of 50)", qty: 2, price: 4200 },
    { sku: "SKU-3410", name: "Industrial Solenoid Valve 24V DC", qty: 1, price: 18500 },
  ]);
  const [erpScannedItem, setErpScannedItem] = useState(false);

  const triggerErpScan = () => {
    setErpScannedItem(true);
    setErpStock((prev) => Math.max(0, prev - 1));
    const newItems = [
      { sku: "SKU-7740", name: "High-Pressure Hydraulic Coupler", qty: 1, price: 9600 },
      ...erpScans,
    ];
    setErpScans(newItems.slice(0, 4));
    setTimeout(() => setErpScannedItem(false), 900);
  };

  const erpSubtotal = erpScans.reduce((sum, item) => sum + item.qty * item.price, 0);

  // ------------------------------------------
  // MOBILE SIMULATOR STATE
  // ------------------------------------------
  const [mobileTab, setMobileTab] = useState<"delivery" | "telemetry" | "orders">("delivery");
  const [mobileSigned, setMobileSigned] = useState(false);
  const [mobileNotification, setMobileNotification] = useState(false);

  const triggerMobileSignature = () => {
    setMobileSigned(true);
    setMobileNotification(true);
    setTimeout(() => setMobileNotification(false), 4500);
  };

  // ------------------------------------------
  // WEB SIMULATOR STATE
  // ------------------------------------------
  const [webViewport, setWebViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [webCurrency, setWebCurrency] = useState<"LKR" | "USD" | "EUR">("USD");
  const [webRoast, setWebRoast] = useState<"Medium-Dark" | "Light-Citrus" | "Espresso">("Medium-Dark");

  const currencyRates = { USD: 1, LKR: 305, EUR: 0.92 };
  const basePrice = webRoast === "Espresso" ? 24 : webRoast === "Light-Citrus" ? 22 : 20;
  const currentPrice = (basePrice * currencyRates[webCurrency]).toLocaleString(undefined, {
    maximumFractionDigits: webCurrency === "LKR" ? 0 : 2,
  });

  // ------------------------------------------
  // AI AGENT SIMULATOR STATE
  // ------------------------------------------
  const aiPrompts = [
    {
      lang: "EN",
      label: "Book appointment tomorrow 2:30 PM",
      prompt: "Can I book a consultation tomorrow at 2:30 PM for dermal therapy?",
      reply: "Checked calendar with Aura Clinic. Dr. Hansika is available at 2:30 PM on Oct 14. Would you like me to confirm this slot and send a calendar invite?",
      tools: ["calendar.check_availability(2026-10-14T14:30)", "crm.get_patient_profile()"],
    },
    {
      lang: "SI",
      label: "හෙට 2:30 ට වේලාවක් වෙන්කරන්න",
      prompt: "මට හෙට දවල් 2:30 ට ඩොක්ටර් හමුවෙන්න පුළුවන්ද?",
      reply: "ඔව්! හෙට පස්වරු 2:30 ට ඩොක්ටර් හංසිකා ලබාගත හැක. මෙම වේලාව වෙන්කර තහවුරු කිරීමේ SMS පණිවිඩය එවන්නද?",
      tools: ["nlp.detect_language('si')", "calendar.query_free_busy()"],
    },
    {
      lang: "TA",
      label: "நாளை மதியம் 2:30 மணிக்கு பதிவு",
      prompt: "நாளை மதியம் 2:30 மணிக்கு மருத்துவரை சந்திக்க நேரம் கிடைக்குமா?",
      reply: "ஆம்! நாளை பிற்பகல் 2:30 மணிக்கு டாக்டர் ஹன்சிகா உள்ளார். இந்த நேரத்தை உறுதி செய்து வாட்ஸ்அப்பில் உறுதிப்படுத்தலை அனுப்பலாமா?",
      tools: ["nlp.detect_language('ta')", "calendar.reserve_slot()"],
    },
    {
      lang: "OCR",
      label: "Parse Supplier Invoice PDF #8902",
      prompt: "Extract table line items, VAT registration and subtotal from APEX-8902.pdf",
      reply: "Extracted 3 line items. Subtotal: LKR 42,300. VAT 18%: LKR 7,614. Total: LKR 49,914. Cross-validation: MATCH (100% confidence). Posted to ERP journal.",
      tools: ["vision.ocr_extract_tables()", "erp.post_journal_entry()"],
    },
  ];

  const [selectedAiPrompt, setSelectedAiPrompt] = useState(aiPrompts[0]);
  const [aiStreamingText, setAiStreamingText] = useState("");
  const [aiIsStreaming, setAiIsStreaming] = useState(false);

  const startAiStream = (item: typeof aiPrompts[0]) => {
    setSelectedAiPrompt(item);
    setAiStreamingText("");
    setAiIsStreaming(true);

    let idx = 0;
    const interval = setInterval(() => {
      idx += 3;
      setAiStreamingText(item.reply.slice(0, idx));
      if (idx >= item.reply.length) {
        clearInterval(interval);
        setAiIsStreaming(false);
      }
    }, 25);
  };

  useEffect(() => {
    if (activeCategory === "ai") {
      startAiStream(aiPrompts[0]);
    }
  }, [activeCategory]);

  // ------------------------------------------
  // CLOUD SCADA SIMULATOR STATE
  // ------------------------------------------
  const [scadaVibration, setScadaVibration] = useState(1.42);
  const [scadaSpike, setScadaSpike] = useState(false);
  const [scadaChartPoints, setScadaChartPoints] = useState([20, 24, 22, 28, 25, 30, 28, 32, 29, 31]);

  useEffect(() => {
    if (activeCategory !== "custom") return;
    const interval = setInterval(() => {
      setScadaChartPoints((prev) => {
        const nextVal = scadaSpike
          ? Math.floor(65 + Math.random() * 25)
          : Math.floor(22 + Math.random() * 12);
        return [...prev.slice(1), nextVal];
      });
      setScadaVibration((prev) =>
        scadaSpike
          ? Number((4.2 + Math.random() * 0.8).toFixed(2))
          : Number((1.35 + Math.random() * 0.2).toFixed(2))
      );
    }, 800);
    return () => clearInterval(interval);
  }, [activeCategory, scadaSpike]);

  // ------------------------------------------
  // INTEGRATIONS & API SIMULATOR STATE
  // ------------------------------------------
  const [apiStatus, setApiStatus] = useState<"idle" | "sending" | "success">("idle");
  const [apiLatency, setApiLatency] = useState(48);

  const triggerApiCall = () => {
    setApiStatus("sending");
    const simulatedLatency = Math.floor(38 + Math.random() * 24);
    setTimeout(() => {
      setApiLatency(simulatedLatency);
      setApiStatus("success");
    }, 600);
  };

  return (
    <div className="sw-simulator">
      {/* 1. ERP & POS SIMULATOR */}
      {activeCategory === "erp" && (
        <div className="sw-sim-box sw-sim-erp">
          <div className="sw-sim-header">
            <div className="sw-sim-dots">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
            </div>
            <span className="sw-sim-title">STOCKLINE ERP — REGISTER #03 · LIVE WAREHOUSE SYNC</span>
            <span className="sw-sim-tag live-badge">● POS ONLINE</span>
          </div>

          <div className="sw-erp-body">
            {/* Left side: Register & Items */}
            <div className="sw-erp-left">
              <div className="sw-erp-toolbar">
                <button
                  type="button"
                  className={`sw-sim-btn ${erpScannedItem ? "btn-flash" : ""}`}
                  onClick={triggerErpScan}
                >
                  ⚡ Scan Barcode (SKU-7740)
                </button>
                <div className="sw-erp-metric">
                  <small>Live Warehouse SKUs</small>
                  <b className="t-amber">{erpStock.toLocaleString()} UNITS</b>
                </div>
              </div>

              <div className="sw-erp-table">
                <div className="sw-erp-thead">
                  <span>SKU / ITEM</span>
                  <span>QTY</span>
                  <span>RATE (LKR)</span>
                  <span>AMOUNT</span>
                </div>
                <div className="sw-erp-tbody">
                  {erpScans.map((item, idx) => (
                    <div
                      key={item.sku + idx}
                      className={`sw-erp-row ${idx === 0 && erpScannedItem ? "row-highlight" : ""}`}
                    >
                      <div className="item-title">
                        <b>{item.sku}</b>
                        <small>{item.name}</small>
                      </div>
                      <span>x{item.qty}</span>
                      <span>{item.price.toLocaleString()}</span>
                      <span className="t-amber">{(item.qty * item.price).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Receipt Totals */}
            <div className="sw-erp-right">
              <div className="sw-receipt-card">
                <h4>SALES INVOICE</h4>
                <p className="rcpt-sub">APEX HARDWARE &amp; BUILDING SUPPLIES</p>
                <div className="rcpt-divider" />
                <div className="rcpt-row">
                  <span>Items Count</span>
                  <b>{erpScans.length} lines</b>
                </div>
                <div className="rcpt-row">
                  <span>Subtotal</span>
                  <b>LKR {erpSubtotal.toLocaleString()}</b>
                </div>
                <div className="rcpt-row">
                  <span>Tax (VAT 18%)</span>
                  <b>LKR {Math.round(erpSubtotal * 0.18).toLocaleString()}</b>
                </div>
                <div className="rcpt-divider" />
                <div className="rcpt-total">
                  <span>NET TOTAL</span>
                  <b className="t-amber">LKR {Math.round(erpSubtotal * 1.18).toLocaleString()}</b>
                </div>
                <div className="rcpt-status">
                  <span className="badge-ok">✓ DB COMMITTED</span>
                  <span className="badge-sync">⚡ WHATSAPP SYNCED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MOBILE APPLICATIONS SIMULATOR */}
      {activeCategory === "mobile" && (
        <div className="sw-sim-box sw-sim-mobile">
          <div className="sw-sim-header">
            <div className="sw-sim-dots">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
            </div>
            <span className="sw-sim-title">QUICKDROP NATIVE MOBILE DRIVER COMPANION (iOS / ANDROID)</span>
            <span className="sw-sim-tag live-badge">● 5G CONNECTED</span>
          </div>

          <div className="sw-mobile-wrapper">
            {/* Phone Container */}
            <div className="sw-phone-frame">
              <div className="phone-island">
                <span className="island-cam" />
              </div>
              <div className="phone-status-bar">
                <span>19:42</span>
                <span className="phone-icons">5G 100% 🔋</span>
              </div>

              {mobileNotification && (
                <div className="phone-notif-toast">
                  <div className="notif-icon">📦</div>
                  <div className="notif-text">
                    <b>Drop Complete!</b>
                    <small>Signature &amp; photo geostamped to DB.</small>
                  </div>
                </div>
              )}

              <div className="phone-screen-content">
                {mobileTab === "delivery" && (
                  <div className="screen-delivery">
                    <div className="delivery-card">
                      <span className="chip-priority">URGENT DISPATCH · #QD-9041</span>
                      <h3>Recipient: Colombo Marina Logistics</h3>
                      <p className="addr">📍 48 Harbour Road, Port City, Gate 04</p>
                      <div className="delivery-meta">
                        <div>
                          <small>Distance</small>
                          <b>1.8 km (4 min)</b>
                        </div>
                        <div>
                          <small>Consignment</small>
                          <b>2 Crates · 14.5 kg</b>
                        </div>
                      </div>
                    </div>

                    <div className="simulated-map">
                      <div className="map-grid-lines" />
                      <div className="map-vehicle-pulse">
                        <span className="vehicle-dot" />
                        <span className="vehicle-radar" />
                      </div>
                      <div className="map-route-trail" />
                      <div className="map-dest-pin">📍 Gate 04</div>
                    </div>

                    <div className="pod-section">
                      {!mobileSigned ? (
                        <button type="button" className="btn-pod" onClick={triggerMobileSignature}>
                          ✍️ Customer Tap-to-Sign POD
                        </button>
                      ) : (
                        <div className="pod-success">
                          <span className="pod-check">✓ Signed by K. Perera</span>
                          <span className="pod-hash">SHA-256: 8f9b..e3a1</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {mobileTab === "telemetry" && (
                  <div className="screen-telemetry">
                    <h4>AquaPulse Utility Telemetry</h4>
                    <div className="gauge-box">
                      <span className="gauge-val">12.8 L/min</span>
                      <small>Ultrasonic Flow Rate</small>
                    </div>
                    <div className="telemetry-log">
                      <p>✓ Kitchen line: 0.0 L/min</p>
                      <p>✓ Overhead tank: 88% full</p>
                      <p className="t-amber">✓ Leak status: Normal</p>
                    </div>
                  </div>
                )}

                {mobileTab === "orders" && (
                  <div className="screen-orders">
                    <h4>FieldForce Offline Sales</h4>
                    <div className="field-item">
                      <span>Perera Stores</span>
                      <b>LKR 84,000</b>
                    </div>
                    <div className="field-item">
                      <span>Wijaya Retailers</span>
                      <b>LKR 112,500</b>
                    </div>
                    <p className="offline-pill">● SQLite 100% Offline Ready</p>
                  </div>
                )}
              </div>

              {/* Bottom Nav Bar */}
              <div className="phone-bottom-nav">
                <button
                  type="button"
                  className={mobileTab === "delivery" ? "active" : ""}
                  onClick={() => setMobileTab("delivery")}
                >
                  🚚 Delivery
                </button>
                <button
                  type="button"
                  className={mobileTab === "telemetry" ? "active" : ""}
                  onClick={() => setMobileTab("telemetry")}
                >
                  💧 Telemetry
                </button>
                <button
                  type="button"
                  className={mobileTab === "orders" ? "active" : ""}
                  onClick={() => setMobileTab("orders")}
                >
                  📋 Orders
                </button>
              </div>
            </div>

            {/* Feature Callouts */}
            <div className="sw-mobile-features">
              <h3>React Native &amp; Flutter Mobile Architecture</h3>
              <ul>
                <li>
                  <b>Offline-First Local Storage:</b> SQLite &amp; WatermelonDB keep delivery queues and
                  sales orders operational without cellular coverage.
                </li>
                <li>
                  <b>Sub-120ms GPS Sync:</b> Background location updates throttled to optimize device
                  battery during 10-hour delivery shifts.
                </li>
                <li>
                  <b>Digital POD Signatures:</b> Encrypted on-device signature capture with camera photo
                  evidence and GPS coordinates.
                </li>
                <li>
                  <b>Bluetooth Thermal Printing:</b> Direct ESC/POS printing over BLE for field van sales.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. WEBSITES & E-COMMERCE SIMULATOR */}
      {activeCategory === "web" && (
        <div className="sw-sim-box sw-sim-web">
          <div className="sw-sim-header">
            <div className="sw-sim-dots">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
            </div>
            <div className="sw-browser-bar">
              <span className="lock-icon">🔒</span>
              <span className="url-text">https://kopiandco.com/roasters/reserve-selection</span>
            </div>
            <div className="viewport-toggle">
              <button
                type="button"
                className={webViewport === "desktop" ? "active" : ""}
                onClick={() => setWebViewport("desktop")}
              >
                Desktop
              </button>
              <button
                type="button"
                className={webViewport === "tablet" ? "active" : ""}
                onClick={() => setWebViewport("tablet")}
              >
                Tablet
              </button>
              <button
                type="button"
                className={webViewport === "mobile" ? "active" : ""}
                onClick={() => setWebViewport("mobile")}
              >
                Mobile
              </button>
            </div>
          </div>

          <div className={`sw-web-preview viewport--${webViewport}`}>
            <div className="web-hero-mock">
              <div className="web-hero-info">
                <span className="web-tag">HEADLESS NEXT.js 15 · SHOPIFY API</span>
                <h2>Kopi &amp; Co. Single-Origin Reserve Roast</h2>
                <p>Artisanal single-estate beans roasted to order with sub-second page performance.</p>

                <div className="roast-selector">
                  <small>Select Roast Profile:</small>
                  <div className="pill-group">
                    {(["Medium-Dark", "Light-Citrus", "Espresso"] as const).map((r) => (
                      <button
                        type="button"
                        key={r}
                        className={`pill-btn ${webRoast === r ? "active" : ""}`}
                        onClick={() => setWebRoast(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="price-checkout-row">
                  <div className="price-display">
                    <span className="cur-sym">{webCurrency}</span>
                    <span className="amount">{currentPrice}</span>
                    <small>/ 500g pouch</small>
                  </div>

                  <div className="currency-selector">
                    {(["USD", "LKR", "EUR"] as const).map((c) => (
                      <button
                        type="button"
                        key={c}
                        className={webCurrency === c ? "active" : ""}
                        onClick={() => setWebCurrency(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lighthouse Score Card */}
              <div className="lighthouse-card">
                <h4>LIGHTHOUSE AUDIT</h4>
                <div className="lh-gauges">
                  <div className="lh-gauge">
                    <div className="lh-circle lh-100">99</div>
                    <small>Performance</small>
                  </div>
                  <div className="lh-gauge">
                    <div className="lh-circle lh-100">100</div>
                    <small>Accessibility</small>
                  </div>
                  <div className="lh-gauge">
                    <div className="lh-circle lh-100">100</div>
                    <small>Best Practices</small>
                  </div>
                  <div className="lh-gauge">
                    <div className="lh-circle lh-100">100</div>
                    <small>SEO</small>
                  </div>
                </div>
                <div className="lh-stats">
                  <span>⚡ FCP: <b>0.38s</b></span>
                  <span>⚡ LCP: <b>0.52s</b></span>
                  <span>⚡ CLS: <b>0.00</b></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. AI AGENTS & AUTOMATION SIMULATOR */}
      {activeCategory === "ai" && (
        <div className="sw-sim-box sw-sim-ai">
          <div className="sw-sim-header">
            <div className="sw-sim-dots">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
            </div>
            <span className="sw-sim-title">AUTONOMOUS AI AGENT ENGINE (CLAUDE 3.5 SONNET + WHISPER)</span>
            <span className="sw-sim-tag live-badge">● INFERENCE LATENCY: 0.6s</span>
          </div>

          <div className="sw-ai-layout">
            {/* Left Prompt Selector */}
            <div className="sw-ai-prompts">
              <h4>SELECT SAMPLE TEST PROMPT:</h4>
              {aiPrompts.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  className={`sw-prompt-chip ${selectedAiPrompt.prompt === p.prompt ? "active" : ""}`}
                  onClick={() => startAiStream(p)}
                >
                  <span className="lang-tag">{p.lang}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Right Chat Terminal Output */}
            <div className="sw-ai-terminal">
              <div className="ai-step-logs">
                <span className="t-dim">// Agent Execution Pipeline</span>
                {selectedAiPrompt.tools.map((t, idx) => (
                  <p key={idx} className="tool-call">
                    <span className="t-amber">&gt; [tool_call]</span> {t}
                  </p>
                ))}
              </div>

              <div className="ai-chat-bubble customer">
                <small>User Inbound (WhatsApp / Webhook):</small>
                <p>"{selectedAiPrompt.prompt}"</p>
              </div>

              <div className="ai-chat-bubble agent">
                <small className="t-amber">Sara AI Assistant (Synthesized Reply):</small>
                <p>
                  {aiStreamingText}
                  {aiIsStreaming && <span className="caret-blink">▌</span>}
                </p>
              </div>

              <div className="ai-footer-status">
                <span>Confidence: <b>99.4%</b></span>
                <span>Language: <b>{selectedAiPrompt.lang}</b></span>
                <span>Guardrails: <b>Passed</b></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CUSTOM SOFTWARE & SCADA SIMULATOR */}
      {activeCategory === "custom" && (
        <div className="sw-sim-box sw-sim-scada">
          <div className="sw-sim-header">
            <div className="sw-sim-dots">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
            </div>
            <span className="sw-sim-title">OPTIVIBE SCADA · MACHINE VIBRATION &amp; THERMAL TELEMETRY</span>
            <span className="sw-sim-tag live-badge">● 10 kHz FFT REALTIME</span>
          </div>

          <div className="sw-scada-body">
            <div className="scada-controls">
              <div className="scada-stat-card">
                <small>Bearing Vibration</small>
                <b className={scadaSpike ? "t-red" : "t-amber"}>{scadaVibration} mm/s</b>
                <span>{scadaSpike ? "⚠️ ISO CRITICAL ZONE" : "✓ ISO 10816 CLASS II NORMAL"}</span>
              </div>

              <div className="scada-stat-card">
                <small>Extruder Motor RPM</small>
                <b>1,480 RPM</b>
                <span>Bearing Temperature: 44.2°C</span>
              </div>

              <button
                type="button"
                className={`btn-scada-action ${scadaSpike ? "btn-spike-active" : ""}`}
                onClick={() => setScadaSpike(!scadaSpike)}
              >
                {scadaSpike ? "Reset Vibration Anomaly" : "⚡ Inject Harmonic Anomaly"}
              </button>
            </div>

            {/* Live Chart Stream */}
            <div className="scada-chart-wrap">
              <div className="chart-header">
                <span>HARMONIC SPECTRUM STREAM (WEBSOCKETS · TIMESCALEDB)</span>
                <span className="sample-rate">10,000 samples/sec</span>
              </div>
              <div className="chart-bars">
                {scadaChartPoints.map((val, idx) => (
                  <div key={idx} className="chart-bar-col">
                    <span
                      className={`bar-fill ${val > 50 ? "bar-warn" : ""}`}
                      style={{ height: `${val}%` }}
                    />
                    <small>{idx * 50}Hz</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. API INTEGRATIONS & GATEWAYS SIMULATOR */}
      {activeCategory === "integrations" && (
        <div className="sw-sim-box sw-sim-api">
          <div className="sw-sim-header">
            <div className="sw-sim-dots">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
            </div>
            <span className="sw-sim-title">PAYOMNI MULTI-GATEWAY MIDDLEWARE &amp; WEBHOOK PIPELINE</span>
            <span className="sw-sim-tag live-badge">● 99.99% UPTIME</span>
          </div>

          <div className="sw-api-body">
            <div className="api-request-box">
              <div className="req-header">
                <span className="method">POST</span>
                <span className="endpoint">/v1/checkout/initialize</span>
                <button
                  type="button"
                  className="btn-send-api"
                  onClick={triggerApiCall}
                  disabled={apiStatus === "sending"}
                >
                  {apiStatus === "sending" ? "Dispatching..." : "Send Request ⚡"}
                </button>
              </div>
              <pre className="req-json">
{`{
  "orderId": "ORD-2026-9812",
  "amount": 24500.00,
  "currency": "LKR",
  "providers": ["payhere", "stripe", "commercial_ipg"],
  "customer": {
    "phone": "+94771234567",
    "whatsappNotification": true
  }
}`}
              </pre>
            </div>

            <div className="api-pipeline-flow">
              <h4>DISPATCH PIPELINE ARCHITECTURE</h4>
              <div className="flow-steps">
                <div className={`flow-node ${apiStatus === "success" ? "node-active" : ""}`}>
                  <span>1. API Auth</span>
                  <small>JWT verified</small>
                </div>
                <div className="flow-arrow">➔</div>
                <div className={`flow-node ${apiStatus === "success" ? "node-active" : ""}`}>
                  <span>2. Payment Rail</span>
                  <small>PayHere IPG / Stripe</small>
                </div>
                <div className="flow-arrow">➔</div>
                <div className={`flow-node ${apiStatus === "success" ? "node-active" : ""}`}>
                  <span>3. Webhook Retry</span>
                  <small>BullMQ queue</small>
                </div>
                <div className="flow-arrow">➔</div>
                <div className={`flow-node ${apiStatus === "success" ? "node-active" : ""}`}>
                  <span>4. WhatsApp Alert</span>
                  <small>Meta Graph API</small>
                </div>
              </div>

              {apiStatus === "success" && (
                <div className="api-response-alert">
                  <span className="status-pill ok">HTTP 200 OK</span>
                  <span>Latency: <b>{apiLatency}ms</b></span>
                  <span>Idempotency-Key: <b>e4c19a82-f70b</b></span>
                  <span>WhatsApp Message: <b>Sent ✓</b></span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
