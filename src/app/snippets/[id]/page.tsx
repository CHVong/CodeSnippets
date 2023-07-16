import PageTitle from "../../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "../../../../prisma/client";
import { Session } from "next-auth";
import SnippetInfo from "@/app/components/SnippetInfo";

export const metadata = {
  title: "Code Snippets | Snippet",
};

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
        "Not available"
      )}
    </main>
  );
}
