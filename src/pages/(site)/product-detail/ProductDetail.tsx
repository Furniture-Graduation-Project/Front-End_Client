import Container from '@/components/Container'
import Carousel from './components/Carousel'
import Review from './components/Review'
import LinkGroup from './components/LinkGroup'
import Product from './components/Product'
import { useSingleProductQuery } from '@/hooks/queries/useProductQuery'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const ProductDetail = () => {
  const { id } = useParams()
  const { data, isLoading, refetch } = useSingleProductQuery(id || '')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  return (
    <Container className='xl:px-0 px-8 pb-24'>
      <div className='py-8'>
        <LinkGroup />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 box-border overflow-hidden'>
          <Carousel data={data} isLoading={isLoading} />
          <Product data={data} isLoading={isLoading} refetch={refetch} />
        </div>
      </div>
      <Review data={data} />
    </Container>
  )
}

export default ProductDetail
