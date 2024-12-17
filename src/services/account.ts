/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/config/axios'
import { IUser } from '@/interface/user'

export const AuthService = {
  signIn: async (user: IUser) => {
    try {
      const response = await axiosInstance.post(`/signin`, user)
      return response
    } catch (error) {
      console.error('Login Error:', error)
      throw error
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
      throw error
    }
  },
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  update: async (id: string, data: IUser) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, data)
      return response
    } catch (error: any) {
      console.log(error)
      throw error
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
  sendOtp: async (email: string) => {
    try {
      const token = localStorage.getItem('token')

      const headers = token ? { Authorization: `Bearer ${token}` } : undefined

      const response = await axiosInstance.post('/users/send-otp', { email }, { headers })

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  verifyOtp: async (otp: string) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const res = await axiosInstance.post(
        '/users/verify-otp',
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  changePassword: async (data: { newPassword: string; confirmPassword: string }) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const res = await axiosInstance.post(
        '/users/change-password',
        { newPassword: data.newPassword, confirmPassword: data.confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return res
    } catch (error) {
      console.log(error)
      throw error
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
