import Container from '@/components/Container'
import Carousel from './components/Carousel'
import Review from './components/Review'
import LinkGroup from './components/LinkGroup'
import Product from './components/Product'
import { useSingleProductQuery } from '@/hooks/queries/useProductQuery'

const ProductDetail = () => {
  const { data, isLoading } = useSingleProductQuery('673e9753fb100ab842262e4f')

  return (
    <Container className='xl:px-0 px-8 pb-24'>
      <div className='py-8'>
        <LinkGroup />
        <div className='grid md:grid-cols-2 gap-16'>
          <Carousel data={data} isLoading={isLoading} />
          <Product data={data} isLoading={isLoading} />
        </div>
      </div>
      <Review data={data} />
    </Container>
  )
}

export default ProductDetail
