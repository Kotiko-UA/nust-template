import { useAuthStore } from '@/shared/store/authStore'
import { useUserStore } from '~/shared/store/userStore'
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const userStore = useUserStore()

  if (
    auth.loggedIn &&
    userStore.user?.role?.id === 1 &&
    (to.path.startsWith('/auth/') || to.path.startsWith('/client/'))
  ) {
    return navigateTo('/admin/applications')
  } else if (
    auth.loggedIn &&
    userStore.user?.role?.id === 2 &&
    (to.path.startsWith('/auth/') || to.path.startsWith('/admin/'))
  ) {
    return navigateTo('/client/portal')
  }
})
