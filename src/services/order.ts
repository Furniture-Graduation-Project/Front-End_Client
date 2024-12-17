import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IOrder, IOrderItem } from '@/interface/order'
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

  getAll: async (
    pagination: {
      pageIndex: number
      pageSize: number
    },
    params: any
  ): Promise<AxiosResponse<IApiResponse<IOrder[]>>> => {
    try {
      let url = `${API}/client/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key] !== undefined && params[key] !== null) {
            url += `&${key}=${encodeURIComponent(params[key])}`
          }
        })
      }
      const response: AxiosResponse<IApiResponse<IOrder[]>> = await axiosInstance.get(url)
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
  },
  checkProducts: async (data: IOrderItem[]): Promise<AxiosResponse<IApiResponse<IOrderItem[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrderItem[]>> = await axiosInstance.post(`${API}/check`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi kiểm tra đơn hàng:`, error)
      throw error
    }
  },
  createQR: async (data: IOrder): Promise<AxiosResponse<IApiResponse<any>>> => {
    try {
      const response: AxiosResponse<IApiResponse<any>> = await axiosInstance.post(`${API}/create-qr`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi tạo qr code:`, error)
      throw error
    }
  },
  payment: async (id: string, data: any): Promise<AxiosResponse<IApiResponse<any>>> => {
    try {
      const response: AxiosResponse<IApiResponse<any>> = await axiosInstance.put(`${API}/payment/` + id, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi tạo qr code:`, error)
      throw error
    }
  }
}
