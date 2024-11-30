import { IContact } from '@/interface/contact'
import { ContactService } from '@/services/contact'
import { useMutation } from '@tanstack/react-query'

const useContactMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: IContact) => {
      return await ContactService.create(data)
    }
  })

  return { mutate, ...rest }
}

export default useContactMutation
