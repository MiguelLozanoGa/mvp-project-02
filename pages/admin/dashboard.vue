<template>
  <ClientOnly>
    <section class="container mt-4">
      <h1 class="text-success mb-4">Panel de Administración</h1>
      <UiTable :items="users" :columns="columns" />
    </section>
  </ClientOnly>
</template>

<script setup>
  const columns = [
    { key: 'email', label: 'Email' },
    { key: 'user_type', label: 'Rol' },
    { key: 'created_at', label: 'Creado' },
  ];

  const { data: users } = await useFetch('/api/users/get-all');

  definePageMeta({
    middleware: 'admin',
    layout: 'admin',
  });
</script>
