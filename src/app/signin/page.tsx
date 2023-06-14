import PageTitle from "../components/PageTitle";
import SignInProviders from "../components/SignInProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Code Snippets | Sign In",
};

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  console.log(session);

  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Sign In"} />
      <SignInProviders />
    </main>
  );
}
