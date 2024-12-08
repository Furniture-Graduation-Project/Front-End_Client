import { WishlistService } from '@/services/wishlist'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '../use-toast'
import { IWishlist } from '@/interface/wishlist'

type MutationQueryProps = {
  action: 'ADD' | 'REMOVE'
}

const useWishlistMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['WISHLIST']
    })
    switch (action) {
      case 'ADD':
        break
      case 'REMOVE':
        break
    }
  }

  const handleError = (error: { response: { data: { message: string } } }) => {
    const message = error.response?.data?.message || 'Có lỗi xảy ra!'
    toast({
      title: 'Có lỗi xảy ra!',
      description: message,
      variant: 'destructive'
    })
    console.log('[WISHLIST]', error)
  }

  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: IWishlist }) => {
      switch (action) {
        case 'ADD':
          return await WishlistService.create(userId, data)
        case 'REMOVE':
          return await WishlistService.delete(userId, data)
      }
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  return { mutate, ...rest }
}

export default useWishlistMutation
