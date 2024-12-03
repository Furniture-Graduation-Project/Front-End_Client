import { axiosInstance } from '@/config/axios'
import { IUser } from '@/interface/user'

export const AuthService = {
  signIn: async (user: IUser) => {
    try {
      const response = await axiosInstance.post(`/signin`, user)
      return response
    } catch (error) {
      console.error('Login Error:', error)
      alert('Login failed. Please check your credentials.')
    }
  },
  signUp: async (data: IUser) => {
    try {
      const response = await axiosInstance.post('/signup', data)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/users')
      return response
    } catch (error) {
      console.log(error)
    }
  },
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  update: async (id: string, data: IUser) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, data)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  refreshToken: async (): Promise<string | null> => {
    try {
      const response = await axiosInstance.post('/refreshToken')
      if (!response) {
        throw new Error('Không thể làm mới access token')
      }
      const data = response.data
      return data.token
    } catch (error) {
      return null
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/logout')
    } catch (error) {
      return error
    }
  }
}
