import { Button } from '@/components/ui/button'
import { useTranslate } from '@/hooks/useTranslate'
import { IVariant } from '@/interface/productItem'
import { ArrowRight } from 'lucide-react'

const ProductVariant = ({
  variant,
  productItem,
  handleVariantSelect,
  selectedVariant,
  getUniqueVariants,
  index
}: {
  variant: IVariant
  productItem: any
  handleVariantSelect: any
  selectedVariant: any
  getUniqueVariants: any
  index: number
}) => {
  const { t } = useTranslate('productDetail')
  return (
    <div key={variant._id}>
      <h3 className='font-medium mb-2 flex items-center gap-1'>
        {t('choose')} <span className='lowercase'> {t(variant.variant)}</span> <ArrowRight className='w-3 h-3 ml-1' />
      </h3>
      <div className='flex flex-wrap gap-4'>
        {getUniqueVariants(variant.variant).map((variantOption: IVariant) => {
          const item = productItem.data.find((item: { variants: any[] }) =>
            item.variants.some((v) => v.variant === variantOption.variant && v.value === variantOption.value)
          )
          const isOutOfStock = item.stock - item.outStock > 0 ? false : true
          return (
            <Button
              key={variantOption._id}
              variant={'outline'}
              onClick={() => handleVariantSelect(variantOption)}
              className={`${
                variantOption.value === selectedVariant?.variants[index].value ? 'bg-black text-white' : ''
              } ${isOutOfStock ? 'opacity-50' : ''}`}
            >
              <span className='text-sm'>{variantOption.value}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductVariant
