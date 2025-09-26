import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    // modelで定義したTaskの全取得
     //データ量が膨大になる場合は、ページネーションなどで読み込みに制限をかける
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
    const dataCreate = { taskName: taskName, ...(deadline && { deadline: new Date(deadline) }) };
    const tasks = await prisma.task.create({ data: dataCreate });
    return NextResponse.json({ message: "success", tasks }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const task = await prisma.task.delete({ where: { id: id } });
    return NextResponse.json({ message: "success", task }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, taskName, deadline, completed } = await req.json();
    const task = await prisma.task.update({ data: {deadline, taskName, completed}, where: { id: id }  });
    return NextResponse.json({ message: "success", task }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
