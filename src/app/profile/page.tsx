import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { User } from "../components/User";
import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata = {
  title: "Code Snippets | Profile",
};

export default async function Profile() {
  async function getUsers() {
    const response = await fetch(`${process.env.BASE_URL}/api/snippets`);
    if (!response.ok) {
      console.log(response);
    }
    const data = await response.json();
    // console.log(data);
    return data;
  }
  getUsers();
  const data = await getUsers();
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    redirect("http://localhost:3000/signin"); // redirect internally throws error? Uncaught Error: NEXT_REDIRECT
  }
  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Profile"} />
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>
      <User />
      <div>
        {data.map((e: any, i: any) => {
          return (
            <div key={i}>
              <Image src={e.image} width={50} height={50} alt="profile pic" />
            </div>
          );
        })}
      </div>
    </main>
  );
}
