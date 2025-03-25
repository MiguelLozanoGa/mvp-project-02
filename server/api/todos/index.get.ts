import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const todos = await prisma.todo.findMany({
    orderBy: { created_at: 'desc' },
  });

  return {
    data: todos.map((todo) => ({
      type: 'todo',
      id: String(todo.id),
      attributes: {
        name: todo.name,
        description: todo.description,
        priority: todo.priority,
        done: todo.done,
        created_at: todo.created_at,
        updated_at: todo.updated_at,
      },
      links: {
        self: `/todos/${todo.id}`,
      },
    })),
  };
});
