<template>
  <div class="card shadow-sm mb-4 h-100 d-flex flex-column">
    <img
      :src="imageSrc"
      @error="imageSrc = fallback"
      class="card-img-top"
      alt="Imagen noticia"
    />
    <div class="card-body d-flex flex-column">
      <div class="small text-muted mb-1">{{ date }}</div>
      <h2 class="card-title h5 mb-2">{{ title }}</h2>
      <p class="card-text flex-grow-1 text-secondary">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    title: String,
    description: String,
    img: String,
    date: String,
  });

  const fallback = 'https://via.placeholder.com/700x350?text=No+Image';
  const imageSrc = ref(props.img || fallback);
</script>
