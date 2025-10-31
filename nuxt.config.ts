// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },
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

    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-toast',
  ],
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
    '/auth/**': { ssr: false },
  },
})
