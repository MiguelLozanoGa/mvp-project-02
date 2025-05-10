<template>
  <div class="container mt-5">
    <h1 class="mb-4">Últimas Noticias</h1>

    <ClientOnly>
      <UiList :items="news.articles">
        <template #default="{ item: article }">
          <div class="card mb-3">
            <img
              :src="article.urlToImage"
              class="card-img-top"
              alt="Imagen de noticia"
            />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">{{ article.description }}</p>
              <p class="card-text">
                <small class="text-muted">{{
                  formatDate(article.publishedAt)
                }}</small>
              </p>
              <NuxtLink
                class="btn btn-primary"
                :to="`/news/${slugify(article.title)}`"
                >Leer más</NuxtLink
              >
            </div>
          </div>
        </template>
      </UiList>
    </ClientOnly>
  </div>
</template>

<script setup>
  import { useFetch } from '#app';

  const config = useRuntimeConfig();
  const apiKey = config.public.newsApiKey;

  const { data: news } = await useFetch('/api/news');

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
