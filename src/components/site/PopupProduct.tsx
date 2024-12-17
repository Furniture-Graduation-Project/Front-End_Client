import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useSingleProductQuery } from '@/hooks/queries/useProductQuery'
import { useTranslate } from '@/hooks/useTranslate'
import Carousel from '@/pages/(site)/product-detail/components/Carousel'
import Product from '@/pages/(site)/product-detail/components/Product'
import { Eye, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import IconButton from '../ui/icon-button'
import { useProductItemsByProductId } from '@/hooks/queries/useProductItemQuery'
import { useState } from 'react'
import { IProductItem } from '@/interface/productItem'

interface PopupProductProps {
  productId: string
  button?: boolean
}

const PopupProduct = ({ productId, button }: PopupProductProps) => {
  const { t } = useTranslate('account.wishlist')
  const { data, isLoading, refetch } = useSingleProductQuery(productId || '')
  const { data: productItem, isLoading: productItemLoading } = useProductItemsByProductId(productId || '')
  const [selectedVariant, setSelectedVariant] = useState<IProductItem | undefined>()
  return (
    <Dialog>
      {button ? (
        <DialogTrigger asChild>
          <Button>
            <ShoppingCart className='h-6 w-6' size={15} />
            {t('addCart')}
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <IconButton
            className='opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            icon={<Eye className='h-6 w-6' size={15} />}
          />
        </DialogTrigger>
      )}
      <DialogContent className='max-w-fit'>
        <DialogTitle></DialogTitle>
        <DialogHeader>
          <div className='flex gap-x-4 items-center'>
            <Carousel selectedVariant={selectedVariant} data={data} productItem={productItem} isLoading={isLoading} />
            <Product
              data={data}
              productItem={productItem}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              isLoading={isLoading}
              productItemLoading={productItemLoading}
              refetch={refetch}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PopupProduct
