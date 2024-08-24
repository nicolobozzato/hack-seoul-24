// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/style/main.css", "element-plus/dist/index.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "2024-08-25",
  modules: [
    "@nuxt/image",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@vesp/nuxt-fontawesome",
  ],
});
