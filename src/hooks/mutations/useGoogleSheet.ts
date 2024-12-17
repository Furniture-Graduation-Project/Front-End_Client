import { SheetService } from '@/services/sheet'
import { useMutation } from '@tanstack/react-query'

const useSheetMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async (mail: string) => {
      return await SheetService.create(mail)
    }
  })

  return { mutate, ...rest }
}

export default useSheetMutation
