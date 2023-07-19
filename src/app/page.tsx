import Image from "next/image";
import Link from "next/link";
import { FaUsers, FaFileCode } from "react-icons/fa";
import { prisma } from "../../prisma/client";

export default async function Home() {
  const totalUsers = await prisma.user.count();
  const totalSnippets = await prisma.codeSnippet.findMany();
  const totalLines = totalSnippets.reduce((count, snippet) => {
    const lines = snippet.snippet.split("\n");
    return count + lines.length;
  }, 0);

  return (
    <main className="flex min-h-full flex-col items-center justify-center p-10 lg:p-24 gap-8 flex-1">
      <Image
        src="logo.svg"
        alt="Logo image"
        width={150}
        height={150}
        className="animate-slideDown"
        priority={true}
      />
      <Link href={"/create"}>
        <button className="btn btn-secondary">Get Started</button>
      </Link>
      <h1 className="font-bold text-5xl animate-slideUp">Code Snippets</h1>
      <p className="animate-slideUp text-lg">
        A place created to help developers store and retrieve their reusable codes
      </p>

      <div className="stats shadow animate-fadeIn stats-vertical md:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-secondary col-start-1">
            <div className="w-16 rounded-full">
              <FaFileCode className="w-full h-full" />
            </div>
          </div>
          <div className="stat-value col-start-2">{totalSnippets.length}</div>
          <div className="stat-title col-start-2">Total Recorded</div>
          <div className="stat-desc text-secondary col-start-2">code snippets</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Currently Storing</div>
          <div className="stat-value text-secondary">{totalLines.toLocaleString()}</div>
          <div className="stat-desc">Lines of code!</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="w-16 rounded-full">
              <FaUsers className="w-full h-full" />
            </div>
          </div>
          <div className="stat-value">{totalUsers}</div>
          <div className="stat-title">Users To-Date</div>
          <div className="stat-desc text-secondary">copy/pasting</div>
        </div>
      </div>
    </main>
  );
}
