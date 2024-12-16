import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IProduct } from '@/interface/product'
import { AxiosResponse } from 'axios'

const API_URL = '/product'

export const ProductService = {
  getAll: async (categoryId?: string): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const query = categoryId ? `?categoryId=${categoryId}` : ''
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(`${API_URL}${query}`)
      console.log('Dữ liệu sản phẩm từ API:', response.data)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả sản phẩm:', error)
      throw error
    }
  },

  getProductNew: async (categoryId?: string): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      let query = `/new`
      if (categoryId) {
        query += `?categoryId=${categoryId}`
      }
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(`${API_URL}${query}`)
      console.log('Dữ liệu sản phẩm mới từ API:', response.data)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm mới:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IProduct>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct>> = await axiosInstance.get(`${API_URL}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, error)
      throw error
    }
  },

  getByStatus: async (status: string): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(`${API_URL}/status/${status}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm theo trạng thái ${status}:`, error)
      throw error
    }
  },

  getLimited: async (pagination: {
    pageIndex: number
    pageSize: number
    categoryId?: string
    materialId?: string
    searchName?: string
  }): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      let query = `?page=${pagination.pageIndex}&limit=${pagination.pageSize}`

      if (pagination.categoryId) {
        query += `&categoryId=${pagination.categoryId}`
      }

      if (pagination.materialId) {
        query += `&materialId=${pagination.materialId}`
      }

      if (pagination.searchName) {
        query += `&name=${encodeURIComponent(pagination.searchName)}`
      }

      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(`${API_URL}/limited${query}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm giới hạn:`, error)
      throw error
    }
  },

  getByName: async (name: string): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(`${API_URL}/search`, {
        params: { name }
      })
      return response
    } catch (error) {
      console.error(`Lỗi khi tìm kiếm sản phẩm theo tên "${name}":`, error)
      throw error
    }
  },

  getProductWithPrice: async (id: string) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${id}/with-price`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, error)
      throw error
    }
  }
}
