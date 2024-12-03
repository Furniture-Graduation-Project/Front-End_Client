import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { IUser } from '@/interface/user'
import { jwtDecode } from 'jwt-decode'
import useUserQuery from '@/hooks/queries/useUserQuery'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: IUser | null
  login: (token: string) => void
  logout: () => void
  updateUser: (updatedUserData: Partial<IUser>) => void
  isLoading: boolean
  token: string
  setToken: (token: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getUserIdFromToken = (token: string | null): string | null => {
  if (!token) return null
  try {
    const decoded = jwtDecode<{ userId: string }>(token)
    return decoded.userId || null
  } catch (error) {
    console.error('Token không hợp lệ:', error)
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage('accessToken', null)
  const [id, setId] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { data, isError } = useUserQuery(id ?? '')

  const navigate = useNavigate()

  const login = (newToken: string) => {
    setToken(newToken)
    setId(getUserIdFromToken(newToken))
  }

  const logout = () => {
    removeToken()
    setUser(null)
    setId(null)
    navigate('/')
  }

  const updateUser = (updatedUserData: Partial<IUser>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUserData }) as IUser)
  }

  useEffect(() => {
    if (token) {
      const userId = getUserIdFromToken(token)
      setId(userId)
    }
  }, [token])

  useEffect(() => {
    if (data) {
      setUser(data.data)
      setIsLoading(false)
    }
    if (isError) {
      setIsLoading(false)
    }
  }, [data, isError])

  return (
    <AuthContext.Provider value={{ user, isLoading, token, setToken, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContext phải được sử dụng trong AuthProvider')
  }
  return context
}
