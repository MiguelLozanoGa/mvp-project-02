<template>
  <button :class="`btn ${color}`" @click="handleClick" v-bind="$attrs">
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

  const handleClick = (e) => {
    if (e?.preventDefault) e.preventDefault();
    console.log(`[UiButton] Click emitiendo evento: ${props.event}`);
    emit(props.event, e);
  };
</script>
