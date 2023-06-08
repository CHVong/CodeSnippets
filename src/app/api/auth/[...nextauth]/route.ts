import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

const googleClientId = process.env?.GOOGLE_ID || "";
const googleClientSecret = process.env?.GOOGLE_CLIENT_SECRET || "";
const githubClientID = process.env?.GITHUB_ID || "";
const githubClientSecret = process.env?.GITHUB_CLIENT_SECRET || "";
const discordClientID = process.env?.DISCORD_ID || "";
const discordClientSecret = process.env?.DISCORD_CLIENT_SECRET || "";

const handler = NextAuth({
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
  secret: process.env.NEXT_AUTH_SECRET,
  // async session({ session }: { session: Session }) {},
  // async signIn({ profile }) {},
});

export { handler as GET, handler as POST };

// export const authOptions: NextAuthOptions = {
//   // https://next-auth.js.org/configuration/providers/oauth
//   providers: [
//     GoogleProvider({
//       clientId: googleClientId,
//       clientSecret: googleClientSecret,
//     }),
//     GithubProvider({
//       clientId: githubClientID,
//       clientSecret: githubClientSecret,
//     }),
//   ],
// };

// export default NextAuth(authOptions);
