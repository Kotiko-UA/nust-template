export default defineNuxtPlugin(() => {
  const siteKey = useRuntimeConfig().public.recaptchaSiteKey as string

  let loadingPromise: Promise<void> | null = null

  const loadScript = () => {
    if (typeof window === 'undefined') return Promise.resolve()
    if ((window as any).grecaptcha && (window as any).grecaptcha.execute)
      return Promise.resolve()
    if (loadingPromise) return loadingPromise

    loadingPromise = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script')
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
        siteKey
      )}`
      s.async = true
      s.defer = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
      document.head.appendChild(s)
    })
    return loadingPromise
  }

  const grecaptchaReady = () =>
    new Promise<void>(resolve => {
      const grecaptcha = (window as any).grecaptcha
      grecaptcha.ready(() => resolve())
    })

  const getToken = async (action: string) => {
    if (!siteKey) throw new Error('Missing NUXT_PUBLIC_RECAPTCHA_SITE_KEY')
    await loadScript()
    const g = (window as any).grecaptcha
    if (!g)
      throw new Error('grecaptcha not available (blocked by extension/CSP?)')
    await grecaptchaReady()
    const exec = g.enterprise?.execute?.bind(g.enterprise) ?? g.execute?.bind(g)

    if (typeof exec !== 'function') {
      throw new Error(
        'grecaptcha.execute is not a function (wrong key or script not loaded)'
      )
    }

    return exec(siteKey, { action }) as Promise<string>
  }

  return {
    provide: { recaptcha: { getToken } },
  }
})
