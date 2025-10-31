import { useAuthStore } from '@/shared/store/authStore'
import { ofetch, type FetchOptions } from 'ofetch'

export const useFetch = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const fetchClient = ofetch.create({
    baseURL: config.public.apiBaseUrl,

    async onRequest({ request, options }) {
      const url = typeof request === 'string' ? request : request.url

      if (authStore.token && !url.includes('auth/refresh')) {
        const headers = new Headers(options.headers || {})
        headers.set('Authorization', `Bearer ${authStore.token}`)
        options.headers = headers
      }
    },

    async onResponse({ response }) {
      const { data } = response._data
      return data
    },

    async onResponseError({ response, request, options }) {
      const url = typeof request === 'string' ? request : request.url

      if (response?.status === 401 && url.includes('auth/refresh')) {
        await authStore.logout()
        return void 0
      }

      if (response?.status === 401 && !(options as any)._retry) {
        ;(options as any)._retry = true
        try {
          await authStore.refresh()
          void fetchClient(request, options)
        } catch (err) {
          throw err
        }
      }

      throw (
        response._data || {
          status: response.status,
          message: response.statusText,
        }
      )
    },
  })
  return <T = any>(
    input: string,
    options?: Omit<FetchOptions<'json'>, 'responseType'> & {
      responseType?: 'json'
    }
  ) => {
    return fetchClient<T>(input, { ...options, responseType: 'json' })
  }
}
