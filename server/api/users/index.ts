import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery, setCookie } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { type } = getQuery(event);
  console.log('[API] Tipo recibido en la query:', type);

  if (!type || (type !== 'admin' && type !== 'member')) {
    console.log('[API] Tipo no válido:', type);
    return { error: 'Tipo de usuario no válido' };
  }

  try {
    const user = await prisma.user.findFirst({
      where: { user_type: type },
    });

    console.log('[API] Resultado búsqueda en DB:', user);

    if (!user) {
      console.log(`[API] No se encontró un usuario con el tipo: ${type}`);
      return { error: 'Usuario no encontrado' };
    }

    // Establecer cookie user_id
    setCookie(event, 'user_id', user.id);
    console.log('[API] Cookie user_id establecida con:', user.id);

    return {
      message: 'Login simulado correctamente',
      user,
    };
  } catch (error) {
    console.error('[API] Error durante la búsqueda del usuario:', error);
    return { error: 'Error interno del servidor' };
  }
});
