"use server";

import { generateShortCode } from "@/lib/generate-short-code";
import prisma from "@/lib/prisma";
import { signIn } from "@/utils/auth";
import { AUTH_URL } from "@/utils/env";
import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";
import ConfirmEmail from "@/components/emails/email-confirm";
import { hash } from "bcrypt";

export const signInWithCredential = async (prevState, formData) => {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      redirectTo: AUTH_URL,
    });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
    }
    throw err;
  }
};

export const signInwithOAuth = async (provider) => {
  await signIn(provider, {
    redirect: true,
    redirectTo: AUTH_URL,
  });
};

export const signUp = async (prevState, formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");

    const data = await prisma.user.findFirst({
      where: { email: email },
    });
    if (data) {
      throw new Error("user already exist with this email address");
    }

    const hashedPassword = await hash(password, 10);

    const response = await prisma.user.create({
      data: {
        name: firstName + " " + lastName,
        email: email,
        password: hashedPassword,
        accounts: {
          create: [
            {
              provider: "email-password",
              type: "credentials",
              providerAccountId: await generateShortCode(24),
              access_token: await generateShortCode(24),
              token_type: "bearer",
            },
          ],
        },
      },
    });
    if (!response) {
      throw new Error("Can't create user now! Something went wrong");
    }
    const token = await generateShortCode(6);
    await prisma.VerificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    const emailHtml = render(<ConfirmEmail validationCode={token} />);

    const options = {
      from: "no-reply@redlnk.com",
      to: email,
      subject: "Confirmation Code",
      html: emailHtml,
    };

    sendgrid.send(options);
    return { success: true };
  } catch (error) {
    if (error) return { error: error.message };
    throw error;
  }
};

export const varifyEmail = async (prevState, formData) => {
  try {
    const data = await prisma.VerificationToken.findFirst({
      where: {
        token: formData.get("token"),
      },
    });
    if (!data) {
      throw new Error("Invalid Token");
    }
    if (data.expires < Date.now()) {
      throw new Error("Token Expired");
    }
    await prisma.VerificationToken.delete({
      where: {
        token: data.token,
      },
    });
    await prisma.user.update({
      where: {
        email: data.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    if (error) return { error: error.message };
    throw error;
  }
  await loginWithCredential(prevState, formData);
};
