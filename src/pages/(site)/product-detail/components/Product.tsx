import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Heart, Minus, Plus, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { IProductItem, IVariant } from '@/interface/productItem'
import { useProductItemsByProductId } from '@/hooks/queries/useProductItemQuery'
import { useCartMutation } from '@/hooks/mutations/useCartMutation'

const Product = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const { data: productItem, isLoading: productItemLoading } = useProductItemsByProductId(data?.data?._id)
  const { mutate } = useCartMutation('ADD')
  const [selectedVariant, setSelectedVariant] = useState<IProductItem | undefined>()
  const [price, setPrice] = useState<number>(0)

  const [quantity, setQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5
  })
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
  }
  const handleAddToCart = () => {
    mutate({
      data: {
        productId: data.data._id,
        productOptionId: selectedVariant?._id,
        quantity: quantity,
        unitPrice: price
      }
    })
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    if (productItem) {
      setSelectedVariant(productItem.data[0])
      setPrice(productItem.data[0].price)
    }
  }, [productItem])
  return (
    <div className='space-y-6'>
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
            <div className='flex items-center space-x-2'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 3 ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`} />
              ))}
              <span className='text-sm text-muted-foreground'>(11 Reviews)</span>
            </div>
            <h1 className='text-3xl font-bold'>{data?.data.name}</h1>
            <p className='text-muted-foreground'>{data?.data.description}</p>
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
            <span className='text-3xl font-bold'>${price.toFixed(3)} Vnd</span>
            <span className='text-xl text-muted-foreground line-through'>400.000 Vnd</span>
          </>
        )}
      </div>

      <div className='space-y-2'>
        {isLoading ? (
          <div className='flex space-x-4'>
            {Object.entries(timeLeft).map(([key]) => (
              <div key={key} className='text-center'>
                <Skeleton className='h-10 w-20' />
                <Skeleton className='h-3 w-16' />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex space-x-4'>
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className='text-center'>
                <div className='bg-[#F3F5F7] px-3 py-2 rounded-lg'>
                  <span className='text-2xl font-bold'>{value.toString().padStart(2, '0')}</span>
                </div>
                <span className='text-sm text-muted-foreground capitalize'>{key}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='space-y-4'>
        {isLoading ? (
          <Skeleton className='h-6 w-1/2' />
        ) : (
          <div>
            <h3 className='font-medium mb-2'>Measurements</h3>
            <p>17 1/2×20 5/8"</p>
          </div>
        )}

        {isLoading || productItemLoading ? (
          <Skeleton className='h-6 w-1/2' />
        ) : (
          productItem &&
          productItem.data[0].variants.map((variant: IVariant, index: number) => {
            return (
              <div key={variant._id}>
                <h3 className='font-medium mb-2 flex items-center'>
                  Choose {variant.variant} <ArrowRight className='w-3 h-3 ml-1' />
                </h3>
                <div className='flex flex-wrap gap-4'>
                  {getUniqueVariants(variant.variant).map((variantOption: IVariant) => {
                    return (
                      <Button
                        key={variantOption._id}
                        variant={'outline'}
                        onClick={() => handleVariantSelect(variantOption)}
                        className={
                          variantOption.value === selectedVariant?.variants[index].value ? 'bg-black text-white' : ''
                        }
                      >
                        <span className='text-sm'>{variantOption.value}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )
          })
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
              <Button className='w-full border-black' variant='outline' size='lg'>
                <Heart className='mr-2 h-4 w-4' />
                Add to Wishlist
              </Button>
            </>
          )}
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          {isLoading ? (
            <Skeleton className='h-12 w-full' />
          ) : (
            <Button onClick={handleAddToCart} className='flex-1 bg-black' size='lg'>
              Add to Cart
            </Button>
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
            <span>{data?.data.SKU}</span>

            <span className='text-[#6C7275]'>Category</span>
            <span>{data?.data.category.categoryName}</span>

            <span className='text-[#6C7275]'>Material</span>
            <span>{data?.data.material.materialName}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
