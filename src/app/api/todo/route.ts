import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    // modelで定義したTaskの全記事取得
    const tasks = await prisma.task.findMany();
    return NextResponse.json({ message: "success", tasks }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { taskName, deadline } = await req.json();
    // TODO バリデーション追加
    const tasks = await prisma.task.create({ data: { taskName: taskName, deadline: new Date(deadline) } });
    return NextResponse.json({ message: "success", tasks }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
