"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionHead from "../SectionHead";
import LabLabel from "../LabLabel";
import SoftwareDemoSimulator from "./SoftwareDemoSimulator";
import {
  softwareCategories,
  softwareSystems,
  type SoftwareCategory,
  type SoftwareSystem,
} from "@/lib/software-data";

export default function SoftwareShowcases() {
  const [selectedCat, setSelectedCat] = useState<SoftwareCategory>("erp");
  const [activeModalSystem, setActiveModalSystem] = useState<SoftwareSystem | null>(null);

  const activeCategoryMeta =
    softwareCategories.find((c) => c.id === selectedCat) || softwareCategories[0];

  const currentSystems = softwareSystems.filter((s) => s.category === selectedCat);

  return (
    <section className="lab-band lab-band--a sw-showcases-band" data-chapter="Systems">
      <div className="lab-band__inner">
        <SectionHead
          label={<LabLabel lab="software" name="Capabilities & Systems" />}
          title="What we build & deploy"
          intro="Explore our categorized real-made systems across ERP, mobile apps, e-commerce, AI agents, cloud telemetry, and APIs with live interactive simulators."
        />

        {/* Category Navigation Pills */}
        <div className="sw-category-nav" role="tablist" aria-label="Software domains">
          {softwareCategories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            const count = softwareSystems.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`sw-cat-tab ${isSelected ? "sw-cat-tab--active" : ""}`}
                onClick={() => setSelectedCat(cat.id)}
              >
                <span className="sw-cat-icon">{cat.leadIcon}</span>
                <span className="sw-cat-text">
                  <span className="sw-cat-name">{cat.name}</span>
                  <span className="sw-cat-count">{count} Systems</span>
                </span>
                {isSelected && <span className="sw-cat-indicator" />}
              </button>
            );
          })}
        </div>

        {/* Live Interactive Category Simulator Banner */}
        <div className="sw-simulator-section">
          <div className="sw-sim-banner-head">
            <div className="sw-sim-badge">
              <span className="t-amber">{activeCategoryMeta.badge}</span>
              <h3>{activeCategoryMeta.title}</h3>
              <p>{activeCategoryMeta.description}</p>
            </div>
            <div className="sw-sim-stack-chips">
              <small className="t-dim">// Production Stack</small>
              <div className="chip-group">
                {activeCategoryMeta.tools.map((tool) => (
                  <span key={tool} className="sw-tool-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Live Animated Simulator */}
          <SoftwareDemoSimulator activeCategory={selectedCat} />
        </div>

        {/* 5 Real Made Systems Showcase for the Selected Domain */}
        <div className="sw-systems-header">
          <div className="sw-sh-left">
            <span className="t-amber">&gt; REAL PRODUCTION CASE STUDIES</span>
            <h2>5 Proven {activeCategoryMeta.name} Built &amp; Deployed</h2>
          </div>
          <p className="sw-sh-right">
            Every system below is an engineered, production-tested solution designed for high
            reliability, verified business metrics, and custom operational requirements.
          </p>
        </div>

        <div className="sw-systems-grid">
          {currentSystems.map((sys, idx) => (
            <article
              key={sys.id}
              className="sw-system-card"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              {/* Card Header & High-Impact Metric */}
              <div className="sw-card-head">
                <div className="sw-card-meta">
                  <span className="sw-year-badge">{sys.year}</span>
                  <span className="sw-client-tag">{sys.client}</span>
                </div>
                <div className="sw-card-metric">
                  <b>{sys.metric.value}</b>
                  <small>{sys.metric.label}</small>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="sw-card-title-block">
                <h3>{sys.title}</h3>
                <p className="sw-card-subtitle">{sys.subtitle}</p>
              </div>

              {/* Simulated UI Screen Preview Picture Frame */}
              <div className="sw-screen-preview" aria-hidden="true">
                <div className="sw-screen-bar">
                  <div className="sw-screen-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>{sys.id}.ralypto.internal</span>
                  <span className="t-amber status-dot">● live</span>
                </div>
                <div className={`sw-screen-canvas sw-canvas--${sys.visualStyle}`}>
                  {sys.visualStyle === "erp-pos" && (
                    <div className="mock-erp-grid">
                      <div className="mock-sidebar">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="mock-content">
                        <div className="mock-stat-row">
                          <div>
                            <small>Stock Level</small>
                            <b>{sys.metric.value}</b>
                          </div>
                          <div>
                            <small>Status</small>
                            <b className="t-green">Active POS</b>
                          </div>
                        </div>
                        <div className="mock-bars">
                          <span style={{ height: "45%" }} />
                          <span style={{ height: "70%" }} />
                          <span style={{ height: "92%" }} />
                          <span style={{ height: "60%" }} />
                          <span style={{ height: "85%" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {sys.visualStyle === "mobile-app" && (
                    <div className="mock-mobile-phone">
                      <div className="mock-notch" />
                      <div className="mock-phone-body">
                        <div className="mock-pin-radar">
                          <span className="pin" />
                          <span className="pulse" />
                        </div>
                        <div className="mock-card-overlay">
                          <small>{sys.title}</small>
                          <b>{sys.metric.value} verified</b>
                        </div>
                      </div>
                    </div>
                  )}

                  {sys.visualStyle === "web-store" && (
                    <div className="mock-web-layout">
                      <div className="mock-web-nav">
                        <span className="logo-sq" />
                        <span className="line-sm" />
                        <span className="line-sm" />
                      </div>
                      <div className="mock-web-hero">
                        <div className="mock-badge-tag">{sys.metric.value} SPEED</div>
                        <div className="mock-h2" />
                        <div className="mock-btn-row">
                          <span className="btn-pill" />
                        </div>
                      </div>
                    </div>
                  )}

                  {sys.visualStyle === "ai-chat" && (
                    <div className="mock-ai-chat-screen">
                      <div className="bubble bubble-user">
                        <span>User inquiry: {sys.subtitle.slice(0, 36)}...</span>
                      </div>
                      <div className="bubble bubble-agent">
                        <span className="t-amber">&gt; AI Agent ({sys.metric.value}):</span>
                        <span className="line-text" />
                        <span className="line-text short" />
                      </div>
                    </div>
                  )}

                  {sys.visualStyle === "cloud-scada" && (
                    <div className="mock-scada-screen">
                      <div className="scada-grid-lines" />
                      <svg viewBox="0 0 200 60" className="scada-wave">
                        <path
                          d="M0,35 Q25,10 50,35 T100,35 T150,15 T200,35"
                          fill="none"
                          stroke="var(--sw-amber)"
                          strokeWidth="2"
                        />
                      </svg>
                      <div className="scada-readout">
                        <span>{sys.metric.value}</span>
                        <small>TELEMETRY LOCK</small>
                      </div>
                    </div>
                  )}

                  {sys.visualStyle === "api-pipeline" && (
                    <div className="mock-api-screen">
                      <div className="api-json-snip">
                        <code>
                          <span className="t-amber">&gt; POST</span> /v2/event
                          <br />
                          {`{"status": "ok", "latency": "${sys.metric.value}"}`}
                        </code>
                      </div>
                      <div className="api-nodes-track">
                        <span className="n-dot ok" />
                        <span className="n-line" />
                        <span className="n-dot ok" />
                        <span className="n-line" />
                        <span className="n-dot active" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Description */}
              <p className="sw-card-summary">{sys.summary}</p>

              {/* Capabilities List */}
              <div className="sw-card-caps">
                <h4>Engineered Capabilities:</h4>
                <ul>
                  {sys.capabilities.map((cap, cIdx) => (
                    <li key={cIdx}>{cap}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badges */}
              <div className="sw-card-tools">
                {sys.tools.map((t) => (
                  <span key={t} className="sw-tech-badge">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="sw-card-actions">
                <button
                  type="button"
                  className="btn-card-details"
                  onClick={() => setActiveModalSystem(sys)}
                >
                  View Architecture &amp; Case Study ↗
                </button>
                <Link
                  href={`/contact?need=software&system=${encodeURIComponent(sys.title)}`}
                  className="btn-card-discuss"
                >
                  Discuss Build
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Cross-Domain Overview Stats */}
        <div className="sw-overview-banner">
          <div className="sw-ob-col">
            <span className="ob-num">30+</span>
            <span className="ob-label">Production Software Systems Deployed</span>
          </div>
          <div className="sw-ob-col">
            <span className="ob-num">0.4s</span>
            <span className="ob-label">Average Edge Page &amp; API Latency</span>
          </div>
          <div className="sw-ob-col">
            <span className="ob-num">99.9%</span>
            <span className="ob-label">Database &amp; Telemetry Uptime SLA</span>
          </div>
          <div className="sw-ob-col">
            <span className="ob-num">100%</span>
            <span className="ob-label">Custom Tailored to Client Workflows</span>
          </div>
        </div>

        {/* Modal for Deep Architecture & Case Study Inspection */}
        {activeModalSystem && (
          <div
            className="sw-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="sw-modal-window">
              <div className="sw-modal-top">
                <span id="modal-title" className="modal-title">
                  {activeModalSystem.title}
                </span>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setActiveModalSystem(null)}
                >
                  ✕ Close
                </button>
              </div>

              <div className="sw-modal-content">
                <div className="sw-modal-badge-row">
                  <span className="badge-client">{activeModalSystem.client}</span>
                  <span className="badge-year">{activeModalSystem.year}</span>
                  <span className="badge-metric">
                    {activeModalSystem.metric.value} — {activeModalSystem.metric.label}
                  </span>
                </div>

                <h3>{activeModalSystem.subtitle}</h3>

                <div className="sw-modal-section">
                  <h4>The Operational Challenge:</h4>
                  <p>{activeModalSystem.challenge}</p>
                </div>

                <div className="sw-modal-section">
                  <h4>What Ralypto Software Lab Built:</h4>
                  <p>{activeModalSystem.built}</p>
                </div>

                <div className="sw-modal-section">
                  <h4>Core Capabilities &amp; Workflows:</h4>
                  <ul className="modal-caps-list">
                    {activeModalSystem.capabilities.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="sw-modal-section">
                  <h4>Technology Stack:</h4>
                  <div className="modal-tools-group">
                    {activeModalSystem.tools.map((t) => (
                      <span key={t} className="sw-tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sw-modal-footer">
                  <Link
                    href={`/contact?need=software&system=${encodeURIComponent(
                      activeModalSystem.title
                    )}`}
                    className="btn btn-primary"
                    onClick={() => setActiveModalSystem(null)}
                  >
                    Build a System Like This
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setActiveModalSystem(null)}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
