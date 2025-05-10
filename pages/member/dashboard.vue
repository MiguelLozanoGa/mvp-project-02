<template>
  <ClientOnly>
    <section class="container mt-4">
      <h1 class="text-primary mb-4">Panel de Usuario</h1>

      <UiCard
        title="Tus datos"
        description="Información del usuario actual"
        date="Hoy"
      >
        <template #default>
          <div class="mt-3">
            <p><strong>Email:</strong> {{ user?.email }}</p>
            <p><strong>Rol:</strong> {{ user?.user_type }}</p>
            <UiButton class="mt-2" @click="goToTodos">Ir a tus tareas</UiButton>
          </div>
        </template>
      </UiCard>
    </section>
  </ClientOnly>
</template>

<script setup>
  const user = ref(null);
  const router = useRouter();

  onMounted(async () => {
    const res = await fetch('/api/users/current');
    user.value = await res.json();
  });

  function goToTodos() {
    router.push('/todos');
  }

  definePageMeta({
    middleware: 'member',
    layout: 'member',
  });
</script>
