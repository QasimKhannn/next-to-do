import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { taskId: string } }
) => {
  try {
    const { taskId } = params;
    const values = await req.json();
    console.log(values);

    await db.list.update({
      where: {
        id: taskId,
      },
      data: { ...values },
    });
    return NextResponse.json({ message: "Task updated!" });
  } catch (error: any) {
    console.log("🚀 ~ file: taskId.ts:20 ~ error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { taskId: string } }
) => {
  try {
    const { taskId } = params;

    await db.list.delete({
      where: {
        id: taskId,
      },
    });
    return NextResponse.json({ message: "Task deleted!" });
  } catch (error) {
    console.log("🚀 ~ file: instituteId.ts:39 ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
