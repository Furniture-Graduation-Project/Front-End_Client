import { useQuery } from '@tanstack/react-query'
import { CartService } from '@/services/cart'

export const useCartQuery = (userId: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      return await CartService.getCartByUserId(userId)
    },
    enabled: !!userId
  })

  return {
    data,
    isLoading,
    isError,
    error,
    ...rest
  }
}
