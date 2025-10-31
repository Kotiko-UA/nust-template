import { defineStore } from 'pinia'
import type { UserType, UserDataType } from '@/shared/types/user-type'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = reactive<UserType>({
      id: '',
      name: '',
      email: '',
      active: false,
      role: { id: NaN },
    })
    const changeUser = (data: UserDataType) => {
      data.id && (user.id = data.id)
      data.name && (user.name = data.name)
      data.email && (user.email = data.email)
      data.active && (user.active = data.active)
      data.role?.id && (user.role.id = data.role.id)
    }
    return { user, changeUser }
  },
  {
    persist: true,
  }
)
