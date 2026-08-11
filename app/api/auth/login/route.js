import { apiJson, enforceSameOrigin, originFailure, parseJsonBody, rateLimit, rateLimitFailure } from "@/lib/security";
import { loginSchema, zodErrors } from "@/lib/validation";
import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { canUseDevStore, getDevStore } from "@/lib/dev-store";
import { createSessionToken, sessionCookieOptions, verifyPassword } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import User from "@/lib/models/User";

function invalidCredentials() {
  return apiJson({ ok: false, message: "Invalid email or password." }, { status: 401 });
}

export async function POST(request) {
  if (!enforceSameOrigin(request)) {
    return originFailure();
  }

  const limit = rateLimit(request, { key: "login", limit: 8, windowMs: 15 * 60 * 1000 });
  if (!limit.ok) {
    return rateLimitFailure(limit.retryAfter);
  }

  const parsedBody = await parseJsonBody(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const parsed = loginSchema.safeParse(parsedBody.json);
  if (!parsed.success) {
    return apiJson(
      { ok: false, message: "Please check the highlighted fields.", errors: zodErrors(parsed.error) },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    let user;

    if (hasDatabaseConfig()) {
      await connectToDatabase();
      user = await User.findOne({ email: data.email }).select("+passwordHash +password");
    } else if (canUseDevStore()) {
      user = getDevStore().users.find((storedUser) => storedUser.email === data.email);
    } else {
      return apiJson({ ok: false, message: "Patient portal is not configured yet." }, { status: 503 });
    }

    const passwordHash = user?.passwordHash || user?.password;
    if (!user || !passwordHash) {
      return invalidCredentials();
    }

    const isValid = await verifyPassword(data.password, passwordHash);
    if (!isValid) {
      return invalidCredentials();
    }

    await sendEmail({
      to: user.email,
      subject: "MusaConsulting portal sign in",
      text: [`Hello ${user.name},`, "", "A sign in was completed for your MusaConsulting portal.", "", "MusaConsulting"].join("\n")
    });

    const response = apiJson({
      ok: true,
      user: { name: user.name, email: user.email, role: user.role || "patient" }
    });
    response.cookies.set("musa_session", createSessionToken(user), sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return apiJson({ ok: false, message: "Unable to sign in." }, { status: 500 });
  }
}
