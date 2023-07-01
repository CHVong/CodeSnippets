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
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
