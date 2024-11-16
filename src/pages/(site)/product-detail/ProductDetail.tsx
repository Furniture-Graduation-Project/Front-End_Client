import Container from '@/components/Container'
import Carousel from './components/Carousel'
import Review from './components/Review'
import LinkGroup from './components/LinkGroup'
import Product from './components/Product'

const ProductDetail = () => {
  return (
    <Container className='xl:px-0 px-8 pb-24'>
      <div className='py-8'>
        <LinkGroup />
        <div className='grid md:grid-cols-2 gap-16'>
          <Carousel />
          <Product />
        </div>
      </div>
      <Review />
    </Container>
  )
}

export default ProductDetail
