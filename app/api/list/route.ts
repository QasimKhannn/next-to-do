import { db } from "@/lib/db";
import { toDoListSchema } from "@/schemas";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const values = await req.json();
    console.log(values, typeof values.date);
    const validateFields = toDoListSchema.safeParse(values);
    if (!validateFields.success) {
      return NextResponse.json({ message: "Invalid Fields!" }, { status: 500 });
    } else {
      const { name, description, date } = validateFields.data;
      await db.list.create({
        data: {
          name,
          description,
          date,
        },
      });
      return NextResponse.json({ message: "Item Created!" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
