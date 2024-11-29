import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CartService } from '@/services/cart'

type CartMutation = 'ADD' | 'UPDATE' | 'REMOVE' | 'INCREASE' | 'DECREASE'

export const useCartMutation = (key: CartMutation) => {
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
        console.error('Lỗi mutation:', error)
        throw error
      }
    },
    onSuccess: () => {
      console.log('Thao tác thành công')
      query.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('Lỗi trong quá trình thực hiện thao tác:', error)
    },
    onSettled: () => {
      console.log('Đã hoàn thành thao tác')
    }
  })

  return { mutate }
}
