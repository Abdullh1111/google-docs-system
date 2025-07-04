import { z } from "zod";

// Define schema for signup validation
export const signupValidationSchema = z.object({
  email: z.string().email(),
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export const signInValidationSchema = z.object({
  email: z.string().email(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
