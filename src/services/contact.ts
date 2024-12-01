import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IContact } from '@/interface/contact'
import { AxiosResponse } from 'axios'

const API = 'contact'

export const ContactService = {
  create: async (data: IContact): Promise<AxiosResponse<IApiResponse<IContact>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IContact>> = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi gủi mail liên hệ:', error)
      throw error
    }
  }
}
