import { ReviewService } from '@/services/Review'
import { useQuery } from '@tanstack/react-query'

export const useReviewQuery = (id?: string, productId?: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id ? ['Review', id] : productId ? ['Review', 'Product', productId] : ['Review'],
    queryFn: async () => {
      if (id) {
        return await ReviewService.getReviewById(id)
      } else if (productId) {
        return await ReviewService.getReviewsByProductId(productId)
      } else {
        return await ReviewService.getAllReviews()
      }
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
