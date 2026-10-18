"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow, Mark } from "./icons";
const links = [
  ["/solutions/", "Solutions"],
  ["/projects/", "Projects"],
  ["/blog/", "Articles"],
  ["/videos/", "Videos"],
  ["/about/", "About"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="BuildWithIkram home">
          <Mark />
          <span>
            BuildWith<span className="brand-accent">Ikram</span>
            <span className="brand-dot">.</span>
          </span>
        </Link>
        <button
          ref={button}
          className="menu-toggle"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close ✕" : "Menu ☰"}
        </button>
        <nav
          id="primary-nav"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname.startsWith(href.slice(0, -1)) ? "page" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/contact/"
            onClick={() => setOpen(false)}
          >
            Let’s talk <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}
