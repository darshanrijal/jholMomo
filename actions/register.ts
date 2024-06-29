"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { GetUserByEmail } from "@/data/user";
export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiedls = RegisterSchema.safeParse(values);
  if (!validatedFiedls.success) {
    return { error: "Invalid fields" };
  }
  const { email, name, password } = validatedFiedls.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await GetUserByEmail(email);
  if (existingUser) return { error: "Email already in use" };
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  //  TODO SEND VERIFICATION TOKEN EMAIL
  return { success: "User created" };
};
