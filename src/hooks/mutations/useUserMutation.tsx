import { useToast } from '@/components/ui/use-toast'
import { useAuthContext } from '@/context/AuthContext'
import { IUser } from '@/interface/user'
import { AuthService } from '@/services/account'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type MutationQueryProps = {
  action: 'SIGNIN' | 'SIGNUP' | 'DELETE'
}

const useAccountMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleSuccess = (data?: any) => {
    queryClient.invalidateQueries({
      queryKey: ['ACCOUNT']
    })
    switch (action) {
      case 'SIGNUP':
        toast({
          title: 'Đăng ký thành công!',
          description: 'Chuyển đến trang đăng nhập...',
          variant: 'success'
        })
        break
      case 'SIGNIN':
        toast({
          title: 'Đăng nhập thành công!',
          description: 'Chuyển đến trang chính...',
          variant: 'success'
        })
        login(data.accessToken)
        navigate('/')
        break
      case 'DELETE':
        toast({
          title: 'Xóa thành công!',
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
    console.log('[ACCOUNT]', error)
  }

  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: IUser) => {
      switch (action) {
        case 'SIGNUP':
          return await AuthService.signUp(data)
        case 'SIGNIN':
          return await AuthService.signIn(data)
        case 'DELETE':
          return await AuthService.delete(data?._id || '')
        default:
          return null
      }
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  const onSubmit: SubmitHandler<IUser> = (data) => {
    mutate(data)
  }

  return { mutate, onSubmit, ...rest }
}

export default useAccountMutation
