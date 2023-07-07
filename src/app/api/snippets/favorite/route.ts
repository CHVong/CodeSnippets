import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";

export async function PATCH(request: Request) {
  const { sessionId, codeSnippetId } = await request.json();
  console.log(sessionId, codeSnippetId);

  try {
    // Find the CodeSnippet by its ID
    const codeSnippet = await prisma.codeSnippet.findUnique({
      where: { id: codeSnippetId },
    });

    if (!codeSnippet) {
      return new Response(JSON.stringify("CodeSnippet not found"), { status: 404 });
    }

    const { favorites } = codeSnippet;

    // Check if sessionId exists in the favorites array
    const index = favorites.indexOf(sessionId);

    if (index === -1) {
      // sessionId doesn't exist, add it to the favorites array
      favorites.push(sessionId);
    } else {
      // sessionId exists, remove it from the favorites array
      favorites.splice(index, 1);
    }

    // Update the CodeSnippet with the modified favorites array
    const updatedCodeSnippet = await prisma.codeSnippet.update({
      where: { id: codeSnippetId },
      data: { favorites },
    });
    return new Response(JSON.stringify(updatedCodeSnippet), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
