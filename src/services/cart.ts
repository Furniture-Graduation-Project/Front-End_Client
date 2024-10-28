import { axiosInstance } from '@/config/axios'
import { AddToCartData, UpdateCartItemData } from '@/interface/cart'
export const CartService = {
  getCartByUserId: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/cart/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  addToCart: async (data: AddToCartData) => {
    try {
      const response = await axiosInstance.post('/cart', data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  updateCartItem: async (cartItemId: string, data: UpdateCartItemData) => {
    try {
      const response = await axiosInstance.put(`/cart/${cartItemId}`, data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  removeCartItem: async (cartItemId: string) => {
    try {
      const response = await axiosInstance.delete(`/cart/${cartItemId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  clearCart: async (userId: string) => {
    try {
      const response = await axiosInstance.delete(`/cart/clear/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
