import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { ProductService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'

export const useSingleProductQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT', id],
    queryFn: async () => {
      const response = await ProductService.getById(id)
       return response.data
    },
    enabled: !!id
  })

  return { data, ...rest }
}

export const useMultipleProductQuery = (pagination?: any, searchTerm: string = '') => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT', pageIndex, searchTerm],
    queryFn: async () => {
      const response = await ProductService.getLimited({ pageIndex, pageSize })
      return response.data
    }
  })

  return { data, ...rest }
}
