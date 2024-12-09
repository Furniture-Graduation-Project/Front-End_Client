export interface IUser {
  _id: string
  email: string
  name?: string
  password: string
  confirmPassword?: string
  role?: string
  avatar?: string
  phone?: string
  address?: string
  active?: boolean
  createdAt?: string
  updatedAt?: string
}
