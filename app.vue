<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  if (process.client) {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }
</script>
