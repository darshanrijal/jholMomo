"use server";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFiedls = LoginSchema.safeParse(values);
  if (!validatedFiedls.success) {
    return { error: "Invalid fields" };
  }
  return { success: "Email sent" };
};
