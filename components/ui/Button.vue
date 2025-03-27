<template>
  <button :class="`btn ${color}`" @click="handler">
    <slot />
  </button>
</template>

<script setup>
  const props = defineProps({
    color: {
      type: String,
      default: 'btn-primary',
    },
    event: {
      type: String,
      default: 'click',
    },
  });

  const emit = defineEmits(['click', 'delete', 'edit', 'share', 'seen']);

  const handler = () => {
    console.log(`[UiButton] Click emitiendo evento: ${props.event}`);
    emit(props.event);
  };
</script>
