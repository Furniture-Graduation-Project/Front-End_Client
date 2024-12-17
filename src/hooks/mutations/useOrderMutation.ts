import { IApiResponse } from '@/interface/apiRespose'
import { IOrder, IOrderItem, IQRCodeData } from '@/interface/order'
import { OrderService } from '@/services/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useToast } from '../use-toast'

type MutationQueryProps = {
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'CHECK' | 'CREATE_QR' | 'PAYMENT'
}

const useOrderMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const query = useQueryClient()
  const mutationFn = async (
    data: any
  ): Promise<
    | AxiosResponse<IApiResponse<IOrder>>
    | AxiosResponse<IApiResponse<void>>
    | AxiosResponse<IApiResponse<IOrderItem[]> | AxiosResponse<IApiResponse<IQRCodeData>>>
  > => {
    try {
      switch (action) {
        case 'CREATE':
          return await OrderService.create(data)
        case 'CREATE_QR':
          return await OrderService.createQR(data)
        case 'CHECK':
          return await OrderService.checkProducts(data)
        case 'PAYMENT':
          if (data._id) {
            return await OrderService.payment(data._id, data)
          }
          throw new Error('Order ID is required for update')

        case 'UPDATE':
          if (data._id) {
            return await OrderService.update(data._id, data)
          }
          throw new Error('Order ID is required for update')
        case 'DELETE':
          if (data._id) {
            return await OrderService.delete(data._id)
          }
          throw new Error('Order ID is required for delete')
        default:
          throw new Error('Invalid action')
      }
    } catch (error) {
      console.error(`Error during ${action} action:`, error)
      throw error
    }
  }

  const { mutate, ...rest } = useMutation({
    mutationKey: ['ORDER'],
    mutationFn,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['ORDER'] })
    },
    onError: (error: any) => {
      const serverMessage =
        error?.response?.data?.details || error?.response?.data?.message || 'Unknown error from server'
      toast({
        title: 'Giao dịch thất bại!',
        description: serverMessage,
        variant: 'destructive'
      })

      query.invalidateQueries({ queryKey: ['ORDER'] })
    }
  })
  return { mutate, ...rest }
}

export default useOrderMutation
