import { apiJson, createReference, enforceSameOrigin, hashIp, originFailure, parseJsonBody, rateLimit, rateLimitFailure } from "@/lib/security";
import { contactSchema, zodErrors } from "@/lib/validation";
import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { canUseDevStore, getDevStore } from "@/lib/dev-store";
import { sendEmail } from "@/lib/email";
import ContactInquiry from "@/lib/models/ContactInquiry";

export async function POST(request) {
  if (!enforceSameOrigin(request)) {
    return originFailure();
  }

  const limit = rateLimit(request, { key: "contact", limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return rateLimitFailure(limit.retryAfter);
  }

  const parsedBody = await parseJsonBody(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  if (typeof parsedBody.json?.company === "string" && parsedBody.json.company.length > 0) {
    return apiJson({ ok: true, reference: createReference("MSG") }, { status: 202 });
  }

  const parsed = contactSchema.safeParse(parsedBody.json);
  if (!parsed.success) {
    return apiJson(
      { ok: false, message: "Please check the highlighted fields.", errors: zodErrors(parsed.error) },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const reference = createReference("MSG");
  const inquiry = {
    reference,
    name: data.name,
    email: data.email,
    topic: data.topic,
    message: data.message,
    status: "new",
    metadata: {
      ipHash: hashIp(request),
      userAgent: (request.headers.get("user-agent") || "").slice(0, 300)
    }
  };

  try {
    if (hasDatabaseConfig()) {
      await connectToDatabase();
      await ContactInquiry.create(inquiry);
    } else if (canUseDevStore()) {
      getDevStore().inquiries.push(inquiry);
    } else {
      return apiJson({ ok: false, message: "Contact is not configured yet." }, { status: 503 });
    }

    await Promise.allSettled([
      sendEmail({
        to: data.email,
        subject: `MusaConsulting message received ${reference}`,
        text: [`Hello ${data.name},`, "", `We received your message. Reference: ${reference}`, "", "MusaConsulting"].join("\n")
      }),
      sendEmail({
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `New MusaConsulting contact message ${reference}`,
        replyTo: data.email,
        text: [`Reference: ${reference}`, `Name: ${data.name}`, `Email: ${data.email}`, `Topic: ${data.topic}`, "", data.message].join("\n")
      })
    ]);

    return apiJson({ ok: true, reference }, { status: 201 });
  } catch (error) {
    console.error("Contact request failed", error);
    return apiJson({ ok: false, message: "Unable to save the message." }, { status: 500 });
  }
}
