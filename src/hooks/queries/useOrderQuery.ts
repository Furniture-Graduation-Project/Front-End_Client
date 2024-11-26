import { IApiResponse } from '@/interface/apiRespose'
import { IOrder } from '@/interface/order'
import { OrderService } from '@/services/order'
import { useQuery } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'

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

export const useMultipleOrderQuery = ({ pageIndex, pageSize }: PaginationState) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER', pageIndex, pageSize],
    queryFn: async () => {
      const response = await OrderService.getAll({ pageIndex, pageSize })
      return response.data
    }
  })
  return { data, ...rest }
}
