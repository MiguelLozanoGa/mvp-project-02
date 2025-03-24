import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const body = await readBody(event);

  const updatedComment = await prisma.comment.update({
    where: { id },
    data: body,
  });

  return updatedComment;
});
