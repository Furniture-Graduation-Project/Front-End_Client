import { useEffect } from 'react'
import { SocketService } from '@/services/socket'
import { toast } from 'sonner'
import { useAuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
const useListenOrder = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const handleOrderEvent = (data: any) => {
    toast('Đơn hàng đang được giao', {
      icon: '📦',
      description: 'Đơn hàng : ' + data.code + ' đang được giao vui lòng chú ý điện thoại !',
      action: {
        label: 'Chi tiết',
        onClick: () => {
          navigate('/account/order/' + data._id)
        }
      }
    })
    queryClient.invalidateQueries({ queryKey: ['ORDER'] })
  }
  useEffect(() => {
    SocketService.init()
    const socket = SocketService.get()
    if (socket) {
      socket.on(user?._id as string, handleOrderEvent)
    }
    return () => {
      if (socket) {
        socket.off(user?._id as string, handleOrderEvent)
      }
      SocketService.disconnect()
    }
  }, [user])

  return null
}

export default useListenOrder
