<template>
  <div v-for="item in items" :key="getKey(item)">
    <slot :item="item"></slot>
  </div>
</template>

<script setup>
  defineProps({
    items: { type: Array, required: true },
    getKey: { type: Function, default: (item) => item.id },
  });
</script>
