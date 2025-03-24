import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  await prisma.comment.delete({
    where: { id },
  });

  return { message: `Comentario con id ${id} eliminado` };
});
