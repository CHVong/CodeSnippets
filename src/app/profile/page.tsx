import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaUser, FaClock, FaCog, FaExclamationTriangle } from "react-icons/fa";
import { prisma } from "../../../prisma/client";
import moment from "moment";
import ProfileStats from "../components/ProfileStats";
import Settings from "../components/Settings";

export const metadata = {
  title: "Code Snippets | Profile",
};

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("http://localhost:3000/signin"); // redirect internally throws error? Uncaught Error: NEXT_REDIRECT
  }
  const User = await prisma.user.findUnique({
    where: {
      id: session?.token?.sub,
    },
  });

  const username = `${session?.user.name}#${session?.token.sub.slice(-4).toUpperCase()}`;
  return (
    <main className="flex flex-col items-center justify-center gap-8 animate-fadeIn p-4">
      <PageTitle title={"My Profile"} />

      <ul className="menu bg-base-200/50 w-full md:w-3/4 lg:w-max rounded-box items-center">
        <Settings sessionId={session?.token?.sub} />
        <div className="avatar self-center pb-4">
          <div className="w-24 rounded-full">
            <Image src={session?.user?.image!} width={500} height={500} alt="profile pic" />
          </div>
        </div>

        <div>
          <li>
            <a className="tooltip flex !cursor-default" data-tip="Email">
              <FaEnvelope />
              {session?.user?.email}
            </a>
          </li>
          <li>
            <a className="tooltip flex !cursor-default" data-tip="Username">
              <FaUser />
              {username}
            </a>
          </li>
          <li>
            <a className="tooltip flex !cursor-default" data-tip="Date Created">
              <FaClock />
              {moment(User?.createdAt).format("MMM DD, YYYY")}
            </a>
          </li>
        </div>

        <ProfileStats sessionId={session?.token?.sub} />
      </ul>
    </main>
  );
}
