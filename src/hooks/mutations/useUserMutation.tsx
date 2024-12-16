/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from '@/context/AuthContext'
import { IUser } from '@/interface/user'
import { AuthService } from '@/services/account'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from '../use-toast'

type MutationQueryProps = {
  action: 'SIGNIN' | 'SIGNUP' | 'DELETE' | 'UPDATE' | 'LOGOUT' | 'SEND_OTP' | 'VERIFY_OTP' | 'CHANGE_PASS'
}

const useAccountMutation = ({ action }: MutationQueryProps) => {
  const { login, logout } = useAuthContext()
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
        navigate('/signin')
        break
      case 'SIGNIN':
        toast({
          title: 'Đăng nhập thành công!',
          description: 'Chuyển đến trang chính...',
          variant: 'success'
        })
        login(data.data.accessToken)
        navigate('/')
        break
      case 'LOGOUT':
        toast({
          title: 'Đăng xuất thành công!',
          description: 'Chuyển đến trang chính...',
          variant: 'success'
        })
        logout()
        break

      case 'UPDATE':
        toast({
          title: 'Cập nhật thành công!',
          variant: 'success'
        })
        break

      case 'DELETE':
        toast({
          title: 'Xóa thành công!',
          variant: 'success'
        })
        break

      case 'SEND_OTP':
        toast({
          title: 'Gửi mã OTP thành công, bạn vui lòng check mail!',
          variant: 'success'
        })
        break
      case 'VERIFY_OTP':
        toast({
          title: 'Xác thực mã OTP thành công!',
          variant: 'success'
        })
        break

      case 'CHANGE_PASS':
        logout()
        localStorage.removeItem('token')
        localStorage.removeItem('otp')
        toast({
          title: 'Đổi mật khẩu thành công!',
          variant: 'success'
        })
        navigate('/signin')
        break

      default:
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
    mutationFn: async (data?: IUser) => {
      switch (action) {
        case 'SIGNUP':
          if (!data) throw new Error('Thiếu ID cho hành động')
          return await AuthService.signUp(data)
        case 'SIGNIN':
          if (!data) throw new Error('Thiếu ID cho hành động')
          return await AuthService.signIn(data)
        case 'DELETE':
          return await AuthService.delete(data?._id || '')
        case 'UPDATE':
          if (!data) throw new Error('Thiếu ID cho hành động')
          return await AuthService.update(data?._id || '', data)
        case 'SEND_OTP':
          return await AuthService.sendOtp(data?.email || '')
        case 'VERIFY_OTP':
          return await AuthService.verifyOtp(data?.otp || '')
        case 'CHANGE_PASS':
          if (!data || !data.newPassword || !data.confirmPassword) throw new Error('Thiếu thông tin mật khẩu')
          return await AuthService.changePassword({
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
          })
        case 'LOGOUT':
          return await AuthService.logout()

        default:
          return null
      }
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  const onSubmit: SubmitHandler<any> = (data) => {
    mutate(data)
  }

  return { mutate, onSubmit, ...rest }
}

export default useAccountMutation
