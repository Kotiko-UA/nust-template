import { defineStore } from 'pinia'
import type { UserType, UserDataType } from '@/shared/types/user-type'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = reactive<UserType>({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      active: false,
      phone: '',
      company: '',
      type: '',
      role: { id: NaN },
    })
    const changeUser = (data: UserDataType) => {
      data.id && (user.id = data.id)
      data.firstName && (user.firstName = data.firstName)
      data.lastName && (user.lastName = data.lastName)
      data.email && (user.email = data.email)
      data.phone && (user.phone = data.phone)
      data.company && (user.company = data.company)
      data.active && (user.active = data.active)
      data.type && (user.type = data.type)
      data.role?.id && (user.role.id = data.role.id)
    }
    return { user, changeUser }
  },
  {
    persist: true,
  }
)
