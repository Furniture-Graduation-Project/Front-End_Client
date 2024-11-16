import { IUser } from '@/interface/user'
import axiosAuth from '@/middleware'
import axios from 'axios'
// import { accessToken } from '@/middleware'
import Cookies from 'js-cookie'

export const AuthService = {
  signIn: async (user: IUser) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_AUTH}/signin`, user)
      const { accessToken, refreshToken } = response.data

      // Lưu accessToken và refreshToken vào cookie
      Cookies.set('accessToken', accessToken, { expires: 1 / 24 / 60 / 2 }) // expires in 30 minutes
      Cookies.set('refreshToken', refreshToken, { expires: 7 }) // expires in 7 days

      // Chuyển hướng đến trang chính
      window.location.href = '/'
    } catch (error) {
      console.error('Login Error:', error)
      alert('Login failed. Please check your credentials.')
    }
  },
  signUp: async (data: IUser) => {
    try {
      const response = await axiosAuth.post('/signup', data)

      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getAll: async () => {
    try {
      const response = await axiosAuth.get('/users')
      return response
    } catch (error) {
      console.log(error)
    }
  },
  getById: async (id: string) => {
    try {
      const response = await axiosAuth.get(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axiosAuth.delete(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
