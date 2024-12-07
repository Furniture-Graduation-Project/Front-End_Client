import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import AdditionalInfo from './AdditionalInfo'
import { IReview } from '@/interface/review'
import { useReviewQuery } from '@/hooks/queries/useReviewQuery'
import { useReviewMutation } from '@/hooks/mutations/useReviewMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { useAuthContext } from '@/context/AuthContext'
import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaginationState } from '@tanstack/react-table'
import { AvatarNull } from '@/assets'

const reviewSchema = z.object({
  reviewText: z.string().min(5, 'Nhận xết phải nhất 5 ký tự'),
  rating: z.number().min(1).max(5, 'Nhận xết phải theo mức độ 1-5')
})

type ReviewFormData = z.infer<typeof reviewSchema>

const Review = ({ data }: any) => {
  const { t } = useTranslate('productDetail')
  const { user } = useAuthContext()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  })
  const { data: reviewList, isLoading, isError, refetch } = useReviewQuery(data?.data?._id || '', pagination)
  const { mutate } = useReviewMutation()
  const [averageRating, setAverageRating] = useState<string>('')

  const { control, handleSubmit, reset } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewText: '',
      rating: 5
    }
  })
  const [selectedRating, setSelectedRating] = useState<number>(5)
  const [open, setOpen] = useState(false)

  const handleReviewSubmit = (form: ReviewFormData) => {
    if (user && data) {
      const newReview = {
        userId: user._id,
        productId: data?.data?._id as string,
        rating: selectedRating,
        reviewText: form.reviewText
      }
      mutate(newReview)
      reset()
      setOpen(false)
    }
  }

  useEffect(() => {
    if (reviewList?.data) {
      const totalRating = reviewList?.data.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = (totalRating / reviewList?.data.length).toFixed(1)
      setAverageRating(averageRating)
    }
  }, [reviewList?.data])

  useEffect(() => {
    refetch()
  }, [pagination])

  return (
    <Tabs defaultValue='reviews' className='w-full'>
      <TabsList className='border-b rounded-none w-full justify-start h-auto p-0 bg-transparent'>
        <TabsTrigger
          value='info'
          className='rounded-none border-b-2 border-transparent data-[state=active]:border-primary'
        >
          {t('Additional Info')}
        </TabsTrigger>
        <TabsTrigger
          value='reviews'
          className='rounded-none border-b-2 border-transparent data-[state=active]:border-primary'
        >
          {t('Reviews')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value='info' className='mt-6'>
        <AdditionalInfo data={data} />
      </TabsContent>
      <TabsContent value='reviews' className='mt-6'>
        <div className='space-y-8'>
          <div>
            <h2 className='text-2xl font-semibold mb-2'>{t('Customer Reviews')}</h2>
            <div className='flex items-center gap-2 mb-4'>
              <div className='flex gap-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star fill={star <= Math.round(+averageRating) ? '#000000' : 'none'} key={star} size={16} />
                ))}
              </div>
              <span className='text-sm text-muted-foreground'>
                {t('Average Rating')} {averageRating || '5'}/5
              </span>
            </div>
          </div>
          <div className='relative'>
            <Controller
              control={control}
              name='reviewText'
              render={({ field }) => (
                <Input
                  {...field}
                  className='p-9 border border-neutral-7'
                  autoComplete='off'
                  placeholder={t('Write your review here')}
                />
              )}
            />
            <Button
              className='absolute right-5 top-1/2 transform -translate-y-1/2 rounded-full button-s'
              onClick={() => setOpen(true)}
            >
              {t('Write Review')}
            </Button>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                <DialogDescription>
                  Vui lòng nhập đánh giá cho sản phẩm để chúng tôi biết được mức độ hài lòng của bạn
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='flex justify-between'>
                <div className='flex items-center gap-2 mr-10'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= selectedRating ? 'text-yellow fill-current' : 'text-neutral-950 fill-none'
                      }`}
                      onClick={() => setSelectedRating(star)}
                    />
                  ))}
                </div>
                <Button onClick={handleSubmit(handleReviewSubmit)}>{t('Submit Review')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className='space-y-8'>
            {isLoading ? (
              <p>{t('Loading reviews...')}</p>
            ) : isError ? (
              <p>{t('Failed to load reviews')}</p>
            ) : (
              reviewList?.data &&
              reviewList?.data.length > 0 &&
              reviewList?.data.map((review: IReview) => (
                <div key={review.id} className='space-y-4'>
                  <div className='grid grid-cols-[72px_1fr] gap-4'>
                    <Avatar className='h-16 w-16'>
                      <AvatarImage alt='avatar' src={review.userId.avatar || AvatarNull} />
                      <AvatarFallback>{review.userId.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='text-neutral-7 body-1-semi mb-4'>{review.userId.name}</h3>
                      <div className='flex gap-1'>
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star fill='#000000' key={i} size={16} />
                        ))}
                      </div>
                    </div>
                    <div className='hidden md:block'></div>
                    <p className='body-2 text-neutral-5 col-span-2 md:col-span-1'>{review.reviewText}</p>
                  </div>
                </div>
              ))
            )}
            <div
              className={` justify-center ${reviewList?.totalData && reviewList?.totalData < pagination.pageSize ? 'hidden' : 'flex'}`}
            >
              <Button
                className='rounded-full px-10'
                variant={'outline'}
                onClick={() =>
                  setPagination((p) => {
                    return {
                      ...p,
                      pageSize: p.pageSize + 5
                    }
                  })
                }
              >
                Tải thêm
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default Review
