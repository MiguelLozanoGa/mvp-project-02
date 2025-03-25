<template>
  <div class="container mt-5">
    <h1 class="mb-4">Lista de Todos</h1>
    <UiPendingTodo />
    <UiList />
  </div>
</template>

<script setup>
  import { useTodoStore } from '@/stores/todoStore';
  const todoStore = useTodoStore();

  onMounted(() => {
    todoStore.fetchTodos();
  });
</script>
