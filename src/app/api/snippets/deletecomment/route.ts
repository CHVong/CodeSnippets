import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";

export async function PATCH(request: Request) {
  try {
    const { commentId } = await request.json();
    // console.log(commentId);

    const deletedComment = await prisma.snippetComment.delete({
      where: {
        id: commentId,
      },
    });

    // console.log(deletedComment);
    return new Response(JSON.stringify(deletedComment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
