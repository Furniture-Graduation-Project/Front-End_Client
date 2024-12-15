import { useAuthContext } from '@/context/AuthContext'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { toast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { mutate } = useAccountMutation({ action: 'LOGOUT' })
  const { logout } = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    mutate(undefined, {
      onSuccess: () => {
        toast({
          title: 'Đăng xuất thành công!',
          description: 'Chuyển đến trang chính...',
          variant: 'success'
        })
        logout()
        navigate('/')
      },
      onError: (error) => {
        toast({
          title: 'Có lỗi xảy ra!',
          description: 'Không thể đăng xuất',
          variant: 'destructive'
        })
        console.log('[LOGOUT]', error)
      }
    })
  }, [mutate, navigate, logout])

  return null
}

export default Logout
