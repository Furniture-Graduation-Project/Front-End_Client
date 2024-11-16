import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

export default function Component() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const images = [
    'https://placehold.co/600x600',
    'https://placehold.co/600x600',
    'https://placehold.co/600x600',
    'https://placehold.co/600x600'
  ]

  return (
    <div className='relative'>
      <div className='absolute top-4 left-4 z-10 space-y-2'>
        <div className='flex flex-col gap-y-2'>
          <Badge className='bg-white text-black hover:cursor-pointer text-center hover:bg-white'>NEW</Badge>
          <Badge className='bg-[#38CB89] text-white hover:cursor-pointer text-center hover:bg-[#38CB89]'>-50%</Badge>
        </div>
      </div>
      <div className='relative aspect-square'>
        <img src={images[currentImageIndex]} alt='Tray Table' className='object-cover rounded-lg w-full h-full' />
        <button
          onClick={() => setCurrentImageIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
          className='absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg'
        >
          <ChevronLeft className='h-4 w-4' />
        </button>
        <button
          onClick={() => setCurrentImageIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
          className='absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg'
        >
          <ChevronRight className='h-4 w-4' />
        </button>
      </div>
      <div className='flex space-x-4 mt-4'>
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative aspect-square w-48 rounded-lg overflow-hidden ${
              currentImageIndex === index ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img src={src} alt={`Product ${index + 1}`} className='object-cover w-full h-full' />
          </button>
        ))}
      </div>
    </div>
  )
}
