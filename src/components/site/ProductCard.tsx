import { Eye, Heart, ShoppingCart, Star, StarHalf } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductImage } from '@/assets'
import { Button } from '@/components/ui/button'
import { useTranslate } from '@/hooks/useTranslate'
import IconButton from '@/components/ui/icon-button'

const ProductCard = () => {
  const { t } = useTranslate('productCard')
  return (
    <>
      <div className='bg-neutral-2 rounded-xl relative group transition duration-500 ease-in-out hover:shadow-lg'>
        <Link to={''} className='cursor-pointer'>
          <img
            src={ProductImage}
            alt=''
            className='transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out'
          />
        </Link>
        <div className='absolute top-6 left-4 uppercase hairline-1 px-[14px] py-1 rounded-md bg-white'>{t('new')}</div>
        <div className='absolute top-14 left-4 uppercase hairline-1 px-[14px] py-1 rounded-md bg-green text-white'>
          -50%
        </div>
        <IconButton
          className='absolute top-5 right-5 p-[6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-red hover:text-white'
          onClick={() => {}}
          icon={<Heart className='h-5 w-5' size={12} />}
        />
        {/* <Button variant={'icon'} size={'icon'} className='absolute top-6 right-4 p-[6px] hover:bg-red hover:text-white'>
          <Heart />
        </Button> */}

        <div className='flex absolute left-0 right-0 bottom-6 items-center gap-x-20 justify-center'>
          <IconButton
            className='opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            onClick={() => {}}
            icon={<Eye className='h-6 w-6' size={15} />}
          />
          <IconButton
            className='opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            onClick={() => {}}
            icon={<ShoppingCart className='h-6 w-6' size={15} />}
          />
        </div>
      </div>
      <div className='*:my-3'>
        <div className='star-rating relative'>
          <div className='stars flex *:h-5 *:w-5'>
            {Array.from({ length: 5 }, () => (
              <Star />
            ))}
          </div>
          <div className='stars rating absolute top-0 flex *:h-5 *:w-5'>
            <Star fill='black' strokeWidth={0} />
            <Star fill='black' strokeWidth={0} />
            <StarHalf fill='black' strokeWidth={0} />
          </div>
        </div>
        <h1 className='body-2-semi'>Loveseat Sofa</h1>
        <div className='flex'>
          <p className='mr-3 caption-1-semi'>$199.00</p>
          <p className='line-through caption-1 text-[#6C7275]'>$400.00</p>
        </div>
      </div>
    </>
  )
}

export default ProductCard
