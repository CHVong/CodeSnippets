import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export async function GET(request: Request) {
  try {
    const data = await prisma.user.findMany();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
