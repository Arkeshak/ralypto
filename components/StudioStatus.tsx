"use client";

import { useEffect, useState } from "react";

/* Live studio clock in Sri Lanka time, with an honest note on when we'll reply. */
export default function StudioStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <p className="status" aria-hidden="true">&nbsp;</p>;

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Colombo",
    hour: "numeric",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = Number(get("hour"));
  const open = get("weekday") !== "Sun" && hour >= 9 && hour < 19;
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Colombo",
    hour: "numeric",
    minute: "2-digit",
  }).format(now);

  return (
    <p className={`status ${open ? "is-open" : ""}`}>
      <span className="status__dot" aria-hidden="true" />
      {open ? (
        <>Studio open now, {time} in Sri Lanka</>
      ) : (
        <>Studio closed, {time} in Sri Lanka. We reply in the morning.</>
      )}
    </p>
  );
}
