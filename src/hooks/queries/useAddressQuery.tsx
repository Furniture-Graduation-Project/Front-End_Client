import { AddressServices } from '@/services/address'
import { useQuery } from '@tanstack/react-query'

const useAddressQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ADDRESS', id],
    queryFn: async () => {
      return id && (await AddressServices.getById(id))
    }
  })
  return { data, ...rest }
}

export default useAddressQuery
