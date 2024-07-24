import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '@/components/Container'
import ProductCard from '@/components/site/ProductCard'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useTranslate } from '@/hooks/useTranslate'

export function CarouselSize() {
  const { t } = useTranslate('home.carousel')

  return (
    <>
      <Container className='sm:px-0 px-8'>
        <div className='flex justify-between *:font-medium mb-12 mt-9'>
          <div className='headline-4'>
            <h1>
              {t('newArrivals.line1', 'New')} <br /> {t('newArrivals.line2', 'Arrivals')}
            </h1>
          </div>
          <div className='sm:flex hidden  items-center transition duration-500 ease-in-out transform hover:-translate-x-1 hover:opacity-70'>
            <Link to={''} className='underline '>
              {t('moreProducts', 'More Products')}
            </Link>
            <ArrowRight className='h-4' />
          </div>
        </div>
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full'
        >
          <CarouselContent className='-ml-[30px]'>
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4 pl-[30px]'>
                <ProductCard />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden xl:flex' />
          <CarouselNext className='hidden xl:flex' />
        </Carousel>
        <Separator className='mt-[62px]' />
      </Container>
    </>
  )
}
