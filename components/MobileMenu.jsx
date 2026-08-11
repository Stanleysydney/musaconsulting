"use client";

import Link from "next/link";
import { CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";
import { buttonStyles } from "./Button";

export function MobileMenu({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-950/10 bg-white text-ink-900"
      >
        {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
      </button>

      {isOpen ? (
        <div className="absolute inset-x-4 top-[72px] rounded-lg border border-ink-950/10 bg-white p-4 shadow-soft">
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="focus-ring rounded-lg px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-950/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid gap-2 border-t border-ink-950/10 pt-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="focus-ring rounded-lg px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-950/5"
            >
              Patient portal
            </Link>
            <Link href="/book" onClick={() => setIsOpen(false)} className={buttonStyles({ size: "md" })}>
              <CalendarDays aria-hidden="true" size={18} />
              Book consultation
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
