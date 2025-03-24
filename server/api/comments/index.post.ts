import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, content } = body;

  if (!username || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username y Content son obligatorios',
    });
  }

  const comment = await prisma.comment.create({
    data: {
      username,
      content,
    },
  });

  return comment;
});
