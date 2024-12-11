import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import IconButton from '../ui/icon-button'
import { ShoppingCart } from 'lucide-react'
import { useSingleProductQuery } from '@/hooks/queries/useProductQuery'
import Product from '@/pages/(site)/product-detail/components/Product'
import Carousel from '@/pages/(site)/product-detail/components/Carousel'

interface PopupProductProps {
  productId: string
}

const PopupProduct = ({ productId }: PopupProductProps) => {
  const { data, isLoading, refetch } = useSingleProductQuery(productId || '')

  return (
    <Dialog>
      <DialogTrigger>
        <IconButton
          className='opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
          onClick={() => {}}
          icon={<ShoppingCart className='h-6 w-6' size={15} />}
        />
      </DialogTrigger>
      <DialogContent className='max-w-fit'>
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <div className='flex gap-x-4 items-center'>
            <Carousel data={data} isLoading={isLoading} />

            <Product data={data} isLoading={isLoading} refetch={refetch} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PopupProduct
