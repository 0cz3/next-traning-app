import { PrismaClient } from "@prisma/client";
// シングルトン 不必要なデータベースへの接続防止

// PrismaClientのインスタンスを生成
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// インスタンスが存在するかチェック ?? 存在しない場合新しいインスタンスを作成
// （存在する（場合インスタンスを再利用）
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// 開発環境でのみ、作成したインスタンスをグローバルに保存
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
