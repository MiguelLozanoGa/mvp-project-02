import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const body = await readBody(event);

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      priority: body.priority,
      done: body.done,
      updated_at: new Date(),
    },
  });

  return {
    data: {
      type: 'todo',
      id: String(updatedTodo.id),
      attributes: updatedTodo,
      links: { self: `/todos/${updatedTodo.id}` },
    },
  };
});
