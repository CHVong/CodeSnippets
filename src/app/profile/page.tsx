import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { User } from "../components/User";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaUser, FaClock, FaCog, FaExclamationTriangle } from "react-icons/fa";
import { prisma } from "../../../prisma/client";
import moment from "moment";
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

  console.log(User);
  console.log(session);
  const username = `${session?.user.name}#${session?.token.sub.slice(-4).toUpperCase()}`;
  return (
    <main className="flex flex-col items-center justify-center gap-8 animate-fadeIn">
      <PageTitle title={"Profile"} />

      <ul className="menu bg-base-200 w-min rounded-box">
        <div className="dropdown dropdown-bottom dropdown-end self-end tooltip" data-tip="Settings">
          <label tabIndex={0} className="btn btn-sm m-1">
            <FaCog />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="ring-2 text-red-400 ring-red-400 hover:!bg-error hover:ring-0">
                <FaExclamationTriangle />
                Delete Account
              </a>
            </li>
          </ul>
        </div>
        <div className="avatar self-center pb-4">
          <div className="w-24 rounded-full">
            <Image src={session?.user?.image!} width={500} height={500} alt="profile pic" />
          </div>
        </div>
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
      </ul>

      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </main>
  );
}
