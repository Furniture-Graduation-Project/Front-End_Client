import { AuthService } from '@/services/account'
import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/interface/user'
import { IApiResponse } from '@/interface/apiRespose'

const useUserQuery = (id: string) => {
  const { data, ...rest } = useQuery<IApiResponse<IUser>, Error>({
    queryKey: ['ACCOUNT', id],
    queryFn: async () => {

      const response = await AuthService.getById(id)
      if (!response || !response.data) throw new Error('No data received from server')
      return response.data
    },
    enabled: !!id
  })

  return { data, ...rest }
}

export default useUserQuery
