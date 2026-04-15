import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .toLowerCase()
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
