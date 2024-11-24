import { IApiResponse } from '@/interface/apiRespose'
import { IReview } from '@/interface/review'
import { ReviewService } from '@/services/Review'

import { useMutation } from '@tanstack/react-query'

export const useCreateReviewMutation = (onSuccess?: () => void, onError?: () => void) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['CREATE_REVIEW'],
    mutationFn: async (review: IReview): Promise<IApiResponse<IReview>> => {
      const response = await ReviewService.create(review)
      return response.data
    },
    onSuccess,
    onError
  })

  return { mutate, ...rest }
}
