import { ofetch } from 'ofetch'
import { useAuthStore } from '../store/useAuthStore'

export const useApi = () => {
	const config = useRuntimeConfig()
	const auth = useAuthStore()

	return ofetch.create({
		baseURL: config.public.apiUrl,
		credentials: 'include', // 👈 cookies будуть автоматично відправлятись

		async onResponseError({ response }) {
			if (response.status === 401) {
				auth.logout()
				return navigateTo('/login')
			}
		},
	})
}
