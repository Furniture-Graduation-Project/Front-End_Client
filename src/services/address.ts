import { axiosInstance } from '@/config/axios'
import { IAddress } from '@/interface/address'
import { IApiResponse } from '@/interface/apiRespose'
import { ILocation } from '@/interface/location'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

export const AddressServices = {
  getAll: async (): Promise<AxiosResponse<IApiResponse<ILocation[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<ILocation[]>> = await axiosInstance.get('/locations')
      return response
    } catch (error) {
      console.error('Error fetching locations:', error)
      throw error
    }
  },
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
      const { data } = await axiosInstance.get(`/locations/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
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
