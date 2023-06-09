import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { User } from "../components/User";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Code Snippets | Profile",
};

export default async function Profile() {
  // const { data: session } = useSession({
  //   required: true,
  // });
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/signin");
  }
  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Profile"} />
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>
      <User />
    </main>
  );
}
