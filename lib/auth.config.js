import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
import prisma from "./prisma";
import { compare } from "bcryptjs";

const authConfig = {
  providers: [
    GitHub({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }),
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
            user.password,
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Example: Store user ID in the JWT token
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (user) {
          const data = await prisma.session.create({
            data: {
              userId: user.id,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });
          if (data) return true;
        }
      } catch (err) {
        return false;
      }
    },

    async session({ session, token }) {
      if (session) {
        session.user.id = token.id;
        session.user.jti = token.jti;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    // error: "/error",
    // verifyRequest: "/verify-request",
    // newUser: "/new-user",
  },
};

export default authConfig;
