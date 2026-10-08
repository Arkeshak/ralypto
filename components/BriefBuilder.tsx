"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { labOrder, labs, site, LabId } from "@/lib/content";

const timelines = ["As soon as possible", "Within a month", "In 1 to 3 months", "Just exploring"];
const budgets = ["Under LKR 50,000", "LKR 50,000 to 200,000", "LKR 200,000 to 500,000", "Over LKR 500,000", "Not sure yet"];
const stepTitles = ["What do you need?", "Tell us the idea", "Timing and budget", "Your details"];

export default function BriefBuilder() {
  const params = useSearchParams();
  const initial = params.get("need") as LabId | null;
  const [step, setStep] = useState(0);
  const [needs, setNeeds] = useState<LabId[]>(initial && labs[initial] ? [initial] : []);
  const [idea, setIdea] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const toggle = (id: LabId) =>
    setNeeds((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]));

  const message = useMemo(
    () =>
      [
        `Hi Ralypto, I'm ${name || "..."}.`,
        `I need: ${needs.map((n) => labs[n].name).join(", ") || "..."}`,
        `Idea: ${idea || "..."}`,
        `Timeline: ${timeline || "..."}`,
        `Budget: ${budget || "..."}`,
        `Reach me at: ${contact || "..."}`,
      ].join("\n"),
    [name, needs, idea, timeline, budget, contact]
  );

  function nextStep() {
    const problems: (string | null)[] = [
      needs.length === 0 ? "Pick at least one lab to continue." : null,
      idea.trim().length < 10 ? "Describe the idea in a sentence or two to continue." : null,
      null,
      !name.trim() || !contact.trim() ? "Add your name and an email or phone number to send the brief." : null,
    ];
    const p = problems[step];
    if (p) { setError(p); return false; }
    setError("");
    return true;
  }

  return (
    <div className="brief">
      <ol className="brief__progress" aria-label="Steps">
        {stepTitles.map((t, i) => (
          <li key={t} aria-current={i === step ? "step" : undefined} className={i < step ? "is-done" : ""}>
            {t}
          </li>
        ))}
      </ol>

      <div className="brief__panel">
        <h2>{stepTitles[step]}</h2>

        {step === 0 && (
          <>
            <div className="brief__labs">
              {labOrder.map((id) => (
                <button
                  key={id}
                  className={`brief__lab brief__lab--${id}`}
                  aria-pressed={needs.includes(id)}
                  onClick={() => toggle(id)}
                >
                  <strong>{labs[id].name}</strong>
                  <span>{labs[id].doorLine}</span>
                </button>
              ))}
            </div>
            {needs.length > 1 && (
              <p className="brief__note">Good choice. Our labs work together on projects like this, with one point of contact.</p>
            )}
          </>
        )}

        {step === 1 && (
          <label className="field">
            <span>What do you want to make, and what problem does it solve?</span>
            <textarea rows={6} value={idea} onChange={(e) => setIdea(e.target.value)} />
          </label>
        )}

        {step === 2 && (
          <>
            <fieldset className="choices">
              <legend>When do you need it?</legend>
              {timelines.map((t) => (
                <button key={t} aria-pressed={timeline === t} onClick={() => setTimeline(t)}>{t}</button>
              ))}
            </fieldset>
            <fieldset className="choices">
              <legend>Rough budget</legend>
              {budgets.map((b) => (
                <button key={b} aria-pressed={budget === b} onClick={() => setBudget(b)}>{b}</button>
              ))}
            </fieldset>
          </>
        )}

        {step === 3 && (
          <>
            <label className="field">
              <span>Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="field">
              <span>Email or phone</span>
              <input value={contact} onChange={(e) => setContact(e.target.value)} />
            </label>
            <div className="brief__preview">
              <h3>Your brief</h3>
              <pre>{message}</pre>
            </div>
          </>
        )}

        {error && <p className="brief__error" role="alert">{error}</p>}

        <div className="brief__nav">
          {step > 0 && <button className="btn btn--ghost" onClick={() => { setError(""); setStep(step - 1); }}>Back</button>}
          {step < 3 && <button className="btn" onClick={() => nextStep() && setStep(step + 1)}>Next</button>}
          {step === 3 && (
            <>
              <a
                className="btn"
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`}
                target="_blank" rel="noreferrer"
                onClick={(e) => { if (!nextStep()) e.preventDefault(); }}
              >
                Send on WhatsApp
              </a>
              <a
                className="btn btn--ghost"
                href={`mailto:${site.email}?subject=${encodeURIComponent("New project brief")}&body=${encodeURIComponent(message)}`}
                onClick={(e) => { if (!nextStep()) e.preventDefault(); }}
              >
                Send by email
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
