import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export async function POST(request: Request) {
  const { isPublic, title, description, language, snippet, userId }: Snippet = await request.json();

  const newSnippet: Snippet = await prisma.codeSnippet.create({
    data: {
      isPublic,
      title,
      description,
      language,
      snippet,
      userId: {},
    },
  });
  try {
    return new Response(JSON.stringify(newSnippet), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const data = await prisma.user.findMany();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
