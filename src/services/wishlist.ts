import { axiosInstance } from '@/config/axios'
import { IWishlist } from '@/interface/wishlist'

const API = 'wishlist'

export const WishlistService = {
  create: async (userId: string, data: IWishlist) => {
    try {
      const response = await axiosInstance.post(`/${API}/${userId}`, data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  getAll: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/${API}/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (userId: string, data: IWishlist) => {
    try {
      const response = await axiosInstance.delete(`/${API}/${userId}/remove?productId=${data._id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
