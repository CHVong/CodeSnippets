import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";

export async function POST(request: Request) {
  try {
    const { codeSnippetId, commenterId, commenterName, comment } = await request.json();
    // console.log(codeSnippetId, commenterId, commenterName, comment);

    const newComment = await prisma.snippetComment.create({
      data: {
        codeSnippetId,
        commenterId,
        commenterName,
        comment,
      },
    });
    const commenterImage = await prisma.user.findUnique({
      where: {
        id: commenterId,
      },
      select: {
        image: true,
      },
    });
    newComment.commenterImage = commenterImage?.image as any;
    // console.log(newComment);
    return new Response(JSON.stringify(newComment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
