import { z } from "zod";
import { serviceOptions } from "./site-data";

const serviceIds = serviceOptions.map((service) => service.id);

const compactWhitespace = (value) => value.replace(/\s+/g, " ").trim();

const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter a full name.")
  .max(80, "Name must be 80 characters or fewer.")
  .regex(/^[a-zA-Z .'-]+$/, "Name can only include letters, spaces, apostrophes, periods, and hyphens.")
  .transform(compactWhitespace);

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(120, "Email must be 120 characters or fewer.")
  .transform((value) => value.toLowerCase());

const phoneSchema = z
  .string()
  .trim()
  .max(24, "Phone number must be 24 characters or fewer.")
  .regex(/^[+()0-9\-\s]*$/, "Phone number contains unsupported characters.")
  .optional()
  .or(z.literal(""));

const notesSchema = z
  .string()
  .trim()
  .min(10, "Please add a short description.")
  .max(1200, "Keep notes under 1,200 characters.")
  .transform(compactWhitespace);

export const bookingSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    service: z.enum(serviceIds, { errorMap: () => ({ message: "Choose a service." }) }),
    slot: z.string().datetime("Choose a valid appointment time."),
    preferredContact: z.enum(["email", "phone", "video"]),
    notes: notesSchema,
    company: z.string().max(0).optional().or(z.literal(""))
  })
  .superRefine((data, context) => {
    const selected = new Date(data.slot);
    const now = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 90);

    if (Number.isNaN(selected.getTime())) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["slot"], message: "Choose a valid appointment time." });
      return;
    }

    if (selected <= now) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["slot"], message: "Choose a future appointment time." });
    }

    if (selected > max) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["slot"], message: "Choose a date within the next 90 days." });
    }
  });

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  topic: z.enum(["booking", "records", "billing", "general"]),
  message: notesSchema,
  company: z.string().max(0).optional().or(z.literal(""))
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: z
    .string()
    .min(10, "Password must be at least 10 characters.")
    .max(128, "Password must be 128 characters or fewer.")
    .regex(/[a-z]/, "Password needs a lowercase letter.")
    .regex(/[A-Z]/, "Password needs an uppercase letter.")
    .regex(/[0-9]/, "Password needs a number.")
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password.").max(128, "Password is too long.")
});

export function zodErrors(error) {
  return error.flatten().fieldErrors;
}

export function serviceNameFor(id) {
  return serviceOptions.find((service) => service.id === id)?.name || "Consultation";
}
