<template>
  <div class="todo-list">
    <h2 class="mb-4">Tareas:</h2>
    <div v-if="todoStore.todos.length === 0">No hay tareas disponibles</div>
    <ul class="list-group">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ todo.attributes.name }}</strong> -
          {{ todo.attributes.description }}
          <span class="badge bg-secondary ms-2">{{
            todo.attributes.priority
          }}</span>
        </div>
        <div class="d-flex align-items-center">
          <span
            :class="
              todo.attributes.done ? 'badge bg-success' : 'badge bg-warning'
            "
          >
            {{ todo.attributes.done ? 'Hecho' : 'Pendiente' }}
          </span>
          <UiToggle
            class="ms-3"
            :checked="todo.attributes.done"
            @toggle="toggleDone(todo.id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useTodoStore } from '@/stores/todoStore';
  import UiToggle from '@/components/ui/Toggle.vue';

  const todoStore = useTodoStore();

  const toggleDone = (id) => {
    todoStore.toggleTodo(id);
  };
</script>
