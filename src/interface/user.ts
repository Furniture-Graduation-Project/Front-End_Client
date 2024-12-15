export interface IUser {
  _id: string
  id?: string
  email?: string
  name?: string
  password: string
  newPassword?: string
  confirmPassword?: string
  role?: string
  avatar?: string
  phone?: string
  address?: string
  active?: boolean
  locations?: string[]
  createdAt?: string
  updatedAt?: string
  otp?: string
}
