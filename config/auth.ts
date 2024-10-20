import { randomBytes, randomUUID } from "crypto";

import dotenv from "dotenv";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

dotenv.config();

/**
 * Maximum age of a session in seconds.
 *
 * @type {number}
 */
const MAX_SESSION_AGE: number = 24 * 60 * 60;

/**
 * NextAuth instance configuration options.
 *
 * @see {@link https://next-auth.js.org/configuration/options} for general information.
 * @see {@link https://next-auth.js.org/providers/github} for information on GitHub OAuth.
 * @see {@link https://next-auth.js.org/providers/google} for information on Google OAuth.
 * @type {NextAuthOptions}
 */
const authConfig: NextAuthOptions = {
  // TODO: Add authentication providers:
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT ?? "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET, // Redundantly defined as environment variable.

  session: {
    strategy: "jwt",
    maxAge: MAX_SESSION_AGE,
    updateAge: 0.75 * MAX_SESSION_AGE,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },

  jwt: {
    maxAge: MAX_SESSION_AGE,
  },

  pages: {
    // signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("[CALL] Sign in:", {
    //     user,
    //     account,
    //     profile,
    //     email,
    //     credentials,
    //   });
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log("[CALL] Redirect:", { url, baseUrl });
    //   return baseUrl;
    // },
    // async session({ session, token, user }) {
    //   console.log("[CALL] Session:", { session, token, user });
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   console.log("[CALL] JWT:", { token, user, account, profile, isNewUser });
    //   return token;
    // },
  },

  events: {
    // async signIn(message) {
    //   /* On successful sign in */
    // },
    // async signOut(message) {
    //   /* On signout */
    // },
    // async createUser(message) {
    //   /* User created */
    // },
    // async updateUser(message) {
    //   /* User updated - e.g. their email was verified */
    // },
    // async linkAccount(message) {
    //   /* Account (e.g. Twitter) linked to a user */
    // },
    // async session(message) {
    //   /* Session is active */
    // },
  },

  adapter: undefined,

  debug: false,

  logger: undefined,
};

export const authHandler = NextAuth(authConfig);
