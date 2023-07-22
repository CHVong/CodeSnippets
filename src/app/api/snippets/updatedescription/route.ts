import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";

export async function PATCH(request: Request) {
  const { snippetId, description } = await request.json();
  // console.log(snippetId, description);

  try {
    const data = await prisma.codeSnippet.update({
      where: { id: String(snippetId) },
      data: { description: description },
    });

    const message = `${data} has been updated successfully.`; // Customize the message

    const responseData = {
      message: message,
      data: data,
    };
    // console.log(responseData);
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
