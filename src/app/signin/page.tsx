"use client";

import PageTitle from "../components/PageTitle";
import { signIn } from "next-auth/react";

export const metadata = {
  title: "Code Snippets | Sign In",
};

export default function SignIn() {
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  async function handleGithubSignIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  async function handleDiscordSignIn() {
    signIn("discord", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Sign In"} />
      <button type="button" onClick={handleGoogleSignIn}>
        sign in with Google
      </button>
      <button type="button" onClick={handleGithubSignIn}>
        sign in with Github
      </button>
      <button type="button" onClick={handleDiscordSignIn}>
        sign in with Discord
      </button>
    </main>
  );
}
