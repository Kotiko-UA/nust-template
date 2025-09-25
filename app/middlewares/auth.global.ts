import { useAuthStore } from '../../shared/store/useAuthStore'

export default defineNuxtRouteMiddleware(async to => {
	const auth = useAuthStore()

	// спробуємо підтягнути користувача, якщо його ще нема
	if (!auth.user) {
		await auth.fetchUser()
	}

	// якщо не залогінений → редірект на login
	if (!auth.user && to.path !== '/login') {
		return navigateTo('/login')
	}

	// якщо залогінений → не пускати на /login
	if (auth.user && to.path === '/login') {
		return navigateTo('/client')
	}
})
