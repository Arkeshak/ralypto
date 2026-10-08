"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { labOrder, labs } from "@/lib/content";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const zone = labOrder.find((id) => path.startsWith(labs[id].path)) ?? "brand";

  const links = [
    ...labOrder.map((id) => ({
      href: labs[id].path,
      label: labs[id].name,
      lab: id,
    })),
    { href: "/work", label: "Work", lab: "" },
    { href: "/about", label: "About", lab: "" },
  ];

  return (
    <header className={`nav nav--${zone}`}>
      <Link
        href="/"
        className="wordmark"
        aria-label="Ralypto home"
        onClick={() => setOpen(false)}
      >
        <span className="wordmark__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <svg
          width="80"
          height="24"
          viewBox="0 0 80 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Ralypto"
        >
          <text
            x="0"
            y="18"
            fontFamily="inherit"
            fontSize="20"
            fontWeight="bold"
          >
            ralypto
          </text>
        </svg>
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
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-lab={l.lab}
            aria-current={
              path === l.href || (l.href !== "/" && path.startsWith(l.href))
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="nav__cta"
          onClick={() => setOpen(false)}
        >
          Start a project
        </Link>
      </nav>
    </header>
  );
}
