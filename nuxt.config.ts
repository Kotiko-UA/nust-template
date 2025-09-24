// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	runtimeConfig: {
		// @ts-ignore
		secretKey: process.env.NUXT_SECRET_KEY, // тільки сервер
		public: {
			// @ts-ignore
			apiUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000',
		},
	},
	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],
})
