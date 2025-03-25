import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as any[],
  }),

  actions: {
    async fetchTodos() {
      const todosResponse = await $fetch('/api/todos');
      this.todos = todosResponse.data || [];
    },
    toggleTodo(id: string) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.attributes.done = !todo.attributes.done;
      }
    },
  },
});
