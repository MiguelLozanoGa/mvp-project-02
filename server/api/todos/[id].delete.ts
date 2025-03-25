import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  await prisma.todo.delete({
    where: { id },
  });

  return { message: `Todo con id ${id} eliminado` };
});
