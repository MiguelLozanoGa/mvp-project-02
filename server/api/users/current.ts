import { PrismaClient } from '@prisma/client';
import { getCookie } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'user_id');
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
});
