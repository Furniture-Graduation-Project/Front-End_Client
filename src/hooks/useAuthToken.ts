import { useEffect } from 'react'

import { useAuthContext } from '@/context/AuthContext'
import { isTokenExpired } from '@/utils/tokenUtils'
import { AuthService } from '@/services/account'
import useAccountMutation from './mutations/useUserMutation'

export const useAuthToken = () => {
  const { token, setToken } = useAuthContext()
  const { mutate } = useAccountMutation({ action: 'LOGOUT' })
  useEffect(() => {
    const refreshAuthToken = async () => {
      if (isTokenExpired(token) && token) {
        const refreshedToken: string | null = await AuthService.refreshToken()
        if (refreshedToken) {
          setToken(refreshedToken)
        } else {
          mutate(undefined)
        }
      }
    }

    refreshAuthToken()
  }, [token])

  return token
}
