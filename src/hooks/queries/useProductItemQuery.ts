import { ProductItemService } from '@/services/productItem'
import { useQuery } from '@tanstack/react-query'
import { IProductItem } from '@/interface/productItem'
import { IApiResponse } from '@/interface/apiRespose'

export const useProductItemsByProductId = (id: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery<IApiResponse<IProductItem[]>, Error>({
    queryKey: ['ProductItem', id],
    queryFn: async () => {
      const response = await ProductItemService.getProductById(id)
      return response.data
    }
  })

  return {
    data,
    isLoading,
    isError,
    error,
    ...rest
  }
}
