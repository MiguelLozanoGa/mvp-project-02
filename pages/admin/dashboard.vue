<template>
  <ClientOnly>
    <section class="container mt-4">
      <h1 class="text-success mb-4">Panel de Administración</h1>
      <UiTable :items="users" :columns="columns" />
    </section>
  </ClientOnly>
</template>

<script setup>
  import admin from '~/middleware/admin';

  const users = ref([]);

  const columns = [
    { key: 'email', label: 'Email' },
    { key: 'user_type', label: 'Rol' },
    { key: 'created_at', label: 'Creado' },
  ];

  onMounted(async () => {
    const res = await fetch('/api/users');
    users.value = await res.json();
  });

  definePageMeta({
    middleware: 'admin',
    layout: 'admin',
  });
</script>
