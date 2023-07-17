import PageTitle from "../../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "../../../../prisma/client";
import { Session } from "next-auth";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaClock, FaEnvelope, FaUser } from "react-icons/fa";
import ProfileStats from "@/app/components/ProfileStats";
import moment from "moment";

export const metadata = {
  title: "Code Snippets | Profile",
};

type profileParam = {
  params: {
    id: string;
  };
};

export default async function page({ params }: profileParam) {
  const session: Session | null = await getServerSession(authOptions);
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  const username = `${user?.name}#${user?.id.slice(-4).toUpperCase()}`;
  {
    session?.token?.sub === params.id ? redirect("/profile") : "";
  }
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <PageTitle title={`${username}'s Profile`} />
      <ul className="menu bg-base-200/50 w-full md:w-3/4 lg:w-max rounded-box items-center">
        <div className="avatar self-center py-4">
          <div className="w-24 rounded-full">
            <Image src={user?.image!} width={500} height={500} alt="profile pic" />
          </div>
        </div>

        <div>
          <li>
            <a className="tooltip flex !cursor-default" data-tip="Username">
              <FaUser />
              {username}
            </a>
          </li>
          <li>
            <a className="tooltip flex !cursor-default" data-tip="Date Created">
              <FaClock />
              {moment(user?.createdAt).format("MMM DD, YYYY")}
            </a>
          </li>
        </div>

        <ProfileStats sessionId={params.id} />
      </ul>
    </main>
  );
}
