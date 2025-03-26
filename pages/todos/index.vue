<template>
  <div class="container mt-5">
    <h1 class="mb-4">Lista de Tareas</h1>

    <UiPendingTodo />
    <UiList />

    <div class="card p-3 my-4">
      <input
        v-model="newTodo.name"
        type="text"
        class="form-control mb-2"
        placeholder="Nombre de la tarea"
      />
      <input
        v-model="newTodo.description"
        type="text"
        class="form-control mb-2"
        placeholder="Descripción"
      />
      <select v-model="newTodo.priority" class="form-select mb-2">
        <option disabled value="">Selecciona prioridad</option>
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
      </select>
      <UiButton color="btn-success" event="create" @create="handleCreate"
        >Crear Nueva Tarea</UiButton
      >
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import UiList from '@/components/ui/List.vue';
  import UiButton from '@/components/ui/Button.vue';
  import UiPendingTodo from '@/components/ui/PendingTodo.vue';
  import { useTodos } from '@/composables/useTodos';

  const { createTodo, fetchTodos } = useTodos();

  const newTodo = ref({
    name: '',
    description: '',
    priority: '',
  });

  onMounted(() => {
    fetchTodos(); // ✅ Trae las tareas al cargar la página
  });

  const handleCreate = async () => {
    if (
      !newTodo.value.name ||
      !newTodo.value.description ||
      !newTodo.value.priority
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }
    await createTodo(newTodo.value);
    newTodo.value = { name: '', description: '', priority: '' };
  };
</script>
