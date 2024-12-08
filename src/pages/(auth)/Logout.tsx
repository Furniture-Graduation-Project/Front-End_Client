import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { toast } from '@/hooks/use-toast'
import { useEffect } from 'react'

const Logout = () => {
  const { mutate } = useAccountMutation({ action: 'LOGOUT' })

  useEffect(() => {
    mutate(undefined, {
      onSuccess: () => {
        toast({
          title: 'Đăng xuất thành công!',
          description: 'Chuyển đến trang chính...',
          variant: 'success'
        })
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
  }, [mutate])

  return null
}

export default Logout
