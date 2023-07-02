import { prisma } from "../../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type session = {
  id: string;
};

export async function GET(request: Request, params: { params: session }) {
  const id = params.params.id;
  const snippets = await prisma.codeSnippet.findMany({
    where: {
      posterId: id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      comments: {
        select: {
          id: true, // Include only the 'id' field from comments
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

    const snippetsWithCommentCount = snippets.map((snippet) => ({
      ...snippet,
      totalComments: snippet.comments.length,
    }));

    return new Response(JSON.stringify(snippetsWithCommentCount), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
