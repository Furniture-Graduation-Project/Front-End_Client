import { useMutation } from '@tanstack/react-query';
import { CartService } from '@/services/cart';

type CartMutation = 'ADD' | 'UPDATE' | 'REMOVE' | 'INCREASE' | 'DECREASE';

export const useCartMutation = (key: CartMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async (params: { productId: string; productItemId: string; data?: any }) => {
      try {
        switch (key) {
          case 'ADD':
            return await CartService.addToCart(params.data);
          case 'UPDATE':
            return await CartService.updateCartItem(params.productItemId, params.data);
          case 'REMOVE':
            return await CartService.removeCartItem(params.productId, params.productItemId);
          case 'INCREASE':
            return await CartService.increaseQuantity(params.productId, params.productItemId);
          case 'DECREASE':
            return await CartService.decreaseQuantity(params.productId, params.productItemId);
          default:
            throw new Error('Khóa không hợp lệ');
        }
      } catch (error) {
        console.error("Lỗi mutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Thao tác thành công');
    },
    onError: (error) => {
      console.error('Lỗi trong quá trình thực hiện thao tác:', error);
    },
    onSettled: () => {
      console.log('Đã hoàn thành thao tác');
    },
  });

  return { mutate };
};
