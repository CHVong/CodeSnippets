import { prisma } from "../../../../../prisma/client";

type session = {
  id: string;
};

export async function GET(request: Request, params: { params: session }) {
  const id = params.params.id;

  try {
    if (!id) {
      return new Response("sessionId query parameter is missing", {
        status: 400,
      });
    }

    const Snippets = await prisma.codeSnippet.findMany({
      where: {
        posterId: id,
      },
    });
    const publicSnippets = await prisma.codeSnippet.findMany({
      where: {
        posterId: id,
        isPublic: true,
      },
    });

    const Comments = await prisma.snippetComment.findMany({
      where: {
        commenterId: id,
      },
    });
    const Favorited = await prisma.codeSnippet.findMany({
      where: {
        favorites: {
          has: id,
        },
      },
    });

    const totalLines = Snippets.reduce((count, snippet) => {
      const lines = snippet.snippet.split("\n");
      return count + lines.length;
    }, 0);

    const stats = {
      totalSnippets: Snippets.length,
      favorited: Favorited.length,
      totalComments: Comments.length,
      totalLines: totalLines,
      publicSnippets: publicSnippets.length,
    };

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
