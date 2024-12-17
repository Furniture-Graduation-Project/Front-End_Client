import Container from '@/components/Container'
import Banner from '@/pages/(site)/home/_components/Banner'
import ProductFilter from './components/ProductFilter'
import ProductGrid from './components/ProductGrid'
import Newsletter from '@/components/site/Newsletter'
import { Separator } from '@/components/ui/separator'
import { useLocation } from 'react-router-dom'

const ProductList = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const categoryId = queryParams.get('category') || undefined
  const materialId = queryParams.get('material') || undefined
  return (
    <>
      <div className='flex items-center h-[400px] overflow-hidden'>
        <Banner text={false} />
      </div>
      <Container className='xl:px-0 px-8 pt-16 pb-24'>
        <div className='flex flex-col md:flex-row'>
          <Separator className='md:hidden block' />
          <ProductFilter />
          <Separator className='mb-4 md:hidden block' />
          <ProductGrid categoryId={categoryId} materialId={materialId} />
        </div>
      </Container>
      <Newsletter />
    </>
  )
}

export default ProductList
