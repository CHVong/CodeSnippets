import { prisma } from "../../../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type session = {
  id: string;
};

export async function DELETE(request: Request, params: { params: session }) {
  const id = params.params.id;
  console.log(params.params);

  const snippets = await prisma.codeSnippet.delete({
    where: { id: id },
  });
  try {
    if (!id) {
      return new Response("Id query parameter is missing", {
        status: 400,
      });
    }
    return new Response(JSON.stringify(snippets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
