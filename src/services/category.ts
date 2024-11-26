import { IApiResponse } from '@/interface/apiRespose'
import { ICategory, ICategoryDataResponse } from '@/interface/category'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/config/axios'

const API_URL = '/category'

export const CategoryService = {
  create: async (category: ICategory): Promise<AxiosResponse<IApiResponse<ICategory>>> => {
    try {
      const response: AxiosResponse<IApiResponse<ICategory>> = await axiosInstance.post(API_URL, category)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo danh mục mới:', error)
      throw error
    }
  },

  getAllCategories: async (): Promise<AxiosResponse<IApiResponse<ICategory[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<ICategory[]>> = await axiosInstance.get(API_URL)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả danh mục:', error)
      throw error
    }
  },

  getCategoryById: async (id: string): Promise<ICategoryDataResponse> => {
    try {
      const response: ICategoryDataResponse = await axiosInstance.get(`${API_URL}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy danh mục với ID ${id}:`, error)
      throw error
    }
  },

  updateCategoryById: async (
    id: string,
    updatedCategory: Partial<ICategory>
  ): Promise<AxiosResponse<IApiResponse<ICategory>>> => {
    try {
      const response: AxiosResponse<IApiResponse<ICategory>> = await axiosInstance.put(
        `${API_URL}/${id}`,
        updatedCategory
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật danh mục với ID ${id}:`, error)
      throw error
    }
  },

  deleteCategory: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API_URL}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa danh mục với ID ${id}:`, error)
      throw error
    }
  },

  getLimitedCategories: async (pagination: {
    pageIndex: number
    pageSize: number
  }): Promise<AxiosResponse<IApiResponse<ICategory[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<ICategory[]>> = await axiosInstance.get(
        `${API_URL}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy danh sách danh mục:`, error)
      throw error
    }
  }
}
