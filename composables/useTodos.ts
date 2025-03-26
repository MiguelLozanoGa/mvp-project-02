import { ref } from 'vue';
import { useFetch } from '#app';
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
  type: string;
  id: string;
  attributes: TodoAttributes;
  links: { self: string };
}

const todos = ref<Todo[]>([]);
const error = ref<unknown>(null);
const loading = ref(false);

export function useTodos() {
  const store = useTodoStore();

  const fetchTodos = async () => {
    console.log('✅ [fetchTodos] Fetching todos...');
    loading.value = true;
    try {
      const response = await $fetch<{ data: Todo[] }>('/api/todos');
      console.log('🟡 [fetchTodos] API $fetch response:', response);

      todos.value = response?.data || [];
      console.log('✅ [fetchTodos] Todos cargados:', todos.value);

      const pending = todos.value.filter(
        (todo) => !todo.attributes.done
      ).length;
      store.setPendingTodo(pending);
      console.log(`✅ [fetchTodos] Pendientes actualizados: ${pending}`);
    } catch (err) {
      console.error('❌ [fetchTodos] Error general:', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const deleteTodo = async (id: string) => {
    console.log(`🗑 [deleteTodo] Borrando tarea con id: ${id}`);
    try {
      await $fetch(`/api/todos/${id}`, { method: 'DELETE' });
      await fetchTodos();
    } catch (err) {
      console.error('❌ [deleteTodo] Error:', err);
      error.value = err;
    }
  };

  const updateTodo = async (
    id: string,
    updatedData: Partial<TodoAttributes>
  ) => {
    console.log(`✏️ [updateTodo] Actualizando tarea id ${id}`, updatedData);
    try {
      await $fetch(`/api/todos/${id}`, { method: 'PUT', body: updatedData });
      await fetchTodos();
    } catch (err) {
      console.error('❌ [updateTodo] Error:', err);
      error.value = err;
    }
  };

  const createTodo = async (
    newData: Omit<TodoAttributes, 'done' | 'created_at' | 'updated_at'>
  ) => {
    console.log('🟢 [createTodo] Creando nueva tarea:', newData);
    try {
      await $fetch('/api/todos', {
        method: 'POST',
        body: { ...newData, done: false },
      });
      await fetchTodos();
    } catch (err) {
      console.error('❌ [createTodo] Error:', err);
      error.value = err;
    }
  };

  return {
    todos,
    error,
    loading,
    fetchTodos,
    deleteTodo,
    updateTodo,
    createTodo,
  };
}
