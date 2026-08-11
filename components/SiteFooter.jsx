import Link from "next/link";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { navItems } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-950/10 bg-ink-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-clinic-500 text-white">
              <ShieldCheck aria-hidden="true" size={22} />
            </span>
            <span className="text-lg font-bold">MusaConsulting</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
            Scheduled clinical consultations, therapy follow-up, and care coordination with a privacy-first patient intake.
          </p>
          <p className="mt-5 max-w-md text-xs leading-5 text-white/55">
            Online booking is not for emergencies. If symptoms are urgent or life-threatening, contact local emergency services immediately.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/60">Navigate</h2>
          <nav className="mt-4 grid gap-3 text-sm text-white/75">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard" className="hover:text-white">
              Patient dashboard
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/60">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/75">
            <a href="mailto:care@musaconsulting.com" className="flex items-center gap-2 hover:text-white">
              <Mail aria-hidden="true" size={16} />
              care@musaconsulting.com
            </a>
            <p className="flex items-center gap-2">
              <MapPin aria-hidden="true" size={16} />
              Virtual care clinic
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} MusaConsulting. All rights reserved.
      </div>
    </footer>
  );
}
