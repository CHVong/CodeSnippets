"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

export default function SignInProviders() {
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
    <div className="flex flex-col items-center justify-center gap-2 border-2 border-neutral p-6 md:p-8 lg:p-10 grow rounded-lg m-6">
      <h2 className="pb-4 font-bold text-xl">Select your provider</h2>
      <button className="btn btn-neutral w-full justify-start" onClick={handleDiscordSignIn}>
        <FaDiscord className="text-lg" />
        sign in with Discord
      </button>
      <button className="btn btn-neutral w-full justify-start" onClick={handleGithubSignIn}>
        <FaGithub className="text-lg" />
        sign in with Github
      </button>
      <button className="btn btn-neutral w-full justify-start flex-1" onClick={handleGoogleSignIn}>
        <FaGoogle className="text-lg" />
        sign in with Google
      </button>
    </div>
  );
}
