// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css'],

  runtimeConfig: {
    newsApiKey: process.env.NEWS_API_KEY, // Solo accesible en el servidor
    public: {
      newsApiKey: process.env.NEWS_API_KEY, // Accesible en el cliente también
    },
  },
});
