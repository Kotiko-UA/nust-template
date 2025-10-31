import { useAuthStore } from '@/shared/store/authStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (
    !auth.loggedIn &&
    (to.path.startsWith('/client/') || to.path.startsWith('/admin'))
  ) {
    return navigateTo('/auth/login')
  }
})
