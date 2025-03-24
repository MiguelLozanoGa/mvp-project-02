import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return comments;
});
