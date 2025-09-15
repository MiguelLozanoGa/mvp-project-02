<template>
  <div class="container mt-5">
    <h1 class="mb-4">Lista de Tareas</h1>

    <!-- Selector de vista -->
    <div class="d-flex justify-content-end mb-3">
      <select v-model="currentView" class="form-select w-auto">
        <option value="list">Vista Lista</option>
        <option value="table">Vista Tabla</option>
      </select>
    </div>

    <UiPendingTodo />

    <!-- Vista Lista -->
    <UiList v-if="currentView === 'list'" :items="todos">
      <template #default="{ item: todo }">
        <div class="card p-3 mb-2 shadow-sm">
          <h5 class="mb-1">{{ todo.attributes.name }}</h5>
          <p class="mb-2 text-muted">{{ todo.attributes.description }}</p>

          <UiToggle
            :checked="todo.attributes.done"
            @toggle="toggleDone(todo)"
          />

          <p class="mt-2 mb-3">
            Estado:
            <strong>
              {{ todo.attributes.done ? 'Completada' : 'Pendiente' }}
            </strong>
          </p>

          <div class="d-flex gap-2">
            <UiButton color="btn-danger" @click="onDelete(todo.id)">
              Eliminar
            </UiButton>
            <UiButton color="btn-warning" @click="onEdit(todo)">
              Editar
            </UiButton>
          </div>
        </div>
      </template>
    </UiList>

    <!-- Vista Tabla -->
    <Table
      v-else
      :items="
        todos.map((t) => ({
          id: t.id,
          name: t.attributes.name,
          description: t.attributes.description,
          priority: t.attributes.priority,
          done: t.attributes.done ? 'Completada' : 'Pendiente',
        }))
      "
      :columns="columns"
    >
      <template #actions="{ item }">
        <div class="d-flex gap-2 justify-content-center">
          <UiButton color="btn-danger" @click="onDelete(item.id)"
            >Eliminar</UiButton
          >
          <UiButton
            color="btn-warning"
            @click="onEdit({ id: item.id, attributes: item })"
            >Editar</UiButton
          >
        </div>
      </template>
    </Table>

    <!-- Modal Bootstrap para crear tarea -->
    <div class="text-end mt-4">
      <ClientOnly>
        <button
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#crearTareaModal"
        >
          Crear Nueva Tarea
        </button>
      </ClientOnly>
    </div>

    <div class="modal fade" id="crearTareaModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear Nueva Tarea</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
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
          </div>
          <div class="modal-footer">
            <<UiButton
              color="btn-success"
              event="click"
              @click="handleCreate"
              data-bs-dismiss="modal"
            >
              Guardar Tarea
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useTodos } from '@/composables/useTodos';
  import Table from '@/components/ui/Table.vue';

  const { fetchTodos, createTodo, updateTodo, deleteTodo } = useTodos();
  const todos = ref([]);
  const newTodo = ref({ name: '', description: '', priority: '' });
  const currentView = ref('list');

  const columns = [
    { label: 'Nombre', key: 'name' },
    { label: 'Descripción', key: 'description' },
    { label: 'Prioridad', key: 'priority' },
    { label: 'Estado', key: 'done' },
  ];

  onMounted(async () => {
    todos.value = await fetchTodos();
  });

  const handleCreate = async () => {
    console.log('[handleCreate] Datos introducidos:', newTodo.value);

    if (
      !newTodo.value.name ||
      !newTodo.value.description ||
      !newTodo.value.priority
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const result = await createTodo(newTodo.value);
      console.log('[handleCreate] Tarea creada con éxito:', result);
      todos.value = await fetchTodos();

      newTodo.value = { name: '', description: '', priority: '' };
    } catch (err) {
      console.error('[handleCreate] Error:', err);
    }
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
