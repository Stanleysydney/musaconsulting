import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { apiJson, enforceSameOrigin, originFailure } from "@/lib/security";

export async function POST(request) {
  if (!enforceSameOrigin(request)) {
    return originFailure();
  }

  const response = apiJson({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
