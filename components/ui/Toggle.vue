<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      :checked="checked"
      @change="toggle"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    checked: Boolean,
  });
  const emit = defineEmits(['toggle']);

  const toggle = () => {
    emit('toggle');
  };
</script>
