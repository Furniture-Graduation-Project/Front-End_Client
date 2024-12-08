import { useEffect, useState } from 'react'
import { SocketService } from '@/services/socket'
import { useNavigate } from 'react-router-dom'
import useAccountMutation from './mutations/useUserMutation'
import { useAuthContext } from '@/context/AuthContext'
const useListenLockAccount = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { mutate } = useAccountMutation({ action: 'LOGOUT' })
  const [isLockOpen, setIsLockOpen] = useState(false)
  console.log(user?._id + 'lock')

  const handleLockClose = () => {
    setIsLockOpen(false)
    navigate('/signin', { replace: true })
  }
  const handleLogout = () => {
    setIsLockOpen(true)
    mutate(undefined)
  }
  useEffect(() => {
    SocketService.init()
    const socket = SocketService.get()
    if (socket && user) {
      socket.on((user._id + 'lock') as string, handleLogout)
    }
    return () => {
      if (socket && user) {
        socket.off((user._id + 'lock') as string, handleLogout)
      }
      SocketService.disconnect()
    }
  }, [user])

  return { isLockOpen, handleLockClose }
}

export default useListenLockAccount
