import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const todo = await prisma.todo.create({
    data: {
      name: body.name,
      description: body.description,
      priority: body.priority,
      done: body.done || false,
    },
  });

  return {
    data: {
      type: 'todo',
      id: String(todo.id),
      attributes: todo,
      links: { self: `/todos/${todo.id}` },
    },
  };
});
