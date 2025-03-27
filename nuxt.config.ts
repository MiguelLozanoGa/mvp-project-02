// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['bootstrap/dist/css/bootstrap.min.css'],

  modules: ['@pinia/nuxt'],

  pinia: {
    autoImports: ['defineStore'], // 🔥 PRO TIP: permite usar defineStore sin importar
  },

  imports: {
    dirs: ['composables'], // 🔥 PRO TIP: auto-importa tus composables como useTodos()
  },

  runtimeConfig: {
    newsApiKey: process.env.NEWS_API_KEY, // Solo accesible en el servidor
    public: {
      newsApiKey: process.env.NEWS_API_KEY, // Accesible en el cliente también
    },
  },
});
