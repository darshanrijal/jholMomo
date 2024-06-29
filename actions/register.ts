"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiedls = RegisterSchema.safeParse(values);
  if (!validatedFiedls.success) {
    return { error: "Invalid fields" };
  }
  return { success: "Email sent" };
};
