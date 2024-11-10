import { IApiResponse } from '@/interface/apiRespose'
import { IOrder } from '@/interface/order'
import { OrderService } from '@/services/order'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

type MutationQueryProps = {
  action: 'CREATE' | 'UPDATE' | 'DELETE'
}

const useOrderMutation = ({ action }: MutationQueryProps) => {
  const navigate = useNavigate()

  const mutationFn = async (
    data: IOrder
  ): Promise<AxiosResponse<IApiResponse<IOrder>> | AxiosResponse<IApiResponse<void>>> => {
    try {
      switch (action) {
        case 'CREATE':
          return await OrderService.create(data)
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
    onSuccess: (response) => {
      if (action === 'CREATE') {
        const orderData = response.data.data as IOrder
        if (orderData && orderData._id) {
          navigate('/order/' + orderData._id)
        }
      }
    },
    onError: (error) => {
      console.error('Mutation failed:', error)
    }
  })
  return { mutate, ...rest }
}

export default useOrderMutation
