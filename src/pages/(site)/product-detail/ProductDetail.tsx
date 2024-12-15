import Container from '@/components/Container'
import Carousel from './components/Carousel'
import Review from './components/Review'
import Product from './components/Product'
import { useSingleProductQuery } from '@/hooks/queries/useProductQuery'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProductItemsByProductId } from '@/hooks/queries/useProductItemQuery'
import { IProductItem } from '@/interface/productItem'

const ProductDetail = () => {
  const { id } = useParams()
  const { data, isLoading, refetch } = useSingleProductQuery(id || '')
  const { data: productItem, isLoading: productItemLoading } = useProductItemsByProductId(id || '')
  const [selectedVariant, setSelectedVariant] = useState<IProductItem | undefined>()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  return (
    <Container className='xl:px-0 px-8 pb-24'>
      <div className='py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 box-border overflow-hidden'>
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
      </div>
      <Review data={data} />
    </Container>
  )
}

export default ProductDetail
