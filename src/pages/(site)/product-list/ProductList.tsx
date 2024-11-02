import Container from '@/components/Container'
import Banner from '@/pages/(site)/home/_components/Banner'
import ProductFilter from './components/ProductFilter'
import ProductGrid from './components/ProductGrid'

const ProductList = () => {
  return (
    <>
      <Banner text={false} />
      <Container className='pt-16 pb-24'>
        <div className='flex'>
          <ProductFilter />
          <ProductGrid />
        </div>
      </Container>
    </>
  )
}

export default ProductList
