import "server-only";
import crypto from "crypto";
import { NextResponse } from "next/server";

const buckets = globalThis.__musaConsultingRateLimits || (globalThis.__musaConsultingRateLimits = new Map());

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function hashIp(request) {
  return crypto.createHash("sha256").update(getClientIp(request)).digest("hex").slice(0, 24);
}

export function rateLimit(request, { key, limit = 10, windowMs = 60_000 }) {
  const now = Date.now();
  const bucketKey = `${key}:${getClientIp(request)}`;
  const current = buckets.get(bucketKey);

  if (!current || current.expiresAt <= now) {
    buckets.set(bucketKey, { count: 1, expiresAt: now + windowMs });
    return { ok: true };
  }

  current.count += 1;

  if (current.count > limit) {
    return {
      ok: false,
      retryAfter: Math.ceil((current.expiresAt - now) / 1000)
    };
  }

  if (buckets.size > 5000) {
    for (const [storedKey, value] of buckets.entries()) {
      if (value.expiresAt <= now) {
        buckets.delete(storedKey);
      }
    }
  }

  return { ok: true };
}

export function apiJson(body, init = {}) {
  const response = NextResponse.json(body, { status: init.status || 200 });
  response.headers.set("Cache-Control", "no-store");

  if (init.headers) {
    for (const [key, value] of Object.entries(init.headers)) {
      response.headers.set(key, value);
    }
  }

  return response;
}

export function enforceSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const host = request.headers.get("host");
  const allowedOrigins = new Set(
    [
      host ? `http://${host}` : null,
      host ? `https://${host}` : null,
      ...(process.env.ALLOWED_ORIGINS || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    ].filter(Boolean)
  );

  return allowedOrigins.has(origin);
}

export async function parseJsonBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return { ok: false, response: apiJson({ ok: false, message: "Use a JSON request body." }, { status: 415 }) };
  }

  try {
    const json = await request.json();
    return { ok: true, json };
  } catch {
    return { ok: false, response: apiJson({ ok: false, message: "Invalid JSON request body." }, { status: 400 }) };
  }
}

export function originFailure() {
  return apiJson({ ok: false, message: "Request origin is not allowed." }, { status: 403 });
}

export function rateLimitFailure(retryAfter) {
  return apiJson(
    { ok: false, message: "Too many requests. Please try again shortly." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

export function createReference(prefix = "MC") {
  return `${prefix}-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}
