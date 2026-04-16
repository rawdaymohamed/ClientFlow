// validators/contact.validator.js
import { z } from "zod";

export const createContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),

  email: z.preprocess((value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, z.string().email("Please provide a valid email address").optional()),

  phone: z.preprocess((value) => {
    if (typeof value !== "string") return value;
    return value.trim();
  }, z.string().max(20, "Phone number must be at most 20 characters").optional()),

  company: z.preprocess((value) => {
    if (typeof value !== "string") return value;
    return value.trim();
  }, z.string().max(100, "Company name must be at most 100 characters").optional()),
});
