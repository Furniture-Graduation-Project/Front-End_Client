import { AxiosResponse } from 'axios'
import { axiosInstance } from '../config/axios'
import { ICreateReview, IReview } from '../interface/review'
import { IApiResponse } from '@/interface/apiRespose'

const API_URL = '/review'

export const ReviewService = {
  create: async (review: ICreateReview): Promise<AxiosResponse<IApiResponse<IReview>>> => {
    const response = await axiosInstance.post(API_URL, review)
    return response
  },
  getAll: async (
    productId: string,
    pagination: { pageIndex: number; pageSize: number }
  ): Promise<AxiosResponse<IApiResponse<IReview[]>>> => {
    const response = await axiosInstance.get(
      `${API_URL}/product/${productId}?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
    )
    return response
  }
}
