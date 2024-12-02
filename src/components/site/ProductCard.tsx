import IconButton from '@/components/ui/icon-button'
import { useTranslate } from '@/hooks/useTranslate'
import { cn } from '@/utils/classUtils'
import { formatCurrency } from '@/utils/formatCurrency'
import { Eye, Heart, ShoppingCart, Star, StarHalf } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  width?: string
  height?: string
  product?: any
}

const ProductCard = ({ width, height, product }: ProductCardProps) => {
  const { t } = useTranslate('productCard')

  const isNew = product?.createdAt && new Date(product.createdAt).getTime() >= Date.now() - 7 * 24 * 60 * 60 * 1000

  const minPrice = product?.prices ? Math.min(...product.prices) : null
  const maxPrice = product?.prices ? Math.max(...product.prices) : null

  return (
    <div>
      <div className='bg-neutral-2 rounded-lg relative group transition duration-500 ease-in-out hover:shadow-lg '>
        <Link to={`/products/${product._id}`} className='cursor-pointer'>
          <div className='w-full h-[300px] box-border'>
            <img
              src={product.images[0]}
              alt='product-image'
              className={cn(
                'object-cover w-full h-full mx-auto transition-transform duration-500 ease-in-out transform scale-100 group-hover:scale-105 rounded-lg',
                width && `w-[${width}]`,
                height && `h-[${height}]`
              )}
            />
          </div>
        </Link>

        {isNew && (
          <div className='absolute top-6 left-4 uppercase hairline-1 px-[14px] py-1 rounded-md bg-white'>
            {t('new')}
          </div>
        )}

        <div className='absolute top-14 left-4 uppercase hairline-1 px-[14px] py-1 rounded-md bg-green text-white'>
          -50%
        </div>

        <IconButton
          className='absolute top-5 right-5 p-[6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-red hover:text-white'
          onClick={() => {}}
          icon={<Heart className='h-5 w-5' size={12} />}
        />
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

      <div className='my-3'>
        {/* <div className='star-rating relative'>
          <div className='stars flex *:h-5 *:w-5'>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} />
            ))}
          </div>
          <div className='stars rating absolute top-0 flex *:h-5 *:w-5'>
            <Star fill='black' strokeWidth={0} />
            <Star fill='black' strokeWidth={0} />
            <StarHalf fill='black' strokeWidth={0} />
          </div>
        </div> */}
        <h1 className='body-2-semi'>{product.name}</h1>
        {minPrice !== null && maxPrice !== null ? (
          <div className='flex'>
            <p className='mr-3 caption-1-semi'>{formatCurrency(minPrice)}</p>
            {minPrice !== maxPrice && (
              <p className='line-through caption-1 text-[#6C7275]'>{formatCurrency(maxPrice)}</p>
            )}
          </div>
        ) : (
          <p>Chưa có biến thể, vui lòng tạo mới</p>
        )}
      </div>
    </div>
  )
}

export default ProductCard
