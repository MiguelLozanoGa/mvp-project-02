<template>
  <div class="container mt-5">
    <h1 class="mb-4">Últimas Noticias</h1>
    <!-- <pre>{{ news }}</pre> -->
    <ClientOnly>
      <div v-if="error">Error al cargar las noticias</div>
      <div v-else-if="pending">Cargando noticias...</div>
      <div v-else>
        <div class="row">
          <div
            class="col-lg-6"
            v-for="article in news.articles"
            :key="article.url"
          >
            <UiCard
              :title="article.title"
              :description="article.description"
              :img="article.urlToImage"
              :date="formatDate(article.publishedAt)"
            >
              <NuxtLink
                class="btn btn-primary"
                :to="`/news/${slugify(article.title)}`"
              >
                Leer más
              </NuxtLink>
            </UiCard>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
  const config = useRuntimeConfig();
  const apiKey = config.public.newsApiKey;

  const {
    data: news,
    pending,
    error,
  } = await useFetch(
    () => `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
  );

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
</script>
