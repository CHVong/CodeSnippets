import { prisma } from "../../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type session = {
  id: string;
};

export async function GET(request: Request, params: { params: session }) {
  const id = params.params.id;
  //   console.log(id);

  try {
    if (!id) {
      return new Response("sessionId query parameter is missing", {
        status: 400,
      });
    }

    const snippets = await prisma.codeSnippet.findMany({
      where: {
        posterId: id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (snippets.length === 0) {
      // Handle the case when the user has no snippet
      return new Response("User has no snippets", { status: 404 });
    }
    return new Response(JSON.stringify(snippets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
