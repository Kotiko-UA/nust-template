<script setup lang="ts">
import type { LoginType } from '~/shared/types/auth-type'
import { useAuthStore } from '~/shared/store/authStore'
import { useFetch } from '@/shared/api/fetchRequest'
import { useUserStore } from '~/shared/store/userStore'

const fetchRequest = useFetch()
const authStore = useAuthStore()
const userStore = useUserStore()

const initialState = (): LoginType => ({
  email: '',
  password: '',
})
const toast = useToast()
const router = useRouter()

const state = reactive<LoginType>(initialState())

const loading = ref(false)

const onSendVerifyCode = async () => {
  loading.value = true
  try {
    await fetchRequest('/users/send-verify-code', {
      method: 'POST',
      body: {
        email: userStore.user.email,
      },
    })
    router.push('/auth/login')
  } catch (err: any) {
    toast.error({
      title: 'Error',
      message: 'Something went wrong',
      position: 'topRight',
    })
  } finally {
    loading.value = false
  }
}

const onLogin = async () => {
  loading.value = true
  userStore.changeUser({ email: state.email })
  try {
    const data = await fetchRequest('/auth/login', {
      method: 'POST',
      body: {
        email: state.email,
        password: state.password,
      },
    })
    toast.success({
      title: 'Success',
      position: 'topRight',
    })
    userStore.changeUser(data.data.user)
    authStore.successLogin(data.data)
  } catch (err: any) {
    const code = err?.code
    const status = err?.statusCode

    if (status === 400 && code === 113) {
      toast.error({
        title: 'Access denied',
        message: 'Verify your email',
        position: 'topRight',
      })
      await onSendVerifyCode()
      // router.push('/auth/confirmemail')
    } else if (status === 401) {
      toast.error({
        title: 'Invalid credentials',
        message: 'Email or password is incorrect',
        position: 'topRight',
      })
    } else if (status === 500) {
      toast.error({
        title: 'Server error',
        message: 'Please try again later',
        position: 'topRight',
      })
    } else {
      toast.error({
        title: 'Error',
        message: 'Something went wrong',
        position: 'topRight',
      })
    }
  } finally {
    loading.value = false
    Object.assign(state, initialState())
  }
}
</script>
<template>
  <div>login</div>
</template>
