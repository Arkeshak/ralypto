import { Visual } from "@/lib/content";
/* Animated mock "screenshots" for projects that have no real images yet. When a project gets real images, the first image is shown instead. */ export default function MockVisual({
  kind,
  title,
}: {
  kind: Visual;
  title: string;
}) {
  return (
    <div
      className={`mv mv--${kind}`}
      role="img"
      aria-label={`Preview of ${title}`}
    >
      {" "}
      {kind === "dashboard" && (
        <div className="mv-dash">
          {" "}
          <aside>
            <i />
            <i />
            <i />
            <i />
          </aside>{" "}
          <div className="mv-dash__main">
            {" "}
            <div className="mv-dash__stats">
              {" "}
              <div>
                <small>Today</small>
                <b>LKR 84,200</b>
              </div>{" "}
              <div>
                <small>Orders</small>
                <b>126</b>
              </div>{" "}
              <div className="is-warn">
                <small>Low stock</small>
                <b>4 items</b>
              </div>{" "}
            </div>{" "}
            <div className="mv-dash__chart">
              {" "}
              {[40, 65, 50, 80, 62, 90, 74].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                />
              ))}{" "}
            </div>{" "}
            <div className="mv-dash__rows">
              <i />
              <i />
              <i />
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {kind === "chat" && (
        <div className="mv-phone">
          {" "}
          <div className="mv-phone__top">Sara · Booking assistant</div>{" "}
          <p className="mv-msg mv-msg--in">
            Hi, can I book a haircut tomorrow?
          </p>{" "}
          <p className="mv-msg mv-msg--out">Sure! 10:30 or 2:00 tomorrow?</p>{" "}
          <p className="mv-msg mv-msg--in">2:00 please</p>{" "}
          <p className="mv-msg mv-msg--out">
            Booked for 2:00 PM. See you then.
          </p>{" "}
        </div>
      )}{" "}
      {kind === "brand" && (
        <div className="mv-brand">
          {" "}
          <div className="mv-brand__logo">
            <span>K</span>
          </div>{" "}
          <p className="mv-brand__name">Kopi &amp; Co.</p>{" "}
          <div className="mv-brand__cup" />{" "}
          <div className="mv-brand__swatches">
            <i />
            <i />
            <i />
            <i />
          </div>{" "}
        </div>
      )}{" "}
      {kind === "social" && (
        <div className="mv-phone mv-phone--grid">
          {" "}
          <div className="mv-phone__top">@threadlane</div>{" "}
          <div className="mv-grid">
            {" "}
            {Array.from({ length: 9 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `${i * 0.07}s` }} />
            ))}{" "}
          </div>{" "}
          <p className="mv-likes">2,400 followers</p>{" "}
        </div>
      )}{" "}
      {kind === "device" && (
        <div className="mv-device">
          {" "}
          <div className="mv-device__unit">
            <span>12.4 L</span>
            <i />
          </div>{" "}
          <div className="mv-phone mv-phone--small">
            {" "}
            <div className="mv-phone__top">AquaPulse</div>{" "}
            <svg viewBox="0 0 120 60" className="mv-line">
              {" "}
              <polyline points="0,50 20,42 40,46 60,30 80,34 100,14 120,20" />{" "}
            </svg>{" "}
            <p className="mv-alert">Leak alert: kitchen</p>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {kind === "circuit" && (
        <svg viewBox="0 0 320 220" className="mv-bp">
          {" "}
          <rect x="30" y="30" width="260" height="160" rx="8" />{" "}
          <rect x="60" y="60" width="70" height="50" />{" "}
          <text x="95" y="90">
            ESP32
          </text>{" "}
          <rect x="190" y="60" width="70" height="50" />{" "}
          <text x="225" y="90">
            RELAY
          </text>{" "}
          <path className="mv-trace" d="M130 85 H190" />{" "}
          <path className="mv-trace" d="M95 110 V150 H225 V110" />{" "}
          <circle cx="95" cy="150" r="4" />
          <circle cx="225" cy="150" r="4" />{" "}
          <rect x="140" y="135" width="40" height="30" />{" "}
          <text x="160" y="154">
            PSU
          </text>{" "}
          <circle className="mv-led" cx="270" cy="45" r="6" />{" "}
        </svg>
      )}{" "}
      {kind === "robot" && (
        <svg viewBox="0 0 320 220" className="mv-bp">
          {" "}
          <path
            className="mv-track"
            d="M30 180 C 80 40, 160 40, 180 110 S 280 190, 300 50"
          />{" "}
          <g className="mv-bot">
            {" "}
            <rect x="-14" y="-10" width="28" height="20" rx="4" />{" "}
            <circle cx="-8" cy="12" r="4" />
            <circle cx="8" cy="12" r="4" />{" "}
          </g>{" "}
        </svg>
      )}{" "}
    </div>
  );
}
