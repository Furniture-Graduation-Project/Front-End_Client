import { ICreateReview } from '@/interface/review'
import { ReviewService } from '@/services/review'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useReviewMutation = () => {
  const query = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['Review'],
    mutationFn: async (data: ICreateReview) => {
      const response = await ReviewService.create(data)
      return response.data
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['Review'] })
    }
  })

  return { mutate }
}
