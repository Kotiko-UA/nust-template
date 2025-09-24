import { ofetch } from 'ofetch'
import { useAuthStore } from '../store/useAuthStore'

export const useApi = () => {
	const auth = useAuthStore()

	const api = ofetch.create({
		baseURL: import.meta.env.NUXT_BASE_URL,

		onRequest({ options }) {
			if (auth.token && !options.url?.includes('auth/refresh')) {
				options.headers = {
					...options.headers,
					Authorization: `Bearer ${auth.token}`,
				}
			}
		},

		async onResponseError({ response, request, options }) {
			if (response.status === 401 && !options._retry) {
				options._retry = true
				try {
					await auth.refresh()
					return await api(request, options) // повторний запит
				} catch {
					auth.logout()
					throw response._data
				}
			}
			throw response._data
		},
	})

	return api
}
