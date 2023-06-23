import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import MySnippetsComponent from "../components/MySnippetsComponent";

export const metadata = {
  title: "Code Snippets | My Snippets",
};
export default async function MySnippets() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"My Snippets"} />
      <MySnippetsComponent />
    </main>
  );
}
