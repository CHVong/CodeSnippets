import { prisma } from "../../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

type session = {
  id: string;
};

export async function DELETE(request: Request, params: { params: session }) {
  const session = await getServerSession(authOptions);
  if (session?.token?.sub !== params.params.id) {
    return new Response(JSON.stringify("Failed to delete account"), { status: 500 });
  }
  try {
    const id = params.params.id;
    console.log(id);

    const deletedAccount = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    console.log(deletedAccount);
    return new Response(JSON.stringify(deletedAccount), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
