import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";
import prisma from "./prisma";

const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "rdj@redlnk.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }
          if (user.password === null) return null;
          const passwordCorrect = await compare(
            credentials.password,
            user.password
          );
          if (passwordCorrect) return user;
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) return true;
      return false;
    },
    async session({ session, user, token }) {
      return session;
    },
    async redirect({ url, baseUrl = process.env.NEXTAUTH_URL }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (user) {
          const data = await prisma.session.create({
            data: {
              userId: user.id,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              sessionToken: account.access_token,
            },
          });
          if (data) {
            token.id = data.id;
            token.sessionToken = account.access_token;
          }
        }
      }
      return token;
    },
  },
  events: {
    async signIn(message) {},
    async signOut(message) {
      // delete sesion from db
      await prisma.session.delete({
        where: { id: message.token.id },
      });
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message) {
      /* session is active */
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },
};

export default authConfig;
