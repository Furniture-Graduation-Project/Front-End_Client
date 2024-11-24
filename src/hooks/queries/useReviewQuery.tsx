import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'

import { IReview } from '@/interface/review'
import { ReviewService } from '@/services/Review'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useMultipleReviewQuery = (pagination?: any) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, ...rest } = useQuery({
    queryKey: ['REVIEW', pageIndex, pageSize],
    queryFn: async () => {
      const response = await ReviewService.getAll({ pageIndex, pageSize })
      return response.data
    }
  })
  return { data, ...rest }
}

// Query thêm mới review
export const useCreateReviewMutation = (onSuccess?: () => void, onError?: () => void) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['CREATE_REVIEW'],
    mutationFn: async (review: IReview) => {
      const response = await ReviewService.create(review)
      return response.data
    },
    onSuccess,
    onError
  })
  return { mutate, ...rest }
}
