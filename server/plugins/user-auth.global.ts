// server/plugins/user-auth.global.ts
import { defineEventHandler, getCookie } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Asegura que esto solo se ejecute en contexto con petición HTTP
  if (!event.node || !event.node.req) {
    console.log('[Middleware:user] No hay petición HTTP, se omite');
    return;
  }

  // Leer las cookies
  const userId = getCookie(event, 'user_id');
  const userType = getCookie(event, 'user_type'); // Leemos también el user_type

  if (!userId || !userType) {
    console.log('[Middleware:user] No se proporcionó user_id o user_type');
    return;
  }

  // Buscar el usuario en la base de datos con el user_id
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.user_type !== userType) {
    console.log('[Middleware:user] Usuario no encontrado o tipo incorrecto');
    return;
  }

  console.log(
    `[Middleware:user] Usuario detectado: ${user.email} (${user.user_type})`
  );

  event.context.user = user;
});
