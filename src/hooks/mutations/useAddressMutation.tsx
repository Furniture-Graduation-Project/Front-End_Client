import { useToast } from '@/components/ui/use-toast'
import { IAddress } from '@/interface/address'
import { AddressServices } from '@/services/address'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

type MutationQueryProps = {
  action: 'CREATE' | 'UPDATE' | 'DELETE'
}
const useEmployeeMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['ADDRESS']
    })
    switch (action) {
      case 'CREATE':
        toast({
          title: 'Thêm địa chỉ thành công!',
          variant: 'success'
        })
        break
      case 'UPDATE':
        toast({
          title: 'Cập nhật địa chỉ thành công!',
          variant: 'success'
        })
        break
      case 'DELETE':
        toast({
          title: 'Xoá địa chỉ thành công!',
          variant: 'success'
        })
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
    console.log('[ADDRESS]', error)
  }

  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: IAddress) => {
      switch (action) {
        case 'CREATE':
          return await AddressServices.create(data)
        case 'UPDATE':
          return await AddressServices.update(data)
        case 'DELETE':
          return await AddressServices.delete(data)
        default:
          return null
      }
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  const onSubmit: SubmitHandler<IAddress> = (data) => {
    mutate(data)
  }

  return { mutate, onSubmit, ...rest }
}

export default useEmployeeMutation
