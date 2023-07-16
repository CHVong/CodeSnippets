import { prisma } from "../../../../../../prisma/client";

type snippetid = {
  id: string;
};

export async function GET(request: Request, params: { params: snippetid }) {
  const id = params.params.id;
  const snippets = await prisma.codeSnippet.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: {
        include: {
          user: true, // Include the User data for the commenter
        },
      },
    },
  });
  try {
    if (!id) {
      return new Response("sessionId query parameter is missing", {
        status: 400,
      });
    }

    const snippetsWithCommentCount = {
      ...snippets,
      totalComments: snippets?.comments.length,
    };

    return new Response(JSON.stringify(snippetsWithCommentCount), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
