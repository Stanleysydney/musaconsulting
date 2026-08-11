import { apiJson, enforceSameOrigin, originFailure, parseJsonBody, rateLimit, rateLimitFailure } from "@/lib/security";
import { registerSchema, zodErrors } from "@/lib/validation";
import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { canUseDevStore, getDevStore } from "@/lib/dev-store";
import { createSessionToken, hashPassword, sessionCookieOptions } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import User from "@/lib/models/User";

export async function POST(request) {
  if (!enforceSameOrigin(request)) {
    return originFailure();
  }

  const limit = rateLimit(request, { key: "register", limit: 5, windowMs: 15 * 60 * 1000 });
  if (!limit.ok) {
    return rateLimitFailure(limit.retryAfter);
  }

  const parsedBody = await parseJsonBody(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const parsed = registerSchema.safeParse(parsedBody.json);
  if (!parsed.success) {
    return apiJson(
      { ok: false, message: "Please check the highlighted fields.", errors: zodErrors(parsed.error) },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const passwordHash = await hashPassword(data.password);
    let user;

    if (hasDatabaseConfig()) {
      await connectToDatabase();
      const existing = await User.findOne({ email: data.email }).lean();
      if (existing) {
        return apiJson({ ok: false, message: "An account already exists for this email." }, { status: 409 });
      }

      user = await User.create({
        name: data.name,
        email: data.email,
        passwordHash,
        role: "patient"
      });
    } else if (canUseDevStore()) {
      const store = getDevStore();
      const existing = store.users.find((storedUser) => storedUser.email === data.email);
      if (existing) {
        return apiJson({ ok: false, message: "An account already exists for this email." }, { status: 409 });
      }

      user = {
        id: data.email,
        name: data.name,
        email: data.email,
        passwordHash,
        role: "patient"
      };
      store.users.push(user);
    } else {
      return apiJson({ ok: false, message: "Patient portal is not configured yet." }, { status: 503 });
    }

    await sendEmail({
      to: data.email,
      subject: "Welcome to MusaConsulting",
      text: [`Hello ${data.name},`, "", "Your MusaConsulting portal access is active.", "", "MusaConsulting"].join("\n")
    });

    const response = apiJson({
      ok: true,
      user: { name: user.name, email: user.email, role: user.role || "patient" }
    });
    response.cookies.set("musa_session", createSessionToken(user), sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Registration failed", error);
    return apiJson({ ok: false, message: "Unable to create account." }, { status: 500 });
  }
}
