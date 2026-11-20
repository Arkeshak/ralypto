"use client";

import { useEffect, useState, useCallback } from "react";

const KEYBOARD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const EASTER_EGGS: Record<string, { title: string; desc: string }> = {
  chipi: {
    title: "CHIPI Companion Activated!",
    desc: "OLED expressions calibrated & Petting sensor online. 🐾",
  },
  code: {
    title: "Software Lab Shell Connected",
    desc: "AI automation & enterprise workflows compiled. ⚡",
  },
  robot: {
    title: "Hardware Lab Controller Online",
    desc: "Autonomous agricultural & IoT actuators primed. 🤖",
  },
};

/**
 * Playable Hardware Console Keyboard
 * Matches yuyk.in's interactive playable mechanical keyboard feature:
 * Visitors can press on-screen tactile keys or type on their physical keyboard,
 * triggering authentic mechanical depression, light-up glow, and hidden easter egg reveals.
 */
export default function InteractiveConsole() {
  const [typed, setTyped] = useState("ralypto");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [unlockedMsg, setUnlockedMsg] = useState<{ title: string; desc: string } | null>(null);

  const pressKey = useCallback((char: string) => {
    const key = char.toLowerCase();
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 150);

    setTyped((prev) => {
      const next = (prev + key).slice(-12);
      // Check easter eggs
      for (const [trigger, data] of Object.entries(EASTER_EGGS)) {
        if (next.endsWith(trigger)) {
          setUnlockedMsg(data);
          break;
        }
      }
      return next;
    });
  }, []);

  // Listen to real physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or textarea
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      const char = e.key.toLowerCase();
      if (/^[a-z]$/.test(char)) {
        pressKey(char);
      } else if (e.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pressKey]);

  return (
    <section className="yk-console-sec" data-theme="navy" aria-label="Playable tactile hardware console">
      <div className="hm-wrap">
        <header className="hm-head" style={{ marginBottom: "2rem" }}>
          <p className="hm-tag" style={{ color: "#ffaf0d", marginBottom: "0.4rem" }}>
            Hardware Lab · Interactive Prototype
          </p>
          <h2 style={{ color: "#fff" }}>Play with the console.</h2>
          <p style={{ color: "#9aa6c8" }}>
            Tap or type on your physical keyboard. Try typing <strong>&ldquo;chipi&rdquo;</strong>, <strong>&ldquo;code&rdquo;</strong>, or <strong>&ldquo;robot&rdquo;</strong>.
          </p>
        </header>

        <div className="yk-console">
          {/* Virtual OLED Screen Terminal */}
          <div className="yk-console__screen">
            <div className="yk-console__prompt">
              <span>RALYPTO_OS:~$</span>
              <strong>{typed || "..."}</strong>
              <span className="yk-console__cursor" aria-hidden="true" />
            </div>
            <span className="yk-console__hint">[Click or Type]</span>
          </div>

          {/* Interactive Mechanical Keys */}
          <div className="yk-console__keys" role="group" aria-label="Tactile mechanical keypad">
            {KEYBOARD_ROWS.map((row, rowIdx) => (
              <div key={rowIdx} className="yk-console__row">
                {row.split("").map((k) => {
                  const isDown = activeKey === k;
                  const isLit = typed.endsWith(k);
                  return (
                    <button
                      key={k}
                      type="button"
                      className={`yk-key ${isDown ? "is-down" : ""} ${isLit ? "is-lit" : ""}`}
                      onClick={() => pressKey(k)}
                      aria-label={`Key ${k.toUpperCase()}`}
                    >
                      <span>{k.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Easter Egg Feedback Toast */}
          {unlockedMsg && (
            <div className="yk-console__toast" role="status">
              <span>✦</span>
              <strong>{unlockedMsg.title}:</strong>
              <span>{unlockedMsg.desc}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
