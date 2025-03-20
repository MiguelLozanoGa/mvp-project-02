<template>
  <div class="container mt-5">
    <h1 class="mb-4">Detalle de la Noticia</h1>

    <div v-if="!article">No se encontró la noticia</div>
    <div v-else class="card">
      <img
        :src="article.urlToImage || placeholder"
        class="card-img-top"
        alt="Imagen noticia"
      />
      <div class="card-body">
        <div class="small text-muted">
          {{ formatDate(article.publishedAt) }}
        </div>
        <h5 class="card-title">{{ article.title }}</h5>
        <p class="card-text">{{ article.content || article.description }}</p>
        <a :href="article.url" target="_blank" class="btn btn-primary"
          >Ver en el sitio original</a
        >
      </div>
    </div>

    <NuxtLink to="/news">
      <UiButton color="btn-secondary" class="mt-3">Volver a noticias</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
  const placeholder =
    'https://dummyimage.com/700x350/cccccc/000000&text=No+Image';

  // Recuperar localStorage
  const article = JSON.parse(localStorage.getItem('detalleNoticia'));

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
</script>
