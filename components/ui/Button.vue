<template>
  <button :class="`btn ${color}`" @click="(e) => handler(e)">
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

  const handler = (e) => {
    if (e?.preventDefault) e.preventDefault();
    console.log(`[UiButton] Click emitiendo evento: ${props.event}`);
    emit(props.event);
  };
</script>
