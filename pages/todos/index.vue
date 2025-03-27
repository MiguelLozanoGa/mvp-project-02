<template>
  <div class="container mt-5">
    <h1 class="mb-4">Lista de Tareas</h1>

    <UiPendingTodo />

    <UiList :items="todos">
      <template #default="{ item: todo }">
        <div class="card p-3 mb-2">
          <h5>{{ todo.attributes.name }}</h5>
          <p>{{ todo.attributes.description }}</p>
          <UiToggle
            :checked="todo.attributes.done"
            @toggle="toggleDone(todo)"
          />
          <p>
            Estado:
            <strong>{{
              todo.attributes.done ? 'Completada' : 'Pendiente'
            }}</strong>
          </p>

          <UiButton color="btn-danger" @click="onDelete(todo.id)"
            >Eliminar</UiButton
          >
          <UiButton color="btn-warning" @click="onEdit(todo)">Editar</UiButton>
        </div>
      </template>
    </UiList>

    <div class="card p-3 my-4">
      <input
        v-model="newTodo.name"
        class="form-control mb-2"
        placeholder="Nombre de la tarea"
      />
      <input
        v-model="newTodo.description"
        class="form-control mb-2"
        placeholder="Descripción"
      />
      <select v-model="newTodo.priority" class="form-select mb-2">
        <option disabled value="">Selecciona prioridad</option>
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
      </select>
      <UiButton color="btn-success" @click="handleCreate"
        >Crear Nueva Tarea</UiButton
      >
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useTodos } from '@/composables/useTodos';

  const { fetchTodos, createTodo, updateTodo, deleteTodo } = useTodos();
  const todos = ref([]);
  const newTodo = ref({ name: '', description: '', priority: '' });

  onMounted(async () => {
    todos.value = await fetchTodos();
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
    todos.value = await fetchTodos();
    newTodo.value = { name: '', description: '', priority: '' };
  };

  const onDelete = async (id) => {
    await deleteTodo(id);
    todos.value = await fetchTodos();
  };

  const onEdit = async (todo) => {
    const newName = prompt('Nuevo nombre de la tarea:', todo.attributes.name);
    if (newName) {
      await updateTodo(todo.id, { ...todo.attributes, name: newName });
      todos.value = await fetchTodos();
    }
  };

  const toggleDone = async (todo) => {
    await updateTodo(todo.id, { done: !todo.attributes.done });
    todos.value = await fetchTodos();
  };
</script>
