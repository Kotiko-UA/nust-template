// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/utils/_variables.scss" as *;
            @use "@/assets/styles/utils/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800],
      styles: ['normal', 'italic'],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
    },
  },
  ssr: true,
  routeRules: {
    '/admin/**': { ssr: false },
    '/client/**': { ssr: false },
    '/auth/**': { ssr: false },
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'nuxt-toast',
  ],
  // nitro: {
  //   routeRules: {
  //     '/api/**': { proxy: 'https://api.kotiko.work/**' },
  //   },
  // }, // - для бекенду Railway
})
