// ~/shared/store/useAuthStore.ts
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFetch } from '@/shared/api/fetchRequest'
import { useUserStore } from '~/shared/store/userStore'
interface AuthTokens {
  token: string
  refreshToken: string
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const fetchRequest = useFetch()
    const router = useRouter()
    const toast = useToast()
    const userStore = useUserStore()

    // --- state ---
    const token = ref('')
    const refreshToken = ref('')
    const loggedIn = ref(false)

    // --- actions ---
    const successLogin = (tokens: AuthTokens) => {
      loggedIn.value = true
      token.value = tokens.token
      refreshToken.value = tokens.refreshToken
      if (userStore.user.role?.id === 1) {
        router.push('/admin/applications')
      } else if (userStore.user.role?.id === 2) {
        router.push('/client/portal')
      }
    }

    const logout = () => {
      loggedIn.value = false
      token.value = ''
      refreshToken.value = ''
      router.push('/')
    }

    const redirectToLogin = () => router.push('/auth/login')

    const refresh = async () => {
      try {
        if (!refreshToken.value) return redirectToLogin()

        // Викликаємо refresh токен через fetchRequest
        const data = await fetchRequest<AuthTokens>('/auth/refresh', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${refreshToken.value}`, // refresh токен окремо
          },
        })

        successLogin(data)
      } catch (e: any) {
        toast.error({
          title: 'Error',
          message: e?.data?.message || e?.message || 'Refresh failed',
          position: 'topRight',
        })
        console.error('Refresh error:', e)
        redirectToLogin()
      }
    }

    return {
      token,
      refreshToken,
      loggedIn,
      successLogin,
      logout,
      redirectToLogin,
      refresh,
    }
  },
  {
    persist: true,
  }
)
