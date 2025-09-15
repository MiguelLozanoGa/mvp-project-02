import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        user_type: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return users;
  } catch (error) {
    console.error('[API] Error al obtener usuarios:', error);
    return {
      statusCode: 500,
      body: { error: 'Error al obtener usuarios' },
    };
  }
});
