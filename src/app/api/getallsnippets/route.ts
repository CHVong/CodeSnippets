import prisma from "../../../../prisma/client";

export async function GET(request: Request) {
  try {
    const snippet = await prisma.codeSnippet.findMany();
    console.log(snippet);
    return new Response(JSON.stringify(snippet), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
