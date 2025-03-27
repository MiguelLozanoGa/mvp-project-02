import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  console.log('[API] Entrando a /api/todos (index.get.ts)');

  try {
    // Consultamos la base de datos
    const todos = await prisma.todo.findMany({
      orderBy: { created_at: 'desc' },
    });

    console.log('[API] Tareas recuperadas:', todos);

    // Si no hay tareas, lo mostramos claro
    if (todos.length === 0) {
      console.log('[API] No se encontraron tareas en la base de datos.');
    }

    // Devolvemos la estructura que espera el frontend
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
        links: { self: `/todos/${todo.id}` },
      })),
    };
  } catch (err) {
    console.error(' [API] Error en la consulta a la base de datos:', err);

    return { data: [] };
  }
});
