export type LoginType = { email: string; password: string }

export type RegistrationType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  type: 'professional' | 'contractor'
  phone: string
  company: string
}

export type ResetEmailType = {
  email: string
}

export type ResetPasswordType = {
  newPassword: string
  confirmPassword: string
}
