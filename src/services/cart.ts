import { axiosInstance } from '@/config/axios';
import { AddToCartData, UpdateCartItemData } from '@/interface/cart';

export const CartService = {
  getCartByUserId: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addToCart: async (data: AddToCartData) => {
    try {
      const response = await axiosInstance.post('/cart', data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateCartItem: async (cartItemId: string, data: UpdateCartItemData) => {
    try {
      const response = await axiosInstance.put(`/cart/${cartItemId}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  removeCartItem: async (productId: string, productItemId: string) => {
    try {
      const response = await axiosInstance.delete(`cart/${productId}/${productItemId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  clearCart: async (userId: string) => {
    try {
      const response = await axiosInstance.delete(`/cart/clear/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  increaseQuantity: async (productId: string, productItemId: string) => {

    try {
      const response = await axiosInstance.patch(`/cart/increase/${productId}/${productItemId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  decreaseQuantity: async ( productId: string, productItemId: string) => {
    try {
      const response = await axiosInstance.patch(`/cart/decrease/${productId}/${productItemId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
