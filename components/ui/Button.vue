<template>
  <button :class="`btn ${color}`">
    <slot />
  </button>
</template>

<script setup>
  defineProps({
    color: {
      type: String,
      default: 'btn-primary',
    },
  });
</script>
