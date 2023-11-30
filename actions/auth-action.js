"use server";

import { redirect } from "next/navigation";
import { generateShortCode } from "@/lib/generate-short-code";
import prisma from "@/lib/prisma";
import { signIn } from "@/utils/auth";
import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";
import ConfirmEmail from "@/components/emails/confirm-email";
import { hash } from "bcryptjs";

export const signInWithCredential = async (prevState, formData) => {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    if (err) {
      return {
        error: "Email or password don't match ",
        code: 301,
      };
    }
    throw err;
  }
  redirect("/dashboard");
};

export const signInwithOAuth = async (provider) => {
  await signIn(provider, {
    redirect: true,
    redirectTo: "/dashboard",
  });
};

export const varifyEmail = async (prevState, formData) => {
  try {
    const data = await prisma.VerificationToken.findFirst({
      where: {
        token: formData.get("code"),
      },
    });
    if (!data) {
      return {
        code: 302,
        error: true,
        message: "The token is not valid",
      };
    }
    if (data.expires < Date.now()) {
      return {
        code: 302,
        error: true,
        message: "The token is expired",
      };
    }
    await prisma.VerificationToken.delete({
      where: {
        token: formData.get("code"),
      },
    });

    return {
      code: 200,
      error: false,
      email: data.identifier,
      message: "Email Verified",
    };
  } catch (error) {
    return error;
  }
};
export const sendMail = async (prevState, formData) => {
  try {
    const email = formData.get("email");
    const data = await prisma.user.findFirst({
      where: { email: email },
    });
    if (data) {
      return {
        code: 301,
        error: true,
        message: "user already exists with this email",
      };
    }

    const token = await generateShortCode(6);
    await prisma.VerificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    await sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    const emailHtml = await render(<ConfirmEmail validationCode={token} />);

    const options = {
      from: "no-reply@redlnk.com",
      to: email,
      subject: "Confirmation Code",
      html: emailHtml,
    };

    const maildata = await sendgrid.send(options);
    console.log(maildata[0].statusCode);
    if (maildata[0].statusCode !== 202) throw new Error("Something went wrong");
    return { code: 200, error: false, message: "Email  Sent", email: email };
  } catch (error) {
    return { error: true, message: "something went wrong", code: 301 };
  }
};
export const signUp = async (
  prevState,
  { password, lastName, username, firstName, email }
) => {
  try {
    const data = await prisma.user.findFirst({
      where: { username: username },
    });
    if (data)
      return {
        code: 302,
        error: "Username already exists",
      };
    const hashedPassword = await hash(password, 10);
    const response = await prisma.user.create({
      data: {
        name: firstName + " " + lastName,
        email: email,
        username: username,
        password: hashedPassword,
        emailVerified: new Date(),
        Account: {
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
      return {
        code: 301,
        error: "Something went wrong,please try again later",
      };
    }
  } catch (error) {
    return {
      code: 301,
      error: "Something went wrong,please try again later",
    };
  }
  redirect("/signin");
};
