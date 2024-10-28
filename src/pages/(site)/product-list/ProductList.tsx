import Container from '@/components/Container'
import Banner from '../home/_components/Banner'
import ProductFilter from './components/ProductFilter'

const ProductList = () => {
  return (
    <>
      <Banner text={false} />
      <Container className='pt-16 pb-24'>
        <ProductFilter />
      </Container>
    </>
  )
}

export default ProductList
