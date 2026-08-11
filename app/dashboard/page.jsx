import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, Clock, FileText, ShieldCheck } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import { buttonStyles } from "@/components/Button";
import { getSessionUser } from "@/lib/auth";
import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { canUseDevStore, getDevStore } from "@/lib/dev-store";
import Appointment from "@/lib/models/Appointment";
import { serviceNameFor } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Patient Dashboard",
  description: "View MusaConsulting appointment requests and portal status."
};

async function loadAppointments(email) {
  if (hasDatabaseConfig()) {
    try {
      await connectToDatabase();
      const appointments = await Appointment.find({ email }).sort({ slot: 1 }).limit(8).lean();
      return appointments.map((appointment) => ({
        reference: appointment.reference,
        service: appointment.service,
        slot: appointment.slot,
        status: appointment.status
      }));
    } catch (error) {
      console.error("Dashboard appointment load failed", error);
      return [];
    }
  }

  if (canUseDevStore()) {
    return getDevStore()
      .appointments.filter((appointment) => appointment.email === email)
      .slice(-8)
      .reverse();
  }

  return [];
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Pending";
  }

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const appointments = await loadAppointments(user.email);
  const nextAppointment = appointments.find((appointment) => new Date(appointment.slot) >= new Date());

  return (
    <section className="bg-[#f7f8fa] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 border-b border-ink-950/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Patient dashboard</p>
            <h1 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Hello, {user.name}.</h1>
            <p className="mt-3 text-base text-ink-500">{user.email}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className={buttonStyles({ size: "md" })}>
              <CalendarDays aria-hidden="true" size={17} />
              New appointment
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-sm">
            <CalendarDays aria-hidden="true" className="text-clinic-700" size={23} />
            <p className="mt-4 text-sm font-semibold text-ink-500">Next appointment</p>
            <h2 className="mt-2 text-xl font-bold text-ink-950">{nextAppointment ? formatDate(nextAppointment.slot) : "No upcoming request"}</h2>
          </article>
          <article className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-sm">
            <FileText aria-hidden="true" className="text-pulse-600" size={23} />
            <p className="mt-4 text-sm font-semibold text-ink-500">Appointment requests</p>
            <h2 className="mt-2 text-xl font-bold text-ink-950">{appointments.length}</h2>
          </article>
          <article className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-sm">
            <ShieldCheck aria-hidden="true" className="text-clinic-700" size={23} />
            <p className="mt-4 text-sm font-semibold text-ink-500">Session status</p>
            <h2 className="mt-2 text-xl font-bold text-ink-950">Secured</h2>
          </article>
        </div>

        <div className="mt-8 rounded-lg border border-ink-950/10 bg-white shadow-sm">
          <div className="border-b border-ink-950/10 p-5">
            <h2 className="text-lg font-bold text-ink-950">Recent appointment requests</h2>
          </div>
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-[#f7f8fa] text-xs uppercase tracking-[0.12em] text-ink-500">
                  <tr>
                    <th className="px-5 py-3">Reference</th>
                    <th className="px-5 py-3">Service</th>
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-950/10">
                  {appointments.map((appointment) => (
                    <tr key={appointment.reference}>
                      <td className="px-5 py-4 font-bold text-ink-950">{appointment.reference}</td>
                      <td className="px-5 py-4 text-ink-700">{serviceNameFor(appointment.service)}</td>
                      <td className="px-5 py-4 text-ink-500">{formatDate(appointment.slot)}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-clinic-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-clinic-700">
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-3 p-8 text-center">
              <Clock aria-hidden="true" className="mx-auto text-ink-500" size={28} />
              <p className="font-bold text-ink-950">No appointment requests yet.</p>
              <p className="text-sm text-ink-500">New booking requests attached to your email will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
