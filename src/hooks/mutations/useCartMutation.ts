import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CartService } from '@/services/cart'
import { useToast } from '../use-toast'
import { useTranslate } from '../useTranslate'

type CartMutation = 'ADD' | 'UPDATE' | 'REMOVE' | 'INCREASE' | 'DECREASE'

export const useCartMutation = (key: CartMutation) => {
  const { toast } = useToast()
  const { t } = useTranslate('cart.alert')
  const query = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async ({
      productId,
      productOptionId,
      data
    }: {
      productId?: string
      productOptionId?: string
      data?: any
    }) => {
      try {
        switch (key) {
          case 'ADD':
            toast({
              title: t('success'),
              variant: 'default'
            })
            return await CartService.addToCart(data)
          case 'UPDATE':
            if (!productOptionId) throw new Error('productOptionId is required')
            return await CartService.updateCartItem(productOptionId, data)
          case 'REMOVE':
            if (!productOptionId || !productId) throw new Error('Id is required')
            return await CartService.removeCartItem(productId, productOptionId)
          case 'INCREASE':
            if (!productOptionId || !productId) throw new Error('Id is required')
            return await CartService.increaseQuantity(productId, productOptionId)
          case 'DECREASE':
            if (!productOptionId || !productId) throw new Error('Id is required')
            return await CartService.decreaseQuantity(productId, productOptionId)
          default:
            throw new Error('Khóa không hợp lệ')
        }
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('description'),
        variant: 'destructive'
      })
    },
    onSettled: () => {
      console.log('Đã hoàn thành thao tác')
    }
  })

  return { mutate }
}
