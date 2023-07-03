import { prisma } from "../../../../../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type session = {
  id: string;
  page: string;
  filter: string;
};

export async function GET(request: Request, params: { params: session }) {
  const id = params.params.id;
  const page = parseInt(params.params.page);
  const itemsPerPage = 12;
  let filter = "";
  if (params.params.filter === "newest") {
    filter = "desc";
  } else if (params.params.filter === "oldest") {
    filter = "asc";
  } else {
    filter = "desc";
  }

  try {
    if (!id) {
      return new Response("sessionId query parameter is missing", {
        status: 400,
      });
    }

    const totalCount = await prisma.codeSnippet.count({
      where: {
        posterId: id,
      },
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const offset = (page - 1) * itemsPerPage;

    const snippets = await prisma.codeSnippet.findMany({
      where: {
        posterId: id,
      },
      orderBy: {
        updatedAt: filter as any,
      },
      include: {
        comments: {
          select: {
            id: true, // Include only the 'id' field from comments
          },
        },
      },
      skip: offset,
      take: itemsPerPage,
    });

    const snippetsWithCommentCount = snippets.map((snippet) => ({
      ...snippet,
      totalComments: snippet.comments.length,
    }));

    let previousPage = null;
    let nextPage = null;

    if (page > 1) {
      previousPage = page - 1;
    }

    if (page < totalPages) {
      nextPage = page + 1;
    }

    return new Response(
      JSON.stringify({
        snippets: snippetsWithCommentCount,
        totalPages: totalPages,
        previousPage: previousPage,
        nextPage: nextPage,
        currentPage: page,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
