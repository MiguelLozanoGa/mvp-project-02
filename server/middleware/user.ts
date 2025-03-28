/// server/middleware/user.ts
import { defineEventHandler, getCookie } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'user_id');

  if (!userId) {
    console.log('[Middleware:user] No se proporcionó user_id');
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    console.log('[Middleware:user] Usuario no encontrado');
    return;
  }

  console.log(
    `[Middleware:user] Usuario detectado: ${user.email} (${user.user_type})`
  );
  event.context.user = user;
});
