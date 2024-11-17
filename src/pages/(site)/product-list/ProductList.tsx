import Container from '@/components/Container'
import Banner from '@/pages/(site)/home/_components/Banner'
import ProductFilter from './components/ProductFilter'
import ProductGrid from './components/ProductGrid'
import Newsletter from '@/pages/(site)/home/_components/Newsletter'
import { Separator } from '@/components/ui/separator'

const ProductList = () => {
  return (
    <>
      <Banner text={false} />
      <Container className='xl:px-0 px-8 pt-16 pb-24'>
        <div className='flex flex-col md:flex-row'>
          <Separator className='md:hidden block' />
          <ProductFilter />
          <Separator className='mb-4 md:hidden block' />
          <ProductGrid />
        </div>
      </Container>
      <Newsletter />
    </>
  )
}

export default ProductList
