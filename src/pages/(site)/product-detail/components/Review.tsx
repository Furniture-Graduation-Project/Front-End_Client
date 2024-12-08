import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Flame, Headphones, Heart, Smile, ThumbsUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import AdditionalInfo from './AdditionalInfo'
import { ICreateReview, IReview } from '@/interface/review'
import { useReviewQuery } from '@/hooks/queries/useReviewQuery'
import { useReviewMutation } from '@/hooks/mutations/useReviewMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { useAuthContext } from '../../../../context/AuthContext'
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@radix-ui/react-toast'

export default function Review({ data }: { data: any }) {
  const { user } = useAuthContext()
  const { t } = useTranslate('productDetail')
  const productId = data?.data?._id
  const [notification, setNotification] = useState<string | null>(null)
  const { data: reviewList = [], isLoading, refetch } = useReviewQuery(undefined, productId)
  const { mutate: addReview } = useReviewMutation('CREATE')
  const [newReview, setNewReview] = useState<ICreateReview>({
    userId: user?._id,
    rating: 5,
    reviewText: ''
  })

  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 5

  const calculateAverageRating = (reviews: IReview[]) => {
    if (reviews.length === 0) return 0
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return (totalRating / reviews.length).toFixed(1)
  }

  const averageRating = calculateAverageRating(reviewList)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    addReview({
      data: { ...newReview, productId },
      onSuccess: () => {
        setNewReview({ userId: user?._id, rating: 5, reviewText: '' })
        setNotification('Bạn đã gửi đánh giá thành công!')
        setIsDialogOpen(false)
      }
    } as { data: ICreateReview; onSuccess?: () => void })
  }

  const sortedReviews = Array.isArray(reviewList)
    ? reviewList.sort((a: IReview, b: IReview) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return 0
      })
    : []
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = Array.isArray(reviewList) ? reviewList.slice(indexOfFirstReview, indexOfLastReview) : []

  const totalPages =
    Array.isArray(reviewList) && reviewList.length > 0 ? Math.ceil(reviewList.length / reviewsPerPage) : 1

  return (
    <>
      <ToastProvider>
        {notification && (
          <Toast>
            <ToastTitle>{notification}</ToastTitle>
            <ToastDescription>{t('Your review has been submitted successfully!')}</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
        <Tabs defaultValue='reviews' className='w-full'>
          <TabsList className='border-b rounded-none w-full justify-start h-auto p-0 bg-transparent'>
            <TabsTrigger
              value='info'
              className='rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent'
            >
              {t('Additional Info')}
            </TabsTrigger>
            <TabsTrigger
              value='reviews'
              className='rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent'
            >
              {t('Reviews')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='info' className='mt-6'>
            <AdditionalInfo productId={productId} />
          </TabsContent>

          <TabsContent value='reviews' className='mt-6'>
            <div className='space-y-8'>
              <div>
                <h2 className='text-2xl font-semibold mb-2'> {t('Customer Reviews')}</h2>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= Number(averageRating) ? 'fill-primary' : 'text-muted-foreground'}`}
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                  <span className='text-sm text-muted-foreground'>
                    {' '}
                    {t('Average Rating')} {averageRating}/5
                  </span>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                  <Button variant='outline' size='icon'>
                    <Heart className='w-4 h-4' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <Headphones className='w-4 h-4' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <ThumbsUp className='w-4 h-4' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <Smile className='w-4 h-4' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <Flame className='w-4 h-4' />
                  </Button>
                </div>

                {user ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setIsDialogOpen(true)}>{t('Write Review')}</Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>{t('Write a Review')}</DialogTitle>
                        <DialogDescription>
                          {t('Share your thoughts about the product. Your review will be visible to other customers.')}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitReview} className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='rating' className='text-right'>
                            {t('Rating')}
                          </Label>
                          <Select
                            value={newReview.rating.toString()}
                            onValueChange={(value) => setNewReview({ ...newReview, rating: parseInt(value) })}
                          >
                            <SelectTrigger className='col-span-3'>
                              <SelectValue placeholder='Select a rating' />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <SelectItem key={rating} value={rating.toString()}>
                                  {rating} Star{rating > 1 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='review' className='text-right'>
                            {t('Review')}
                          </Label>
                          <Textarea
                            id='review'
                            value={newReview.reviewText}
                            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                            className='col-span-3'
                          />
                        </div>
                        <Button onClick={() => setIsDialogOpen(false)} type='submit' className='ml-auto'>
                          {t('Submit Review')}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button disabled>{t('Please log in to write a review')}</Button>
                )}
              </div>

              <div className='space-y-8'>
                {isLoading ? (
                  <p>Loading reviews...</p>
                ) : (
                  Array.isArray(currentReviews) &&
                  currentReviews.map((review: IReview) => (
                    <div key={review.id} className='space-y-4'>
                      <div className='flex items-center gap-4'>
                        <Avatar>
                          <AvatarImage src={review.userId?.avatar} alt={review.userId?.name || 'User  Avatar'} />
                          <AvatarFallback>{review.userId?.name ? review.userId.name.charAt(0) : '?'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className='font-semibold'>{review.userId.name}</h3>
                          <div className='flex'>
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <svg key={i} className='w-4 h-4 fill-primary' viewBox='0 0 20 20' fill='currentColor'>
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            ))}
                          </div>
                          <p className='text-sm text-muted-foreground'>
                            {review.createdAt
                              ? `${new Date(review.createdAt).toLocaleDateString('vi-VN', { weekday: 'long' })}, ${new Date(review.createdAt).getDate()} tháng ${new Date(review.createdAt).getMonth() + 1}, ${new Date(review.createdAt).getFullYear()}`
                              : 'Ngày không xác định'}
                          </p>
                        </div>
                      </div>
                      <p className='text-muted-foreground'>{review.reviewText}</p>
                    </div>
                  ))
                )}
              </div>

              <div className='flex justify-between mt-4'>
                <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                  {t('Previous')}
                </Button>
                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  {t('Next')}
                </Button>
              </div>

              <div className='flex justify-center mt-4'>
                <p>
                  {t('Page')} {currentPage} {t('of')} {totalPages}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ToastProvider>
    </>
  )
}
