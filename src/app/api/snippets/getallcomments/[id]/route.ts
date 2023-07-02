import { prisma } from "../../../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type session = {
  id: string;
};

export async function GET(request: Request, params: { params: session }) {
  const postid = params.params.id;
  console.log(postid);
  const comments = await prisma.snippetComment.findMany({
    where: {
      codeSnippetId: postid,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  try {
    if (!postid) {
      return new Response("postid query parameter is missing", {
        status: 400,
      });
    }

    for (const comment of comments) {
      const { commenterId } = comment;
      // Perform additional query using the comment id
      const additionalData = await prisma.user.findUnique({
        where: {
          id: commenterId,
        },
      });
      comment.commenterImage = additionalData?.image as string;
    }

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
