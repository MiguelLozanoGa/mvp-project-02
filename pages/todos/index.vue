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
  // llamar metodo para obtener la lista de tareas getTodos
  // Actualizar pendingTodo con updatePendingTodo
  // todoStore.setPentingTodo(count)
  onMounted(() => {
    todoStore.fetchTodos();
  });
</script>
