import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

const googleClientId = process.env?.GOOGLE_ID || "";
const googleClientSecret = process.env?.GOOGLE_CLIENT_SECRET || "";
const githubClientID = process.env?.GITHUB_ID || "";
const githubClientSecret = process.env?.GITHUB_CLIENT_SECRET || "";
const discordClientID = process.env?.DISCORD_ID || "";
const discordClientSecret = process.env?.DISCORD_CLIENT_SECRET || "";

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
};
