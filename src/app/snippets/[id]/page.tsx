import PageTitle from "../../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "../../../../prisma/client";
import { Session } from "next-auth";
import SnippetInfo from "@/app/components/SnippetInfo";
import Link from "next/link";

export async function generateMetadata({ params }: snippetParam) {
  const snippet: Snippet | null = await prisma.codeSnippet.findUnique({
    where: {
      id: params.id,
    },
  });
  return {
    title: `Code Snippets | Snippet | ${snippet?.title}`,
  };
}

type snippetParam = {
  params: {
    id: string;
  };
};

export default async function page({ params }: snippetParam) {
  const session: Session | null = await getServerSession(authOptions);
  const snippet: Snippet | null = await prisma.codeSnippet.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <PageTitle title={"Snippet Info"} />
      {snippet?.posterId === session?.token.sub || snippet?.isPublic ? (
        <>
          <SnippetInfo param={params.id} session={session as Session} />
        </>
      ) : (
        <>
          <div className="alert alert-error max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Sorry! The snippet you are trying to view is not available to the public.</span>
          </div>
          <Link href={"/explore"}>
            <button className="btn btn-secondary m-4">Explore Others</button>
          </Link>
        </>
      )}
    </main>
  );
}
