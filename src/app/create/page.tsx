import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

import NewSnippetForm from "../components/NewSnippetForm";

export const metadata = {
  title: "Code Snippets | Create",
};

export default async function Create() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Create New Snippet"} />
      <NewSnippetForm />
    </main>
  );
}
