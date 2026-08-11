import Link from "next/link";
import { CalendarDays, HeartPulse, ShieldCheck } from "lucide-react";
import { navItems } from "@/lib/site-data";
import { buttonStyles } from "./Button";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-950/10 bg-white/92 backdrop-blur">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-clinic-600 text-white">
            <HeartPulse aria-hidden="true" size={24} />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-normal text-ink-950">MusaConsulting</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-clinic-700">Clinical care</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-lg text-sm font-semibold text-ink-700 hover:text-clinic-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className={buttonStyles({ variant: "ghost", size: "md" })}>
            <ShieldCheck aria-hidden="true" size={17} />
            Portal
          </Link>
          <Link href="/book" className={buttonStyles({ size: "md" })}>
            <CalendarDays aria-hidden="true" size={17} />
            Book
          </Link>
        </div>

        <MobileMenu navItems={navItems} />
      </div>
    </header>
  );
}
