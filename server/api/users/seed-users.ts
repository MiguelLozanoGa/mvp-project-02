import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: 'admin123',
        user_type: 'admin',
      },
    });

    console.log('Usuario admin creado o actualizado:', admin);

    const member = await prisma.user.upsert({
      where: { email: 'member@example.com' },
      update: {},
      create: {
        email: 'member@example.com',
        password: 'member123',
        user_type: 'member',
      },
    });

    console.log('Usuario member creado o actualizado:', member);

    return {
      message: 'Usuarios de prueba creados correctamente',
      users: [admin, member],
    };
  } catch (err) {
    console.error('Error al crear usuarios:', err);
    return {
      statusCode: 500,
      body: { error: 'No se pudieron crear los usuarios' },
    };
  }
});
