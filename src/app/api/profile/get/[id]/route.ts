import { prisma } from "../../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

type session = {
  id: string;
};

export async function GET(request: Request, params: { params: session }) {
  const session = await getServerSession(authOptions);
  if (session?.token?.sub !== params.params.id) {
    return new Response(JSON.stringify("Failed to get account"), { status: 500 });
  }
  try {
    const id = params.params.id;

    const Account = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify(Account), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
