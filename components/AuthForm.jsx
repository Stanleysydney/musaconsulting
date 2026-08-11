"use client";

import { AlertCircle, Loader2, LockKeyhole, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./Button";

const initialForm = {
  name: "",
  email: "",
  password: ""
};

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [nextPath, setNextPath] = useState("/dashboard");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const requested = new URL(window.location.href).searchParams.get("next");
    if (requested?.startsWith("/") && !requested.startsWith("//")) {
      setNextPath(requested);
    }
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrors({});

    const payload = mode === "register" ? form : { email: form.email, password: form.password };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setErrors(data.errors || {});
        setStatus({ type: "error", message: data.message || "Unable to complete sign in." });
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setStatus({ type: "error", message: "The patient portal is temporarily unavailable." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-ink-950/10 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-clinic-50 text-clinic-700">
          {mode === "login" ? <LockKeyhole aria-hidden="true" size={22} /> : <UserPlus aria-hidden="true" size={22} />}
        </span>
        <div>
          <h1 className="text-2xl font-bold text-ink-950">{mode === "login" ? "Patient portal" : "Create patient access"}</h1>
          <p className="mt-1 text-sm text-ink-500">Session cookies are httpOnly and expire automatically.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
        {mode === "register" ? (
          <Field label="Full name" error={errors.name?.[0]}>
            <input
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="focus-ring h-12 w-full rounded-lg border border-ink-950/15 bg-white px-3 text-sm"
            />
          </Field>
        ) : null}

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

        <Field label="Password" error={errors.password?.[0]}>
          <input
            required
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="focus-ring h-12 w-full rounded-lg border border-ink-950/15 bg-white px-3 text-sm"
          />
        </Field>

        {status ? (
          <div className="flex items-start gap-3 rounded-lg border border-clay-500/25 bg-clay-50 p-4 text-sm text-clay-700">
            <AlertCircle aria-hidden="true" size={20} />
            <p className="font-semibold">{status.message}</p>
          </div>
        ) : null}

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <LockKeyhole aria-hidden="true" size={18} />}
          {mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>

      <div className="mt-5 border-t border-ink-950/10 pt-5 text-sm text-ink-500">
        {mode === "login" ? "Need access?" : "Already have access?"}
        <button
          type="button"
          onClick={() => {
            setMode((current) => (current === "login" ? "register" : "login"));
            setErrors({});
            setStatus(null);
          }}
          className="focus-ring ml-2 rounded-lg font-bold text-clinic-700"
        >
          {mode === "login" ? "Create an account" : "Sign in"}
        </button>
      </div>
    </div>
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
