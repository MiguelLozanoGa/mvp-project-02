<template>
  <div class="alert alert-info mt-3">
    Tareas pendientes: <strong>{{ pendingCount }}</strong>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useTodoStore } from '@/stores/todoStore';

  const todoStore = useTodoStore();

  const pendingCount = computed(() => {
    return todoStore.todos.filter((todo) => !todo.attributes.done).length;
  });
</script>
