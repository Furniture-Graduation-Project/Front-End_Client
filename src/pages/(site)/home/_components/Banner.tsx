import Autoplay from 'embla-carousel-autoplay'
import * as React from 'react'

import { BannerImage2, BannerImage3 } from '@/assets'
import Container from '@/components/Container'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useTranslate } from '@/hooks/useTranslate'

const Banner = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const { t } = useTranslate('home.banner')

  return (
    <>
      <Container className='sm:px-0 px-8 relative z-10'>
        <Carousel
          plugins={[plugin.current]}
          className='w-full'
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem>
              <img src={BannerImage2} alt='' className='w-full sm:h-auto h-[300px] object-cover rounded-lg' />
            </CarouselItem>
            <CarouselItem>
              <img src={BannerImage3} alt='' className='w-full sm:h-auto h-[300px] object-cover rounded-lg' />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className='lg:grid lg:grid-cols-2 lg:gap-3 flex-col my-8'>
          <div className='sm:headline-2 headline-4'>
            <h1>
              {t('headline1', 'Simply Unique')} <span className='text-neutral-4'>/</span>
            </h1>
            <h1>
              {t('headline2', 'Simply Better')}
              <span className='text-neutral-4'>.</span>
            </h1>
          </div>
          <div className='text-neutral-4 lg:m-auto tracking-wider my-5 text-[12px] sm:body-2 sm:w-[424px]'>
            <p>
              <b className='text-neutral-5 mr-1'>3legant</b>
              {t('description', ' is an interior design and decoration company based in Hanoi, ')}
              {t('location', ' Vietnam. Est since 2019.')}
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
export default Banner
