import { defineStore } from 'pinia'
import { useCookie } from '#app'
import { useApi } from '@/shared/composables/useApi'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null as string | null,
		refreshToken: null as string | null,
		user: null as any | string,
	}),

	actions: {
		async login(credentials: { email: string; password: string }) {
			const api = useApi()
			const data = await api('/auth/login', {
				method: 'POST',
				body: credentials,
			})

			this.token = data.accessToken
			this.refreshToken = data.refreshToken
			this.user = data.user

			// зберігаємо токен у куках (краще ніж localStorage)
			const tokenCookie = useCookie('token')
			tokenCookie.value = this.token
		},

		async refresh() {
			const api = useApi()
			const data = await api('/auth/refresh', {
				method: 'POST',
				body: { refreshToken: this.refreshToken },
			})

			this.token = data.accessToken
			this.refreshToken = data.refreshToken
			const tokenCookie = useCookie('token')
			tokenCookie.value = this.token
		},

		logout() {
			this.token = null
			this.refreshToken = null
			this.user = null

			const tokenCookie = useCookie('token')
			tokenCookie.value = null
		},
	},
})
