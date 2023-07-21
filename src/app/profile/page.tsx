import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaUser, FaClock, FaCog, FaExclamationTriangle, FaBell } from "react-icons/fa";
import { prisma } from "../../../prisma/client";
import moment from "moment";
import ProfileStats from "../components/ProfileStats";
import Settings from "../components/Settings";
import ProfileInfo from "../components/ProfileInfo";

// export const metadata = {
//   title: "Code Snippets | Profile",
// };
export async function generateMetadata() {
  const session = await getServerSession(authOptions);
  const username = `${session?.user.name}#${session?.token.sub.slice(-4).toUpperCase()}`;
  return {
    title: `Code Snippets | Profile | ${username}`,
  };
}

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin"); // redirect internally throws error? Uncaught Error: NEXT_REDIRECT
  }
  const User = await prisma.user.findUnique({
    where: {
      id: session?.token?.sub,
    },
  });

  return (
    <main className="flex flex-col items-center justify-center gap-8 animate-fadeIn p-4">
      <PageTitle title={"My Profile"} />

      <ul className="menu bg-base-200/50 w-full md:w-3/4 lg:w-max rounded-box items-center">
        <Settings sessionId={session?.token?.sub} bioprop={User?.bio} />
        <ProfileInfo user={User} />
        <ProfileStats sessionId={session?.token?.sub} />
      </ul>
    </main>
  );
}
