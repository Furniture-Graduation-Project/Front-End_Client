import { IApiResponse } from '@/interface/apiRespose'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/config/axios'
import { IMaterial, IMaterialDataResponse } from '@/interface/material'

const API_URL = '/material'

export const MaterialService = {
  create: async (material: IMaterial): Promise<AxiosResponse<IApiResponse<IMaterial>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IMaterial>> = await axiosInstance.post(API_URL, material)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo vật liệu mới:', error)
      throw error
    }
  },

  getAllMaterials: async (): Promise<AxiosResponse<IApiResponse<IMaterial[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IMaterial[]>> = await axiosInstance.get(API_URL)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả vật liệu:', error)
      throw error
    }
  },

  getMaterialById: async (id: string): Promise<IMaterialDataResponse> => {
    try {
      const response: AxiosResponse<IMaterialDataResponse> = await axiosInstance.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Lỗi khi lấy vật liệu với ID ${id}:`, error)
      throw error
    }
  },

  updateMaterialById: async (
    id: string,
    updatedMaterial: Partial<IMaterial>
  ): Promise<AxiosResponse<IApiResponse<IMaterial>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IMaterial>> = await axiosInstance.put(
        `${API_URL}/${id}`,
        updatedMaterial
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật vật liệu với ID ${id}:`, error)
      throw error
    }
  },

  deleteMaterial: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API_URL}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa vật liệu với ID ${id}:`, error)
      throw error
    }
  },

  getLimitedMaterials: async (pagination: {
    pageIndex: number
    pageSize: number
  }): Promise<AxiosResponse<IApiResponse<IMaterial[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IMaterial[]>> = await axiosInstance.get(
        `${API_URL}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy danh sách vật liệu:`, error)
      throw error
    }
  }
}
