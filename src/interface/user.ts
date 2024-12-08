export interface IUser {
  _id: string
  id?: string
  email: string
  name?: string
  password: string
  confirmPassword?: string
  role?: string
  avatar?: string
  phone?: string
  locations: string[]
  createdAt?: string
  updatedAt?: string
}
