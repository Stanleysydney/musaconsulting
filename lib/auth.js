import "server-only";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "musa_session";

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET || process.env.AUTH_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production.");
  }

  return secret || "development-only-musaconsulting-session-secret";
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createSessionToken(user) {
  return jwt.sign(
    {
      sub: String(user.id || user._id || user.email),
      name: user.name,
      email: user.email,
      role: user.role || "patient"
    },
    getJwtSecret(),
    {
      expiresIn: "7d",
      issuer: "musaconsulting",
      audience: "patient-portal"
    }
  );
}

export function verifySessionToken(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, getJwtSecret(), {
      issuer: "musaconsulting",
      audience: "patient-portal"
    });
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  };
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
