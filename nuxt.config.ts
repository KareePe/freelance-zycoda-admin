// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/css/main.css", "~/assets/css/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#BF2C7B" },
        { name: "msapplication-navbutton-color", content: "#BF2C7B" },
        { name: "apple-mobile-web-app-status-bar-style", content: "#BF2C7B" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "images/logo/symbol/square.png",
        },
      ],
    },
  },
  modules: ["@nuxt/ui", "@vueform/nuxt", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_BASE_DEV: process.env.API_BASE_DEV,
    },
  },
});
