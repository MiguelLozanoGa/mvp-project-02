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
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createTodo = async (
    newData: Omit<TodoAttributes, 'done' | 'created_at' | 'updated_at'>
  ) => {
    await $fetch('/api/todos', {
      method: 'POST',
      body: { ...newData, done: false },
    });
    await fetchTodos();
  };

  const updateTodo = async (
    id: string,
    updatedData: Partial<TodoAttributes>
  ) => {
    await $fetch(`/api/todos/${id}`, { method: 'PUT', body: updatedData });
    await fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await $fetch(`/api/todos/${id}`, { method: 'DELETE' });
    await fetchTodos();
  };

  return { todos, fetchTodos, createTodo, updateTodo, deleteTodo };
}
