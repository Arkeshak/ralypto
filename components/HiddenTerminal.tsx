"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { labOrder, labs, site, team } from "@/lib/content";

type Line = { kind: "in" | "out"; text: string };

const pages: Record<string, string> = {
  home: "/",
  software: "/software",
  creative: "/creative",
  hardware: "/hardware",
  work: "/work",
  about: "/about",
  contact: "/contact",
};

/* A small working terminal. Opens with the button or the ` key. */
export default function HiddenTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Type 'help' to see what you can do." },
  ]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function run(raw: string) {
    const [cmd, arg] = raw.trim().toLowerCase().split(/\s+/);
    const out = (text: string) => ({ kind: "out" as const, text });
    let res: Line[] = [];
    switch (cmd) {
      case "":
        break;
      case "help":
        res = [
          out("ls            list pages"),
          out("cd <page>     go to a page"),
          out("labs          what each lab does"),
          out("whoami        meet the team"),
          out("contact       how to reach us"),
          out("clear         clear the screen"),
          out("exit          close the terminal"),
        ];
        break;
      case "ls":
        res = [out(Object.keys(pages).join("   "))];
        break;
      case "cd":
        if (arg && pages[arg]) {
          router.push(pages[arg]);
          res = [out(`opening ${arg} ...`)];
          setTimeout(() => setOpen(false), 400);
        } else res = [out(`no page called '${arg ?? ""}'. Try 'ls'.`)];
        break;
      case "labs":
        res = labOrder.map((id) =>
          out(`${labs[id].name.padEnd(16)} ${labs[id].promise}`),
        );
        break;
      case "whoami":
        res = team.map((t) => out(`${t.name}, ${t.role}`));
        break;
      case "contact":
        res = [
          out(`email     ${site.email}`),
          out(`whatsapp  +${site.whatsapp}`),
          out("or run: cd contact"),
        ];
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        setOpen(false);
        return;
      case "sudo":
        res = [out("Nice try. Hire us instead: cd contact")];
        break;
      default:
        res = [out(`command not found: ${cmd}. Type 'help'.`)];
    }
    setLines((l) => [...l, { kind: "in", text: raw }, ...res]);
  }

  return (
    <>
      <button
        className="hterm-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? "Close terminal" : "Open terminal"} <kbd>`</kbd>
      </button>
      {open && (
        <div className="hterm" role="dialog" aria-label="Ralypto terminal">
          <div
            className="hterm__body"
            data-lenis-prevent
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <div
                key={i}
                className={l.kind === "in" ? "hterm__in" : "hterm__out"}
              >
                {l.kind === "in" && <span className="t-amber">$ </span>}
                {l.text}
              </div>
            ))}
            <form
              className="hterm__prompt"
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
            >
              <label htmlFor="hterm-input" className="t-amber">
                $
              </label>
              <input
                id="hterm-input"
                ref={inputRef}
                value={input}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Terminal command"
              />
            </form>
            <div ref={endRef} />
          </div>
        </div>
      )}
    </>
  );
}
