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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Flame, Headphones, Heart, Smile, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import AdditionalInfo from './AdditionalInfo'
import { useTranslate } from '@/hooks/useTranslate'

interface Review {
  id: number
  author: string
  avatar: string
  rating: number
  content: string
}

const reviews: Review[] = []

export default function Review() {
  const { t } = useTranslate('productDetail')
  const [reviewList, setReviewList] = useState(reviews)
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    content: ''
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setReviewList([
      {
        id: reviews.length + 1,
        ...newReview,
        avatar: '/placeholder.svg'
      },
      ...reviews
    ])
    setNewReview({ author: '', rating: 5, content: '' })
  }

  return (
    <>
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
          <AdditionalInfo />
        </TabsContent>

        <TabsContent value='reviews' className='mt-6'>
          <div className='space-y-8'>
            <div>
              <h2 className='text-2xl font-semibold mb-2'> {t('Customer Reviews')}</h2>
              <div className='flex items-center gap-2 mb-4'>
                <div className='flex'>
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className='w-5 h-5 fill-primary' viewBox='0 0 20 20' fill='currentColor'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                  <svg className='w-5 h-5 text-muted-foreground' viewBox='0 0 20 20' fill='currentColor'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                </div>
                <span className='text-sm text-muted-foreground'>{reviewList.length} Reviews</span>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t('Write Review')}</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>{t('Write a Review')}</DialogTitle>
                    <DialogDescription>
                      Share your thoughts about the product. Your review will be visible to other customers.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitReview} className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='name' className='text-right'>
                        Name
                      </Label>
                      <Input
                        id='name'
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='rating' className='text-right'>
                        Rating
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
                        Review
                      </Label>
                      <Textarea
                        id='review'
                        value={newReview.content}
                        onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                        className='col-span-3'
                      />
                    </div>
                    <Button type='submit' className='ml-auto'>
                      Submit Review
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className='flex justify-end mb-6'>
              <Select defaultValue='newest'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='newest'>Newest</SelectItem>
                  <SelectItem value='oldest'>Oldest</SelectItem>
                  <SelectItem value='highest'>Highest Rated</SelectItem>
                  <SelectItem value='lowest'>Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-8'>
              {reviewList.map((review) => (
                <div key={review.id} className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <Avatar>
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='font-semibold'>{review.author}</h3>
                      <div className='flex'>
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <svg key={i} className='w-4 h-4 fill-primary' viewBox='0 0 20 20' fill='currentColor'>
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className='text-muted-foreground'>{review.content}</p>
                </div>
              ))}
            </div>

            <div className='flex justify-center'>
              <Button variant='outline' className='border-black rounded-full px-10'>
                {t('Load more')}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
