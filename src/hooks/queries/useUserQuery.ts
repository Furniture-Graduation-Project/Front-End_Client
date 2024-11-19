import { AuthService } from '@/services/account'
import { useQuery } from '@tanstack/react-query'

const useUserQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ACCOUNT', id],
    queryFn: async () => {
      const response = await AuthService.getById(id)
      return response
    }
  })
  return { data, ...rest }
}

export default useUserQuery
