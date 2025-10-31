<script setup lang="ts">
import type { RegistrationType } from '~/shared/types/auth-type'
import { useFetch } from '@/shared/api/fetchRequest'
import { useUserStore } from '~/shared/store/userStore'
import { useRouter } from 'vue-router'

const fetchRequest = useFetch()
const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const selectedType = ref<'professional' | 'contractor'>('professional')

const userTypeState = computed(() => ({
  professional: selectedType.value === 'professional',
  contractor: selectedType.value === 'contractor',
}))

const initialState = (): RegistrationType => ({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const state = reactive<RegistrationType>(initialState())
const loading = ref(false)

const onRegister = async () => {
  loading.value = true
  try {
    const { data } = await fetchRequest('/users/register', {
      method: 'POST',
      body: state,
    })

    toast.success({
      title: 'Success',
      message: 'Please verify your email',
      position: 'topRight',
    })

    await userStore.changeUser({ email: data.email })
    // await router.push('/auth/confirmemail')
  } catch (err: any) {
    toast.error({
      title: 'Error',
      message: err?.message || 'Something went wrong',
      position: 'topRight',
    })
  } finally {
    loading.value = false
    Object.assign(state, initialState())
  }
}
</script>

<template>
  <div>register</div>
</template>
