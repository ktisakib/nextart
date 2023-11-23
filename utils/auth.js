import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { SignJWT, jwtVerify } from "jose";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // debug: true,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  jwt: {
    async encode(token,user) {
      try {
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const alg = "HS256";
        const encoded = await new SignJWT(token)
          .setProtectedHeader({ alg })
          .setExpirationTime("7d")
          .setIssuedAt()
          .setSubject(token)
          .sign(secret);
        return encoded;
      } catch (error) {
        throw error;
      }
    },
    async decode(token) {
      try {
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const decoded = (await jwtVerify(token.token, secret)).payload;
        return decoded.token;
      } catch (error) {
        console.log(error);
        throw new Error("Your token is invalid or has expired.");
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  ...authConfig,
});
