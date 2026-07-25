"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn to Surf" },
  { href: "/spots", label: "Wave Breaks" },
  { href: "/explore", label: "Explore" },
  { href: "/shops", label: "Surf Shops" },
  { href: "/gear", label: "Gear Guide" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[var(--background)]/90 backdrop-blur dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span aria-hidden>🌊</span>
          Surfing 101
        </Link>

        <nav className="hidden gap-1 sm:flex">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : "text-slate-700 hover:bg-cyan-600/10 dark:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="rounded-md border border-black/10 px-3 py-1.5 text-sm font-medium sm:hidden dark:border-white/20"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-black/10 px-4 pb-3 sm:hidden dark:border-white/10">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-cyan-600 text-white" : "text-slate-700 hover:bg-cyan-600/10 dark:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
