import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IOrder } from '@/interface/order'
import { AxiosResponse } from 'axios'

const API = 'order'

export const OrderService = {
  create: async (data: IOrder): Promise<AxiosResponse<IApiResponse<IOrder>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder>> = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng mới:', error)
      throw error
    }
  },

  getAll: async (pagination: {
    pageIndex: number
    pageSize: number
  }): Promise<AxiosResponse<IApiResponse<IOrder[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder[]>> = await axiosInstance.get(
        `${API}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IOrder>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder>> = await axiosInstance.get(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy đơn hàng với ID ${id}:`, error)
      throw error
    }
  },

  update: async (id: string, data: Partial<IOrder>): Promise<AxiosResponse<IApiResponse<IOrder>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder>> = await axiosInstance.put(`${API}/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật đơn hàng với ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa đơn hàng với ID ${id}:`, error)
      throw error
    }
  }
}
