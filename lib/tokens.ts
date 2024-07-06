import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-tokens";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  //todo later change to 15 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    const tokenExists = await db.twoFactorToken.findUnique({
      where: { id: existingToken.id },
    });
    if (tokenExists) {
      await db.twoFactorToken.delete({
        where: { id: existingToken.id },
      });
    }
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: { email, token, expires },
  });
  return twoFactorToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(
    new Date().getTime() + 3600 * 1000
  ); /*1 Hour from now */

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    const tokenExists = await db.verificationToken.findUnique({
      where: {
        id: existingToken.id,
      },
    });
    if (tokenExists) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(
    new Date().getTime() + 3600 * 1000
  ); /*1 Hour from now */
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    const tokenExists = await db.passwordResetToken.findUnique({
      where: {
        id: existingToken.id,
      },
    });
    if (tokenExists) {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};
