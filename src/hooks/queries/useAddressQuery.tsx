import { AddressServices } from '@/services/address'
import { useQuery } from '@tanstack/react-query'

export const useAddressQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ADDRESS', id],
    queryFn: async () => {
      return id && (await AddressServices.getById(id))
    }
  })
  return { data, ...rest }
}
export const useAllAddressQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['ADDRESS'],
    queryFn: async () => {
      const response = await AddressServices.getAll()
      return response.data
    }
  })
  return { data, ...rest }
}
