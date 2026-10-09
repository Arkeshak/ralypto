"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ModelId } from "./HardwareScene";

/* The 3D scene only loads in the browser, and only once the viewer scrolls into view. */
const HardwareScene = dynamic(() => import("./HardwareScene"), {
  ssr: false,
  loading: () => <p className="h3d__loading">Loading 3D model ...</p>,
});

const models: { id: ModelId; name: string; blurb: string; specs: [string, string][] }[] = [
  {
    id: "arm",
    name: "Robot arm",
    blurb: "A four-joint arm that picks and places parts. Every joint is a servo we program and tune.",
    specs: [
      ["Joints", "4 servos + gripper"],
      ["Reach", "32 cm"],
      ["Brain", "ESP32"],
      ["Built in", "Fusion 360, 3D print"],
    ],
  },
  {
    id: "meter",
    name: "Smart water meter",
    blurb: "Clips onto a pipe, measures flow, and sends daily usage and leak alerts to your phone.",
    specs: [
      ["Sensor", "Hall-effect flow"],
      ["Link", "Wi-Fi to phone app"],
      ["Power", "Mains + backup cell"],
      ["Alert", "Leaks within 1 hour"],
    ],
  },
  {
    id: "controller",
    name: "Pump controller",
    blurb: "Switches a water pump from tank level, with dry-run protection and a phone switch.",
    specs: [
      ["Board", "Custom PCB, KiCad"],
      ["Switching", "2 relays, 10 A"],
      ["Control", "Float sensors + app"],
      ["Case", "IP54 enclosure"],
    ],
  },
];

export default function HardwareViewer({ compact = false }: { compact?: boolean }) {
  const [model, setModel] = useState<ModelId>("arm");
  const [labels, setLabels] = useState(true);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const m = models.find((x) => x.id === model)!;

  return (
    <div className={`h3d ${compact ? "h3d--compact" : ""}`}>
      <div className="h3d__stage" ref={stageRef}>
        {visible && <HardwareScene model={model} labels={labels} animate={animate} />}
        <p className="h3d__hint" aria-hidden="true">
          Drag to turn it around
        </p>
      </div>

      <div className="h3d__panel">
        <div className="h3d__tabs" role="tablist" aria-label="Choose a model">
          {models.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={model === x.id}
              onClick={() => setModel(x.id)}
            >
              {x.name}
            </button>
          ))}
        </div>

        <h3>{m.name}</h3>
        <p>{m.blurb}</p>

        <table className="title-block h3d__specs">
          <tbody>
            {m.specs.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <label className="h3d__toggle">
          <input
            type="checkbox"
            checked={labels}
            onChange={(e) => setLabels(e.target.checked)}
          />
          Show part names
        </label>

        <Link href="/contact?need=hardware" className="btn">
          Build a device like this
        </Link>
      </div>
    </div>
  );
}
