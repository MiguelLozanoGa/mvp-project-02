<template>
  <div class="card border-info mb-4 shadow-sm">
    <div class="card-body text-info">
      <h5 class="card-title mb-0">Tareas pendientes</h5>
      <p class="card-text display-6 fw-bold">{{ todoStore.pendingTodo }}</p>
    </div>
  </div>
</template>

<script setup>
  import { useTodoStore } from '@/stores/todoStore';
  const todoStore = useTodoStore();
</script>
