import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { AxiosResponse } from 'axios'

const API = 'sheet'

export const SheetService = {
  create: async (mail: string): Promise<AxiosResponse<IApiResponse<string>>> => {
    try {
      const response: AxiosResponse<IApiResponse<string>> = await axiosInstance.post(API, mail)
      return response
    } catch (error) {
      console.error('Lỗi khi gủi mail nhận khuyến mãi:', error)
      throw error
    }
  }
}
