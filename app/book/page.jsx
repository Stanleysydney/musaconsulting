import Link from "next/link";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { serviceOptions } from "@/lib/site-data";

export const metadata = {
  title: "Book a Consultation",
  description: "Request a MusaConsulting appointment through secure intake."
};

export default function BookPage() {
  return (
    <section className="bg-[#f7f8fa] py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.35fr] lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Booking</p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Request a consultation.</h1>
          <p className="mt-5 text-base leading-7 text-ink-500">
            Choose a service, select an available time, and share the context needed to prepare for the visit.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-lg border border-clay-500/25 bg-clay-50 p-4 text-sm leading-6 text-clay-700">
              <div className="mb-2 flex items-center gap-2 font-bold">
                <AlertTriangle aria-hidden="true" size={18} />
                Emergency care
              </div>
              This form is not monitored for emergencies. Use local emergency services for urgent or life-threatening symptoms.
            </div>
            <div className="rounded-lg border border-ink-950/10 bg-white p-4 text-sm leading-6 text-ink-500">
              <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                <ShieldCheck aria-hidden="true" size={18} />
                Privacy-first intake
              </div>
              Intake is reviewed with a privacy-first workflow before the appointment is confirmed.
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-ink-950/10 bg-white p-5">
            <h2 className="font-bold text-ink-950">Available service tracks</h2>
            <ul className="mt-4 grid gap-3">
              {serviceOptions.map((service) => (
                <li key={service.id} className="flex gap-3 text-sm text-ink-500">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-clinic-700" size={17} />
                  <span>
                    <span className="font-semibold text-ink-950">{service.name}</span> - {service.duration}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-sm text-ink-500">
            Already have access?{" "}
            <Link href="/login" className="font-bold text-clinic-700">
              Sign in to the portal
            </Link>
          </p>
        </aside>

        <div className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-soft sm:p-7">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
