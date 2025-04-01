// server/api/users/select.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery, setCookie } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { type } = getQuery(event);
  console.log('[API] Tipo recibido en la query:', type);

  const user = await prisma.user.findFirst({
    where: { user_type: String(type) },
  });

  if (!user) {
    console.warn(
      '[API] Usuario no encontrado en la base de datos para type:',
      type
    );
    return {
      statusCode: 404,
      body: { error: 'Usuario no encontrado' },
    };
  }

  console.log('[API] Usuario encontrado:', user);
  setCookie(event, 'user_id', user.id);
  console.log('[API] Cookie user_id establecida con:', user.id);

  return { message: 'Usuario simulado', user };
});
