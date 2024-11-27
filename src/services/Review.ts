import { axiosInstance } from '../config/axios'
import { IReview } from '../interface/review'

const API_URL = '/reviews'

export const ReviewService = {
  getAllReviews: async (): Promise<IReview[]> => {
    const response = await axiosInstance.get(API_URL)
    return response.data.data
  },

  getReviewById: async (id: string): Promise<IReview> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`)
    return response.data
  },

  createReview: async (review: IReview): Promise<IReview> => {
    const response = await axiosInstance.post(API_URL, review)
    return response.data
  },

  updateReviewById: async (id: string, updatedReview: IReview): Promise<IReview> => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updatedReview)
    return response.data
  },

  deleteReviewById: async (id: string): Promise<IReview> => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`)
    return response.data
  },

  getReviewsByProductId: async (productId: string): Promise<IReview[]> => {
    const response = await axiosInstance.get(`${API_URL}/product/${productId}`)
    return response.data.data
  }
}
