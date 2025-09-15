export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const res = await $fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.newsApiKey}`
  );
  return res;
});
