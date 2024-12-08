import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '@/components/Container'
import ProductCard from '@/components/site/ProductCard'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useTranslate } from '@/hooks/useTranslate'
import { useProductListQuery } from '@/hooks/queries/useProductQuery'

export function CarouselSize() {
  const { t } = useTranslate('home.carousel')

  const { data: products, isLoading, isError } = useProductListQuery(undefined, true)

  if (isLoading) {
    return <div>Đang tải...</div>
  }

  if (isError) {
    return <div>Đã xảy ra lỗi khi tải sản phẩm.</div>
  }
  const sortedProducts = products?.data?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <Container className='sm:px-0 px-8'>
      <div className='flex justify-between *:font-medium mb-12 mt-9'>
        <div className='headline-4'>
          <h1>
            {t('newArrivals.line1', 'Mới')} <br /> {t('newArrivals.line2', 'Sản phẩm')}
          </h1>
        </div>
        <div className='sm:flex hidden items-center transition duration-500 ease-in-out transform hover:-translate-x-1 hover:opacity-70'>
          <Link to='/products' className='underline'>
            {t('moreProducts', 'Xem thêm sản phẩm')}
          </Link>
          <ArrowRight className='h-4' />
        </div>
      </div>
      <Carousel opts={{ align: 'start' }} className='w-full'>
        <CarouselContent className='-ml-[30px]'>
          {sortedProducts?.map((product) => (
            <CarouselItem key={product._id} className='basis-1/1 md:basis-1/2 lg:basis-1/4 pl-[30px]'>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden 2xl:flex absolute top-1/2 left-0 -translate-x-1/2' />
        <CarouselNext className='hidden 2xl:flex absolute top-1/2 right-0 translate-x-1/2' />
      </Carousel>
      <Separator className='mt-[62px]' />
    </Container>
  )
}
