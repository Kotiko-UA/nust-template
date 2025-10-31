export type UserType = {
  id: string
  name: string
  email: string
  active: boolean
  role: {
    id: number
  }
}
export type UserDataType = Partial<UserType>
