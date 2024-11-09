import { IOrder } from '@/interface/order'
import { OrderService } from '@/services/order'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

type MutationQueryProps = {
  action: 'CREATE' | 'UPDATE' | 'DELETE'
}

const useOrderMutation = ({ action }: MutationQueryProps) => {
  const mutationFn = async (data: IOrder) => {
    switch (action) {
      case 'CREATE':
        return OrderService.create(data)
      case 'UPDATE':
        if (data._id) {
          return OrderService.update(data._id, data)
        }
        break
      case 'DELETE':
        if (data._id) {
          return OrderService.delete(data._id)
        }
        break
      default:
        return Promise.reject(new Error('Invalid action'))
    }
  }
  const { mutate, ...rest } = useMutation({
    mutationFn
  })
  const onSubmit: SubmitHandler<IOrder> = (data) => {
    mutate(data)
  }
  return { mutate, onSubmit, ...rest }
}

export default useOrderMutation
