import { ICreateReview } from '@/interface/review'
import { ReviewService } from '@/services/review'
import { useMutation } from '@tanstack/react-query'

type ReviewMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useReviewMutation = (key: ReviewMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Review'],
    mutationFn: async (params: { id?: string; data?: ICreateReview }) => {
      switch (key) {
        case 'CREATE':
          if (!params.data) throw new Error('Data is required for create')
          return await ReviewService.createReview(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          if (!params.data) throw new Error('Data is required for update')
          return await ReviewService.updateReviewById(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('ID is required for delete')
          return await ReviewService.deleteReviewById(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
