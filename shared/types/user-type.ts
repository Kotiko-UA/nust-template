export type UserType = {
  id: string
  firstName: string
  lastName: string
  email: string
  active: boolean
  company: string
  phone: string
  type: 'professional' | 'contractor' | ''
  role: {
    id: number
  }
}
export type UserDataType = Partial<UserType>
