import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";

export async function POST(request: Request) {
  try {
    const { isPublic, title, description, language, snippet, posterId }: Snippet =
      await request.json();
    const myBoolean = JSON.parse(isPublic.toString());

    console.log(isPublic, typeof isPublic, myBoolean, typeof myBoolean);

    //logs false, string, false, boolean

    const newSnippet: Snippet = await prisma.codeSnippet.create({
      data: {
        isPublic: myBoolean,
        title,
        description,
        language,
        snippet,
        posterId,
      },
    });
    return new Response(JSON.stringify(newSnippet), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { snippetId } = await request.json();
  console.log(snippetId);
  try {
    const data = await prisma.codeSnippet.delete({
      where: { id: String(snippetId) },
    });
    console.log(data);
    return new Response(JSON.stringify(`${data} has been deleted`), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
export async function PATCH(request: Request) {
  const { snippetId, isPublic } = await request.json();
  console.log(snippetId, isPublic, !isPublic);

  try {
    const data = await prisma.codeSnippet.update({
      where: { id: String(snippetId) },
      data: { isPublic: !isPublic },
    });

    const message = `${data} has been updated successfully.`; // Customize the message

    const responseData = {
      message: message,
      data: data,
    };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
// export async function GET(request: Request) {
//   try {
//     const data = await prisma.user.findMany();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify(error), { status: 500 });
//   }
// }
