import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IProductItem } from '@/interface/productItem'
import { AxiosResponse } from 'axios'

const API = '/product-item'

export const ProductItemService = {

  getProductById: async (id: string): Promise<AxiosResponse<IApiResponse<IProductItem[]>>> => {
    try {
      const response = await axiosInstance.get<IApiResponse<IProductItem[]>>(`${API}/product/${id}?status=active`)
      return response
    } catch (error) {
      throw error
    }
  }
}
