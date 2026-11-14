"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { labOrder, labs } from "@/lib/content";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);
  const zone = labOrder.find((id) => path.startsWith(labs[id].path)) ?? (path === "/" ? "home" : "brand");
  const inServices = labOrder.some((id) => path.startsWith(labs[id].path));

  const before = [{ href: "/", label: "Home" }];
  const after = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const closeAll = () => {
    setOpen(false);
    setDd(false);
  };

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!dd) return;
    const onDown = (e: PointerEvent) => {
      if (!ddRef.current?.contains(e.target as Node)) setDd(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDd(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dd]);

  const plain = (l: { href: string; label: string }) => (
    <Link
      key={l.href}
      href={l.href}
      aria-current={
        path === l.href || (l.href !== "/" && path.startsWith(l.href)) ? "page" : undefined
      }
      onClick={closeAll}
    >
      {l.label}
    </Link>
  );

  return (
    <header className={`nav nav--${zone}`}>
      <Link href="/" className="wordmark" aria-label="Ralypto home" onClick={closeAll}>
        <img
          className="wordmark__logo wordmark__logo--dark"
          src="/brand/ralypto-logo.svg"
          alt="Ralypto"
          width={690}
          height={200}
        />
        <img
          className="wordmark__logo wordmark__logo--light"
          src="/brand/ralypto-logo-light.svg"
          alt=""
          aria-hidden="true"
          width={690}
          height={200}
        />
      </Link>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav id="nav-links" className={`nav__links ${open ? "is-open" : ""}`}>
        {before.map(plain)}

        <div className={`nav__dd ${dd ? "is-open" : ""}`} ref={ddRef}>
          <Link
            href="/#services"
            aria-current={inServices ? "page" : undefined}
            onClick={closeAll}
          >
            Services
          </Link>
          <button
            type="button"
            className="nav__dd-btn"
            aria-expanded={dd}
            aria-controls="nav-services"
            aria-label="Show services menu"
            onClick={() => setDd(!dd)}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
              <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <ul id="nav-services" className="nav__menu">
            {labOrder.map((id) => (
              <li key={id}>
                <Link
                  href={labs[id].path}
                  data-lab={id}
                  aria-current={path.startsWith(labs[id].path) ? "page" : undefined}
                  onClick={closeAll}
                >
                  <i aria-hidden="true" />
                  <span>
                    <b>{labs[id].name}</b>
                    <small>{labs[id].doorLine}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {after.map(plain)}
        <Link href="/contact" className="nav__cta" onClick={closeAll}>
          Let’s Talk
        </Link>
      </nav>
    </header>
  );
}
