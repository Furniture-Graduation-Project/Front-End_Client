import { ReviewService } from '@/services/review'
import { useQuery } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'
export const useReviewQuery = (productId: string, pagination: PaginationState) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: ['Review'],
    queryFn: async () => {
      const response = await ReviewService.getAll(productId, pagination)
      return response.data
    },
    enabled: !!productId
  })

  return {
    data,
    isLoading,
    isError,
    error,
    ...rest
  }
}
