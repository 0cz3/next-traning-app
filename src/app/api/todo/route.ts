import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async() => {
  try {
    // modelで定義したTaskの全記事取得
    const tasks = await prisma.task.findMany();
    return NextResponse.json({message: "success", tasks}, {status: 200})
  } catch (err) {
    // エラー発生時のレスポンス
    return NextResponse.json({message: "Error", err}, {status: 500})
  }
};
console.log("GET");
