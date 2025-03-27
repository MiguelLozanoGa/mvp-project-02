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

        <UiButton color="btn-success" event="share" @share="share"
          >Compartir</UiButton
        >

        <UiButton
          :color="seen ? 'btn-success' : 'btn-warning'"
          event="seen"
          @seen="markAsSeen"
        >
          {{ seen ? 'Vista' : 'Marcar como vista' }}
        </UiButton>
      </div>
    </div>

    <NuxtLink to="/news">
      <UiButton color="btn-secondary" class="mt-3">Volver a noticias</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const placeholder =
    'https://dummyimage.com/700x350/cccccc/000000&text=No+Image';
  const seen = ref(false);
  const article = ref(null);

  // Slug de la URL
  const slug = route.params.slug;

  // Obtener las noticias
  const config = useRuntimeConfig();
  const apiKey = config.public.newsApiKey;

  const { data: news } = await useFetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
  );

  // Buscar la noticia según el slug
  if (news.value && news.value.articles) {
    article.value = news.value.articles.find(
      (art) => slugify(art.title) === slug
    );
  }

  // Formatear fecha
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const share = () => {
    if (article.value) {
      const text = `${article.value.title} - ${article.value.url}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        text
      )}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const markAsSeen = () => {
    seen.value = true;
    console.log('Noticia marcada como vista');
  };

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
</script>
