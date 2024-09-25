import { axiosInstance } from '@/config/axios'
import { IAddress } from '@/interface/address'

export const AddressServices = {
  create: async (data: IAddress) => {
    try {
      const response = await axiosInstance.post('/locations', data)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getById: async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/locations/${id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  },
  update: async (data: IAddress) => {
    try {
      const response = await axiosInstance.put(`/locations/${data._id}`, data)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (data: IAddress) => {
    try {
      const response = await axiosInstance.delete(`/locations/${data._id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
