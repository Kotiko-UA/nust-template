export type LoginType = { email: string; password: string }

export type RegistrationType = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type ResetEmailType = {
  email: string
}

export type ResetPasswordType = {
  newPassword: string
  confirmPassword: string
}
