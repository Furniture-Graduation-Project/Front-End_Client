import IconButton from '@/components/ui/icon-button'
import { useAuthContext } from '@/context/AuthContext'
import useWishlistMutation from '@/hooks/mutations/useWishlistMutation'
import { useWishlistQuery } from '@/hooks/queries/useWishlistQuery'
import { toast } from '@/hooks/use-toast'
import { useTranslate } from '@/hooks/useTranslate'
import { IWishlist } from '@/interface/wishlist'
import { WishlistColumn } from '@/pages/(user)/AccountWishlist/components/columns'
import { cn } from '@/utils/classUtils'
import { formatCurrency } from '@/utils/formatCurrency'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PopupProduct from './PopupProduct'

interface ProductCardProps {
  width?: string
  height?: string
  product?: any
}

const ProductCard = ({ width, height, product }: ProductCardProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { t } = useTranslate('productCard')
  const { user } = useAuthContext()
  const { mutate: addToWishlist } = useWishlistMutation({ action: 'ADD' })
  const { mutate: removeFromWishlist } = useWishlistMutation({ action: 'REMOVE' })
  const { data: wishlist } = useWishlistQuery(user?._id || '')

  const minPrice = product?.prices ? Math.min(...product.prices) : null
  const maxPrice = product?.prices ? Math.max(...product.prices) : null

  const isProductNew =
    product?.createdAt && new Date(product.createdAt).getTime() >= Date.now() - 7 * 24 * 60 * 60 * 1000

  useEffect(() => {
    if (!wishlist?.data) return

    const wishlistItems: WishlistColumn[] = wishlist.data.map((item: IWishlist) => ({
      _id: item.productId?._id || 'Unknown',
      name: item.productId?.name || 'Unknown',
      image: item.productId?.images?.[0] || '',
      addedAt: item.addedAt
    }))

    const existsInWishlist = wishlistItems.some((item) => item._id === product._id)
    setIsInWishlist(existsInWishlist)
  }, [wishlist?.data, product._id])

  const handleWishlistToggle = useCallback(() => {
    if (!user) {
      return toast({ title: 'Vui lòng đăng nhập để thêm vào danh sách yêu thích', variant: 'default' })
    }

    const toastMsg: { title: string; variant: 'default' | 'success' } = isInWishlist
      ? { title: 'Đã xóa khỏi danh sách yêu thích!', variant: 'default' }
      : { title: 'Thêm vào danh sách yêu thích thành công!', variant: 'success' }

    if (isInWishlist) {
      removeFromWishlist({ userId: user._id, data: product })
    } else {
      addToWishlist({ userId: user._id, data: { productId: product._id } })
    }
    toast(toastMsg)
    setIsInWishlist(!isInWishlist)
  }, [isInWishlist, user, addToWishlist, removeFromWishlist, product._id])

  return (
    <div className='relative pt-5'>
      {/* Card UI */}
      <div className={cn('bg-neutral-2 rounded-lg relative group transition duration-500 ease-in-out hover:shadow-lg')}>
        {/* Product Image */}
        <Link to={`/products/${product._id}`} className='cursor-pointer'>
          <div className='w-full h-auto box-border'>
            <img
              src={product?.images[0]}
              alt={product?.name}
              className={cn(
                'object-cover w-full h-full mx-auto transition-transform duration-500 ease-in-out transform scale-100 group-hover:scale-105 rounded-lg',
                width && `w-[${width}]`,
                height && `h-[${height}]`
              )}
            />
          </div>
        </Link>

        {/* Product Info */}
        {isProductNew && (
          <div className='absolute top-6 left-4 uppercase hairline-1 px-[14px] py-1 rounded-md bg-white'>
            {t('new')}
          </div>
        )}

        <div className='absolute top-14 left-4 uppercase hairline-1 px-[14px] py-1 rounded-md bg-green text-white'>
          -50%
        </div>

        {/* Wishlist Icon */}
        <IconButton
          className={cn(
            'absolute top-5 right-5 p-[6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
            isInWishlist ? 'text-white bg-red' : 'text-gray-500 hover:bg-red hover:text-white'
          )}
          onClick={handleWishlistToggle}
          icon={<Heart className='h-5 w-5' size={12} />}
        />

        {/* Actions */}
        <div className='absolute left-0 right-0 bottom-6 items-center flex justify-center gap-x-6'>
          <PopupProduct productId={product._id} />
        </div>
      </div>

      {/* Product Info Section */}
      <div className='my-3'>
        <h1 className='body-2-semi'>{product.name}</h1>
        {minPrice !== null && maxPrice !== null ? (
          <div className='flex'>
            <p className='caption-1-semi flex gap-1'>
              {formatCurrency(minPrice)}

              {minPrice !== maxPrice && (
                <>
                  <span>~</span> {formatCurrency(maxPrice)}
                </>
              )}
            </p>
          </div>
        ) : (
          <p>##########</p>
        )}
      </div>
    </div>
  )
}

export default ProductCard
