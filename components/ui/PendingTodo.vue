<template>
  <div class="alert alert-info mt-3">
    Tareas pendientes: <strong>{{ todoStore.pendingTodo }}</strong>
  </div>
</template>

<script setup>
  import { useTodoStore } from '@/stores/todoStore';
  const todoStore = useTodoStore();
</script>
