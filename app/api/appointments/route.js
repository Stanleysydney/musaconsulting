import { apiJson, createReference, enforceSameOrigin, hashIp, originFailure, parseJsonBody, rateLimit, rateLimitFailure } from "@/lib/security";
import { bookingSchema, serviceNameFor, zodErrors } from "@/lib/validation";
import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { canUseDevStore, getDevStore } from "@/lib/dev-store";
import { sendEmail } from "@/lib/email";
import Appointment from "@/lib/models/Appointment";

export async function POST(request) {
  if (!enforceSameOrigin(request)) {
    return originFailure();
  }

  const limit = rateLimit(request, { key: "appointments", limit: 6, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return rateLimitFailure(limit.retryAfter);
  }

  const parsedBody = await parseJsonBody(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  if (typeof parsedBody.json?.company === "string" && parsedBody.json.company.length > 0) {
    return apiJson({ ok: true, reference: createReference("MC") }, { status: 202 });
  }

  const parsed = bookingSchema.safeParse(parsedBody.json);
  if (!parsed.success) {
    return apiJson(
      { ok: false, message: "Please check the highlighted fields.", errors: zodErrors(parsed.error) },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const reference = createReference("MC");
  const appointment = {
    reference,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    service: data.service,
    slot: new Date(data.slot),
    preferredContact: data.preferredContact,
    notes: data.notes,
    status: "requested",
    source: "website",
    metadata: {
      ipHash: hashIp(request),
      userAgent: (request.headers.get("user-agent") || "").slice(0, 300)
    }
  };

  try {
    if (hasDatabaseConfig()) {
      await connectToDatabase();
      await Appointment.create(appointment);
    } else if (canUseDevStore()) {
      getDevStore().appointments.push(appointment);
    } else {
      return apiJson({ ok: false, message: "Booking is not configured yet." }, { status: 503 });
    }

    const serviceName = serviceNameFor(data.service);
    const slotText = new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(appointment.slot);

    await Promise.allSettled([
      sendEmail({
        to: data.email,
        subject: `MusaConsulting appointment request ${reference}`,
        text: [
          `Hello ${data.name},`,
          "",
          `We received your ${serviceName} request for ${slotText}.`,
          `Reference: ${reference}`,
          "",
          "The care team will confirm the appointment details by your preferred contact method.",
          "",
          "MusaConsulting"
        ].join("\n")
      }),
      sendEmail({
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `New MusaConsulting appointment request ${reference}`,
        replyTo: data.email,
        text: [
          `Reference: ${reference}`,
          `Patient: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "Not provided"}`,
          `Service: ${serviceName}`,
          `Slot: ${slotText}`,
          `Preferred contact: ${data.preferredContact}`,
          "",
          data.notes
        ].join("\n")
      })
    ]);

    return apiJson({ ok: true, reference }, { status: 201 });
  } catch (error) {
    console.error("Appointment request failed", error);
    return apiJson({ ok: false, message: "Unable to save the appointment request." }, { status: 500 });
  }
}
