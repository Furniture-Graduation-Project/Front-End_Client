import { Skeleton } from '@/components/ui/skeleton'
import { IProductItem } from '@/interface/productItem'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Component({
  data,
  productItem,
  selectedVariant,
  isLoading
}: {
  data: any
  selectedVariant: IProductItem | undefined
  productItem: any
  isLoading: boolean
}) {
  const [images, setImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    if (Array.isArray(productItem?.data)) {
      const productItemImage = productItem.data.map((item: IProductItem) => item.image)
      setImages([...data?.data.images, ...productItemImage])
    } else {
      console.warn('productItem.data is not an array or is undefined.')
    }
  }, [data, productItem])

  useEffect(() => {
    if (selectedVariant && selectedVariant.image) {
      setCurrentImageIndex(images.indexOf(selectedVariant.image))
    }
  }, [selectedVariant])
  return (
    <div className='relative w-full overflow-hidden max-w-full px-4 box-border'>
      {isLoading ? (
        <div className='space-y-4'>
          <div className='absolute top-4 left-4 z-10 space-y-2'>
            <Skeleton className='h-8 w-20' />
            <Skeleton className='h-8 w-20' />
          </div>
          <div className='relative aspect-square'>
            <Skeleton className='w-full h-full rounded-lg' />
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className='aspect-square w-full rounded-lg' />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className='relative w-full max-w-full mx-auto aspect-square overflow-hidden'>
            <img
              src={images[currentImageIndex]}
              alt={data?.data.name}
              className='object-contain rounded-lg w-full h-full'
            />
            <button
              onClick={() => setCurrentImageIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
              className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg'
            >
              <ChevronLeft className='h-4 w-4' />
            </button>
            <button
              onClick={() => setCurrentImageIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
              className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg'
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>

          <div className='p-2 flex items-center overflow-x-scroll gap-2 sm:gap-4 my-4 no-scrollbar max-w-full border-b border-neutral-3'>
            {images.map((src: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square w-[70px] min-w-[90px] max-w-[125px] xl:w-full rounded-lg overflow-hidden ${
                  currentImageIndex === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img src={src} alt={`Product ${index + 1}`} className='object-cover w-full h-full' />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
