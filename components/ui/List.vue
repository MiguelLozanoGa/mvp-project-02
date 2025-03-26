<template>
  <div v-for="todo in todos" :key="todo.id" class="card mb-2 p-3">
    <h5>{{ todo.attributes.name }}</h5>
    <p>{{ todo.attributes.description }}</p>

    <UiToggle :checked="todo.attributes.done" @toggle="toggleDone(todo)" />
    <p class="mt-2">
      Estado:
      <strong>{{ todo.attributes.done ? 'Completada' : 'Pendiente' }}</strong>
    </p>

    <UiButton color="btn-danger" event="delete" @delete="onDelete(todo.id)"
      >Eliminar</UiButton
    >
    <UiButton color="btn-warning" event="edit" @edit="onEdit(todo)"
      >Editar</UiButton
    >
  </div>
</template>

<script setup>
  import UiButton from '@/components/ui/Button.vue';
  import UiToggle from '@/components/ui/Toggle.vue';
  import { useTodos } from '@/composables/useTodos';
  import { onMounted } from 'vue';

  const { todos, deleteTodo, updateTodo, fetchTodos } = useTodos();

  onMounted(() => {
    fetchTodos(); // ✅ Me aseguro que se cargue la lista al montar
  });

  const onDelete = async (id) => {
    await deleteTodo(id);
  };

  const onEdit = async (todo) => {
    const newName = prompt('Nuevo nombre de la tarea:', todo.attributes.name);
    if (newName !== null && newName.trim() !== '') {
      const updatedTodo = { ...todo.attributes, name: newName };
      await updateTodo(todo.id, updatedTodo);
    }
  };

  const toggleDone = async (todo) => {
    await updateTodo(todo.id, { done: !todo.attributes.done });
  };
</script>
