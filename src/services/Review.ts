import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IReview } from '@/interface/review'
import { AxiosResponse } from 'axios'

const API = 'review'

export const ReviewService = {
  create: async (data: IReview): Promise<AxiosResponse<IApiResponse<IReview>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IReview>> = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo review mới:', error)
      throw error
    }
  },

  getAll: async (pagination: {
    pageIndex: number
    pageSize: number
  }): Promise<AxiosResponse<IApiResponse<IReview[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IReview[]>> = await axiosInstance.get(
        `${API}?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error('Lỗi khi lấy danh sách review:', error)
      throw error
    }
  }
}
