import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

const googleClientId = process.env?.GOOGLE_ID || "";
const googleClientSecret = process.env?.GOOGLE_CLIENT_SECRET || "";
const githubClientID = process.env?.GITHUB_ID || "";
const githubClientSecret = process.env?.GITHUB_CLIENT_SECRET || "";
const discordClientID = process.env?.DISCORD_ID || "";
const discordClientSecret = process.env?.DISCORD_CLIENT_SECRET || "";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    GithubProvider({
      clientId: githubClientID,
      clientSecret: githubClientSecret,
    }),
    DiscordProvider({
      clientId: discordClientID,
      clientSecret: discordClientSecret,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // async session({ session, user }) {
    //   if (user && user.id) {
    //     session.user.id = user.id;
    //   }
    //   console.log(user);
    //   return session;
    // },
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
};
