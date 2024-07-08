import { z } from "zod";
import { UserRole } from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(1, "Password is required"),
  code: z.optional(z.string()),
});

export const NewPassword = z.object({
  password: z.string().min(6, "Minimum 6 characters required"),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .min(1, "Email is required"),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, "Minimum 6 characters required"),
  name: z.string().min(1, "Name is required"),
});

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.nativeEnum(UserRole),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) =>
      (data.password && data.newPassword) ||
      (!data.password && !data.newPassword),
    {
      message: "Both password and new password are required if one is provided",
      path: ["newPassword"],
    }
  );
