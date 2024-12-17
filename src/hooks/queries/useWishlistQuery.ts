import { WishlistService } from '@/services/wishlist'
import { useQuery } from '@tanstack/react-query'

export const useWishlistQuery = (userId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['WISHLIST', userId],
    queryFn: async () => {
      return userId && (await WishlistService.getAll(userId))
    }
  })
  return { data, ...rest }
}
