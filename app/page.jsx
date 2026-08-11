import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  HeartPulse,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  Stethoscope,
  Video
} from "lucide-react";
import { buttonStyles } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { carePrinciples, faqs, serviceOptions, testimonials } from "@/lib/site-data";

const processSteps = [
  {
    title: "Secure intake",
    text: "Patients submit only the details needed to prepare for care.",
    icon: ClipboardCheck
  },
  {
    title: "Clinical review",
    text: "The clinician reviews symptoms, history, medications, and next-step risks.",
    icon: Stethoscope
  },
  {
    title: "Documented plan",
    text: "After the visit, patients receive clear follow-up guidance and a reference record.",
    icon: FileText
  }
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[82svh] overflow-hidden bg-ink-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=82&w=2400"
          alt="Clinician speaking with a patient in a modern consultation room"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink-950/68" />

        <div className="mx-auto flex min-h-[82svh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white/85 backdrop-blur">
              Private telehealth and specialist care coordination
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
              MusaConsulting
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              Schedule measured clinical consultations, therapy follow-up, medication reviews, and care coordination without exposing your data to unnecessary systems.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className={buttonStyles({ size: "lg" })}>
                Book consultation
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href="#services" className={buttonStyles({ variant: "outline", size: "lg" }) + " border-white/35 bg-white/10 text-white hover:border-white hover:text-white"}>
                View services
              </Link>
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              {[
                ["4", "care tracks"],
                ["90 days", "booking window"],
                ["7 days", "portal sessions"],
                ["0", "card data stored"]
              ].map(([value, label]) => (
                <div key={label} className="border-l border-white/24 pl-4">
                  <dt className="text-2xl font-bold text-white">{value}</dt>
                  <dd className="mt-1 text-white/65">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Services</p>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Care options built for scheduled clinical work.</h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-ink-500">
              The site now avoids vague claims and routes visitors into specific care paths. Each request is validated server-side and can be stored in MongoDB when credentials are configured.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceOptions.map((service) => (
              <article key={service.id} className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-clinic-50 text-clinic-700">
                  <HeartPulse aria-hidden="true" size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink-950">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-500">{service.summary}</p>
                <div className="mt-5 flex items-center justify-between border-t border-ink-950/10 pt-4 text-sm font-semibold">
                  <span className="text-ink-700">{service.duration}</span>
                  <span className="text-clinic-700">{service.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#eef3f1] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Process</p>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Prepared visits, fewer loose ends.</h2>
              <p className="mt-5 text-base leading-7 text-ink-500">
                Booking is structured around the information a clinician needs before a consultation: patient identity, preferred contact, service type, appointment slot, and relevant notes.
              </p>
              <ul className="mt-6 grid gap-3">
                {carePrinciples.map((principle) => (
                  <li key={principle} className="flex gap-3 text-sm font-semibold text-ink-700">
                    <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-clinic-700" size={18} />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-white">
                        <Icon aria-hidden="true" size={21} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-pulse-600">Step {index + 1}</p>
                        <h3 className="mt-1 text-lg font-bold text-ink-950">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink-500">{step.text}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="doctor" className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-ink-950">
            <Image
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=82&w=1400"
              alt="Clinician in a white coat"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="self-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Clinician</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Dr. Musa Ashraf</h2>
            <p className="mt-5 text-lg leading-8 text-ink-500">
              MusaConsulting is presented as a focused clinical practice rather than a generic health landing page. The redesigned copy keeps patient expectations grounded: scheduled visits, clinical review, documentation, and follow-up coordination.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Intake", "Structured before the visit"],
                ["Privacy", "Minimal necessary collection"],
                ["Follow-up", "Clear next actions"]
              ].map(([title, text]) => (
                <div key={title} className="rounded-lg border border-ink-950/10 bg-[#f7f8fa] p-4">
                  <p className="font-bold text-ink-950">{title}</p>
                  <p className="mt-2 text-sm leading-5 text-ink-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-100">Security</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">Built to reduce obvious attack surface.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Validated forms", "All intake, contact, login, and registration payloads are parsed with strict schemas."],
              ["Safer sessions", "Portal access uses httpOnly cookies instead of localStorage tokens."],
              ["Origin checks", "Mutating API routes reject unexpected origins and unsupported content types."],
              ["No raw errors", "Users see stable messages while server logs keep operational detail."]
            ].map(([title, text]) => (
              <article key={title} className="rounded-lg border border-white/10 bg-white/6 p-5">
                <LockKeyhole aria-hidden="true" className="text-clinic-100" size={22} />
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Patient feedback</p>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Small details that make care easier to follow.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <article key={item.name} className="rounded-lg border border-ink-950/10 bg-[#f7f8fa] p-5">
                  <MessageSquareText aria-hidden="true" className="text-clinic-700" size={22} />
                  <p className="mt-4 text-sm leading-6 text-ink-700">"{item.quote}"</p>
                  <p className="mt-4 text-sm font-bold text-ink-950">{item.name}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-ink-950/10 bg-white p-5">
                <h3 className="font-bold text-ink-950">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-500">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#eef3f1] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Contact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Reach the care team.</h2>
            <p className="mt-5 text-base leading-7 text-ink-500">
              Use booking for appointments and contact for records, billing, or general coordination. Messages are rate-limited, validated, and stored only when the database is configured.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className={buttonStyles({ size: "lg" })}>
                <CalendarCheck aria-hidden="true" size={18} />
                Request appointment
              </Link>
              <a href="mailto:care@musaconsulting.com" className={buttonStyles({ variant: "outline", size: "lg" })}>
                Email care team
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-soft sm:p-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
