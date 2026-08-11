"use client";

import { AlertCircle, CalendarDays, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { serviceOptions } from "@/lib/site-data";
import { Button } from "./Button";

const contactOptions = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "video", label: "Video call" }
];

function buildAvailability() {
  const slots = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (let offset = 1; offset <= 21 && slots.length < 16; offset += 1) {
    const day = new Date(cursor);
    day.setDate(cursor.getDate() + offset);
    const weekday = day.getDay();

    if (weekday === 0 || weekday === 6) {
      continue;
    }

    const hours = weekday === 5 ? [9, 11, 13] : [9, 11, 14, 16];

    for (const hour of hours) {
      const slot = new Date(day);
      slot.setHours(hour, 0, 0, 0);
      slots.push({
        iso: slot.toISOString(),
        date: new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(slot),
        time: new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(slot)
      });

      if (slots.length >= 16) {
        break;
      }
    }
  }

  return slots;
}

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: serviceOptions[0].id,
  slot: "",
  preferredContact: "email",
  notes: "",
  company: ""
};

export function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [slots, setSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const availability = buildAvailability();
    setSlots(availability);
    setForm((current) => ({ ...current, slot: availability[0]?.iso || "" }));
  }, []);

  const selectedService = useMemo(
    () => serviceOptions.find((service) => service.id === form.service) || serviceOptions[0],
    [form.service]
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrors({});

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setErrors(data.errors || {});
        setStatus({ type: "error", message: data.message || "Please check the form and try again." });
        return;
      }

      setStatus({
        type: "success",
        message: `Request received. Reference ${data.reference}.`
      });
      setForm({ ...initialForm, service: form.service, slot: slots[0]?.iso || "" });
    } catch {
      setStatus({ type: "error", message: "The booking service is temporarily unavailable." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" error={errors.name?.[0]}>
          <input
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="focus-ring h-12 w-full rounded-lg border border-ink-950/15 bg-white px-3 text-sm"
          />
        </Field>
        <Field label="Email" error={errors.email?.[0]}>
          <input
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="focus-ring h-12 w-full rounded-lg border border-ink-950/15 bg-white px-3 text-sm"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.[0]}>
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="focus-ring h-12 w-full rounded-lg border border-ink-950/15 bg-white px-3 text-sm"
          />
        </Field>
        <Field label="Preferred contact" error={errors.preferredContact?.[0]}>
          <select
            value={form.preferredContact}
            onChange={(event) => updateField("preferredContact", event.target.value)}
            className="focus-ring h-12 w-full rounded-lg border border-ink-950/15 bg-white px-3 text-sm"
          >
            {contactOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <label className="text-sm font-bold text-ink-950">Service</label>
          <span className="text-xs font-semibold text-ink-500">
            {selectedService.duration} · {selectedService.price}
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((service) => (
            <label
              key={service.id}
              className={`cursor-pointer rounded-lg border p-4 transition ${
                form.service === service.id ? "border-clinic-600 bg-clinic-50" : "border-ink-950/12 bg-white hover:border-clinic-500"
              }`}
            >
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={form.service === service.id}
                onChange={(event) => updateField("service", event.target.value)}
                className="sr-only"
              />
              <span className="block text-sm font-bold text-ink-950">{service.name}</span>
              <span className="mt-1 block text-sm leading-5 text-ink-500">{service.summary}</span>
            </label>
          ))}
        </div>
        {errors.service?.[0] ? <p className="mt-2 text-sm font-medium text-clay-700">{errors.service[0]}</p> : null}
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-950">
          <CalendarDays aria-hidden="true" size={17} />
          Available times
        </div>
        <div className="grid max-h-80 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((slot) => (
            <label
              key={slot.iso}
              className={`cursor-pointer rounded-lg border p-3 transition ${
                form.slot === slot.iso ? "border-clinic-600 bg-clinic-50" : "border-ink-950/12 bg-white hover:border-clinic-500"
              }`}
            >
              <input
                type="radio"
                name="slot"
                value={slot.iso}
                checked={form.slot === slot.iso}
                onChange={(event) => updateField("slot", event.target.value)}
                className="sr-only"
              />
              <span className="block text-sm font-bold text-ink-950">{slot.date}</span>
              <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-ink-500">
                <Clock aria-hidden="true" size={14} />
                {slot.time}
              </span>
            </label>
          ))}
        </div>
        {errors.slot?.[0] ? <p className="mt-2 text-sm font-medium text-clay-700">{errors.slot[0]}</p> : null}
      </div>

      <Field label="What should the clinician know before the visit?" error={errors.notes?.[0]}>
        <textarea
          required
          rows={5}
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          className="focus-ring w-full resize-y rounded-lg border border-ink-950/15 bg-white px-3 py-3 text-sm leading-6"
        />
      </Field>

      <input
        tabIndex="-1"
        autoComplete="off"
        value={form.company}
        onChange={(event) => updateField("company", event.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {status ? (
        <div
          className={`flex items-start gap-3 rounded-lg border p-4 text-sm ${
            status.type === "success" ? "border-clinic-600/25 bg-clinic-50 text-clinic-700" : "border-clay-500/25 bg-clay-50 text-clay-700"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 aria-hidden="true" size={20} /> : <AlertCircle aria-hidden="true" size={20} />}
          <p className="font-semibold">{status.message}</p>
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={isSubmitting || !form.slot}>
        {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <CalendarDays aria-hidden="true" size={18} />}
        {isSubmitting ? "Sending request" : "Request appointment"}
      </Button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-ink-950">{label}</span>
      {children}
      {error ? <span className="text-sm font-medium text-clay-700">{error}</span> : null}
    </label>
  );
}
