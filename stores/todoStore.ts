import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    pendingTodo: 0,
  }),

  actions: {
    setPendingTodo(count: number) {
      this.pendingTodo = count;
    },
  },
});
