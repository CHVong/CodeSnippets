import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) return NextResponse.json({ message: "Todo id required" });

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ message: `User ${deletedUser.id} deleted` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete todo" }, { status: 500 });
  }
}
