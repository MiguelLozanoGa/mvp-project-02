import { ref } from 'vue';
import { useTodoStore } from '@/stores/todoStore';

interface TodoAttributes {
  name: string;
  description: string;
  priority: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}

interface Todo {
  id: string;
  attributes: TodoAttributes;
}

const todos = ref<Todo[]>([]);
const error = ref<unknown>(null);
const loading = ref(false);

export function useTodos() {
  const store = useTodoStore();

  const fetchTodos = async () => {
    loading.value = true;
    try {
      const response = await $fetch<{ data: Todo[] }>('/api/todos');
      todos.value = response?.data || [];

      const pending = todos.value.filter(
        (todo) => !todo.attributes.done
      ).length;
      store.setPendingTodo(pending);

      return todos.value;
    } catch (err) {
      error.value = err;
      console.error('[useTodos] Error al obtener tareas:', err);
    } finally {
      loading.value = false;
    }
  };

  const createTodo = async (
    newData: Omit<TodoAttributes, 'done' | 'created_at' | 'updated_at'>
  ) => {
    try {
      console.log('[useTodos] Enviando nueva tarea:', newData);
      const response = await $fetch<{ data: Todo }>('/api/todos', {
        method: 'POST',
        body: { ...newData, done: false },
      });
      console.log('[useTodos] Respuesta del servidor:', response);
      await fetchTodos();
      return response.data;
    } catch (err) {
      error.value = err;
      console.error('[useTodos] Error al crear tarea:', err);
      throw err;
    }
  };

  const updateTodo = async (
    id: string,
    updatedData: Partial<TodoAttributes>
  ) => {
    try {
      await $fetch(`/api/todos/${id}`, { method: 'PUT', body: updatedData });
      await fetchTodos();
    } catch (err) {
      console.error('[useTodos] Error al actualizar tarea:', err);
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await $fetch(`/api/todos/${id}`, { method: 'DELETE' });
      await fetchTodos();
    } catch (err) {
      console.error('[useTodos] Error al eliminar tarea:', err);
      throw err;
    }
  };

  return { todos, fetchTodos, createTodo, updateTodo, deleteTodo };
}
