import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Heart, Minus, Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { IProductItem, IVariant } from '@/interface/productItem'
import { useProductItemsByProductId } from '@/hooks/queries/useProductItemQuery'
import { useCartMutation } from '@/hooks/mutations/useCartMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { formatCurrency } from '@/utils/formatCurrency'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import ProductVariant from './ProductVariant'
import { useWishlistQuery } from '@/hooks/queries/useWishlistQuery'
import { WishlistColumn } from '@/pages/(user)/AccountWishlist/components/columns'
import { IWishlist } from '@/interface/wishlist'
import useWishlistMutation from '@/hooks/mutations/useWishlistMutation'
import { cn } from '@/utils/classUtils'

const Product = ({ data, isLoading, refetch }: { data: any; isLoading: boolean; refetch: () => void }) => {
  const { t } = useTranslate('productDetail')
  const { toast } = useToast()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [state, setState] = useSessionStorage('stateOrder', null)
  const { data: productItem, isLoading: productItemLoading } = useProductItemsByProductId(data?.data?._id || '')
  const { mutate } = useCartMutation('ADD')
  const [selectedVariant, setSelectedVariant] = useState<IProductItem | undefined>()
  const { data: wishlist } = useWishlistQuery(user?._id || '')
  const { mutate: addToWishlist } = useWishlistMutation({ action: 'ADD' })
  const { mutate: removeFromWishlist } = useWishlistMutation({ action: 'REMOVE' })
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState(0)

  const [isInWishlist, setIsInWishlist] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [sku, setSku] = useState<string | undefined>(undefined)

  const getUniqueVariants = (variantName: string) => {
    if (!productItem || !productItem.data) return []
    const variants = productItem.data.reduce<IVariant[]>((acc, item) => {
      item.variants.forEach((variant) => {
        if (variant.variant === variantName && !acc.some((v) => v.value === variant.value)) {
          acc.push(variant)
        }
      })
      return acc
    }, [])

    return variants
  }

  const handleVariantSelect = (variant: IVariant) => {
    if (!productItem || !productItem.data) return
    const item: IProductItem | undefined = productItem.data.find((item) => {
      return item.variants.some((v) => v.variant === variant.variant && v.value === variant.value)
    })
    setSelectedVariant(item)
    setPrice(item?.price || 0)
    setStock(item?.stock || 0)
    setSku(item?.SKU)
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: t('please_login'),
        description: t('please_login_description'),
        variant: 'default'
      })
      return
    }
    if (data.data.status == 'available') {
      mutate({
        data: {
          productId: data.data._id,
          productOptionId: selectedVariant?._id,
          quantity,
          unitPrice: price
        }
      })
    } else {
      toast({
        title: t('product_not_available'),
        description: t('product_not_available_description'),
        variant: 'default'
      })
      refetch()
      return
    }
  }
  const handleBuyNow = () => {
    if (!user) {
      toast({
        title: t('please_login'),
        description: t('please_login_description'),
        variant: 'default'
      })
      return
    }
    if (data.data.status == 'available' || !selectedVariant || data) {
      const stateOrder = [
        {
          productId: data.data,
          productOptionId: selectedVariant,
          quantity,
          unitPrice: price
        }
      ]
      if (!stateOrder || stateOrder.length == 0) {
        toast({
          title: t('product_not_available') || 'Lỗi khi lấy sản phẩm',
          description: t('product_not_available_description') || 'Sản phẩm đã ngừng bán hoặc hết hàng.',
          variant: 'default'
        })
        refetch()
        return
      }
      setState(JSON.stringify(stateOrder))
      navigate('/checkout')
    } else {
      toast({
        title: t('product_not_available'),
        description: t('product_not_available_description'),
        variant: 'default'
      })
      refetch()
      return
    }
  }

  useEffect(() => {
    if (!wishlist?.data) return

    const wishlistItems: WishlistColumn[] = wishlist.data.map((item: IWishlist) => ({
      _id: item.productId?._id || 'Unknown',
      name: item.productId?.name || 'Unknown',
      image: item.productId?.images?.[0] || '',
      addedAt: item.addedAt
    }))

    const existsInWishlist = wishlistItems.some((item) => item._id === data?.data?._id)
    setIsInWishlist(existsInWishlist)
  }, [wishlist?.data, data?.data?._id])

  useEffect(() => {
    if (productItem) {
      setSelectedVariant(productItem.data[0])
      setPrice(productItem.data[0].price)
      setStock(productItem.data[0].stock)
      setSku(productItem.data[0].SKU)
    }
  }, [productItem])

  const handleWishlistToggle = useCallback(() => {
    if (!user) {
      return toast({ title: 'Vui lòng đăng nhập để thêm vào danh sách yêu thích', variant: 'default' })
    }

    const toastMsg: { title: string; variant: 'default' | 'success' } = isInWishlist
      ? { title: 'Đã xóa khỏi danh sách yêu thích!', variant: 'default' }
      : { title: 'Thêm vào danh sách yêu thích thành công!', variant: 'success' }

    if (isInWishlist) {
      removeFromWishlist({ userId: user._id, data: data?.data })
    } else {
      addToWishlist({ userId: user._id, data: { productId: data?.data._id } })
    }
    toast(toastMsg)
    setIsInWishlist(!isInWishlist)
  }, [isInWishlist, user, addToWishlist, removeFromWishlist, data?.data._id])

  return (
    <div className='space-y-8'>
      {isLoading ? (
        <div className='space-y-4'>
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-3 w-full' />
        </div>
      ) : (
        <div className='space-y-2'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='text-3xl font-bold'>{data?.data.name}</h1>
            <p className='text-neutral-4'>{data?.data.description}</p>
          </div>
        </div>
      )}

      <div className='flex items-baseline space-x-4'>
        {isLoading ? (
          <>
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-8 w-24' />
          </>
        ) : (
          <>
            <span className='text-3xl font-bold'>{formatCurrency(price)}</span>
          </>
        )}
      </div>

      <div className='space-y-4'>
        {isLoading || productItemLoading ? (
          <Skeleton className='h-6 w-1/2' />
        ) : (
          productItem &&
          productItem.data[0].variants.map((variant: IVariant, index: number) => {
            return (
              <ProductVariant
                key={variant._id}
                variant={variant}
                productItem={productItem}
                handleVariantSelect={handleVariantSelect}
                selectedVariant={selectedVariant}
                getUniqueVariants={getUniqueVariants}
                index={index}
              />
            )
          })
        )}
        {isLoading ? (
          <Skeleton className='h-6 w-1/2' />
        ) : (
          <div>
            <p className='text-sm text-muted-foreground'>
              {t('Inventory quantity')}: {stock - (selectedVariant?.outStock || 0)}
            </p>
          </div>
        )}
        <div className='flex items-center space-x-4'>
          {isLoading ? (
            <>
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-8 w-32' />
            </>
          ) : (
            <>
              <div className='flex items-center border rounded-md'>
                <Button variant='ghost' size='icon' onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-12 text-center'>{quantity}</span>
                <Button variant='ghost' size='icon' onClick={() => setQuantity((q) => q + 1)}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
              <Button
                onClick={handleWishlistToggle}
                className={cn(
                  'w-full',
                  isInWishlist ? 'bg-rose-500 hover:bg-rose-500 hover:opacity-80' : 'border-black'
                )}
                variant='outline'
                size='lg'
              >
                {isInWishlist ? (
                  <>
                    <Heart className='mr-2 h-4 w-4 text-white' />
                    <p className='hidden sm:inline text-white'> {t('Remove from Wishlist')} </p>
                  </>
                ) : (
                  <>
                    <Heart className='mr-2 h-4 w-4' />
                    <p className='hidden sm:inline'> {t('Add to Wishlist')}</p>
                  </>
                )}
              </Button>
            </>
          )}
        </div>
        <div className='flex flex-col sm:flex-row gap-4'>
          {isLoading ? (
            <Skeleton className='h-12 w-full' />
          ) : data.data.status !== 'available' ? (
            <Button disabled className='flex-1 bg-black'>
              {t('product_not_available')}
            </Button>
          ) : selectedVariant && selectedVariant.stock - selectedVariant.outStock > 0 ? (
            <>
              <Button onClick={handleAddToCart} className='flex-1 bg-black'>
                {t('Add to Cart')}
              </Button>
              <Button onClick={handleBuyNow} className='flex-1 bg-black'>
                {t('buyNow')}
              </Button>
            </>
          ) : (
            <Button className='flex-1'>{t('product_out_of_stock')}</Button>
          )}
        </div>
      </div>

      <Separator />

      <div className='space-y-2'>
        {isLoading ? (
          <>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-1/2' />
          </>
        ) : (
          <div className='grid grid-cols-[120px_1fr] gap-4'>
            <span className='text-[#6C7275]'>SKU</span>
            <span>{sku}</span>
            <span className='text-[#6C7275]'>{t('Category')}</span>
            <span>{data?.data?.category?.categoryName}</span>
            <span className='text-[#6C7275]'>{t('Material')}</span>
            <span>{data?.data?.material?.materialName}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
