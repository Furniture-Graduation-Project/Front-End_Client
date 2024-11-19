import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { IApiResponse } from '@/interface/apiRespose'
import { IOrder } from '@/interface/order'
import { OrderService } from '@/services/order'
import { useQuery } from '@tanstack/react-query'

export const useSingleOrderQuery = (id: string | undefined) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER', id],
    queryFn: async (): Promise<IApiResponse<IOrder>> => {
      if (id) {
        const response = await OrderService.getById(id)
        return response.data
      }
      throw new Error('Order ID is required')
    }
  })
  return { data, ...rest }
}

export const useMultipleOrderQuery = (pagination?: any) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER', pageIndex, pageSize],
    queryFn: async () => {
      const response = await OrderService.getAll({ pageIndex, pageSize })
      return response.data
    }
  })
  return { data, ...rest }
}
