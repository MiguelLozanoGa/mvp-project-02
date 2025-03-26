<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      :checked="checked"
      @change="$emit('toggle')"
    />
  </div>
</template>

<script setup>
  defineProps({
    checked: Boolean,
  });
</script>
