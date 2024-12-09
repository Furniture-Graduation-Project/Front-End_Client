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
  create: async (userId: string, data: IAddress) => {
    try {
      const response = await axiosInstance.post(`/locations/${userId}`, data)
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
  getOne: async (id: string, query: string) => {
    try {
      const response = await axiosInstance.get(`/locations/${id}/location?locationId=${query}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      return response
    } catch (error) {
      console.log(error)
    }
  },
  update: async (id: string, query: string, data: IAddress) => {
    try {
      const response = await axiosInstance.put(`/locations/${id}/location?locationId=${query}`, data)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (id: string, query: string) => {
    try {
      const response = await axiosInstance.delete(`/locations/${id}/location?locationId=${query}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  setDefaultLocation: async (id: string, query: string) => {
    try {
      const response = await axiosInstance.put(`/locations/${id}/location/default?locationId=${query}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
