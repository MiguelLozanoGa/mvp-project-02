<template>
  <div>
    <button :class="`btn ${color}`" @click="handler">
      <slot />
    </button>
  </div>
</template>

<script setup>
  const props = defineProps({
    color: {
      type: String,
      default: 'btn-primary',
    },
    event: {
      type: String,
      default: 'share', // Por defecto emite 'share'
    },
  });

  const emit = defineEmits(['share', 'seen']);

  const handler = () => {
    console.log(`Click emitiendo evento: ${props.event}`);
    emit(props.event); // Emite el evento que te pasan como prop
  };
</script>
