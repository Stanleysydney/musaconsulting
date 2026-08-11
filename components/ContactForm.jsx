"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

const initialForm = {
  name: "",
  email: "",
  topic: "booking",
  message: "",
  company: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await fetch("/api/contact", {
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

      setStatus({ type: "success", message: `Message received. Reference ${data.reference}.` });
      setForm(initialForm);
    } catch {
      setStatus({ type: "error", message: "The contact service is temporarily unavailable." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <Field label="Topic" error={errors.topic?.[0]}>
        <select
          value={form.topic}
          onChange={(event) => updateField("topic", event.target.value)}
          className="focus-ring h-12 w-full rounded-lg border border-ink-950/15 bg-white px-3 text-sm"
        >
          <option value="booking">Booking</option>
          <option value="records">Records</option>
          <option value="billing">Billing</option>
          <option value="general">General</option>
        </select>
      </Field>

      <Field label="Message" error={errors.message?.[0]}>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
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

      <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Send aria-hidden="true" size={18} />}
        {isSubmitting ? "Sending" : "Send message"}
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
