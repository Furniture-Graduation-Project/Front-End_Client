import { useMutation } from '@tanstack/react-query'
import { CartService } from '@/services/cart'

type CartMutation = 'ADD' | 'UPDATE' | 'REMOVE' | 'INCREASE' | 'DECREASE'

export const useCartMutation = (key: CartMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async ({
      productId,
      productItemId,
      data
    }: {
      productId?: string
      productItemId?: string
      data?: any
    }) => {
      try {
        switch (key) {
          case 'ADD':
            return await CartService.addToCart(data)
          case 'UPDATE':
            if (!productItemId) throw new Error('ProductItemId is required')
            return await CartService.updateCartItem(productItemId, data)
          case 'REMOVE':
            if (!productItemId || !productId) throw new Error('Id is required')
            return await CartService.removeCartItem(productId, productItemId)
          case 'INCREASE':
            if (!productItemId || !productId) throw new Error('Id is required')
            return await CartService.increaseQuantity(productId, productItemId)
          case 'DECREASE':
            if (!productItemId || !productId) throw new Error('Id is required')
            return await CartService.decreaseQuantity(productId, productItemId)
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
