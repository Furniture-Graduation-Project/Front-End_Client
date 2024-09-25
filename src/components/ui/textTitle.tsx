import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useTranslate } from '@/hooks/useTranslate'
import { cn } from '@/utils/classUtils'
import { Check } from 'lucide-react'
import React from 'react'

interface TextTitleProps {
  checkout?: boolean
  order?: boolean
  title: string
}

const TextTitle: React.FC<TextTitleProps> = ({ checkout, order, title }) => {
  const { t } = useTranslate('cart.textTitle')
  return (
    <>
      <h1 className='font-medium text-[54px] text-center mb-10 my-20'>{title}</h1>
      <Carousel className='w-4/5 sm:w-[312px] md:w-[500px] lg:w-[832px] mx-auto'>
        <CarouselContent className='-ml-1'>
          <CarouselItem
            className={cn(
              `pl-1 sm:basis-4/5 md:basis-1/2 lg:basis-1/3`,
              checkout ? 'hidden sm:block' : '',
              order ? 'hidden lg:block' : ''
            )}
          >
            <div className='pr-8 py-1'>
              <div
                className={cn(
                  `flex items-center pb-6 border-b-2`,
                  checkout || order ? 'border-[#38CB89]' : 'border-black'
                )}
              >
                <div
                  className={cn(
                    `w-10 h-10 rounded-full text-white mr-4`,
                    checkout || order
                      ? 'bg-green sm:flex items-center justify-center'
                      : 'bg-black text-center leading-10'
                  )}
                >
                  {checkout || order ? <Check size={24} /> : '1'}
                </div>
                <p className={cn(`font-semibold`, checkout || order ? 'text-[#38CB89]' : '')}>{t('shop')}</p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className={cn(`pl-1 sm:basis-4/5 md:basis-1/2 lg:basis-1/3`, order ? 'hidden sm:block' : '')}>
            <div className='pr-8 py-1'>
              <div
                className={cn(
                  `flex items-center pb-6`,
                  checkout ? 'border-b-2 border-black' : '',
                  order ? 'border-b-2 border-green-500' : ''
                )}
              >
                <div
                  className={cn(
                    `w-10 h-10 rounded-full text-white text-center leading-10 mr-4`,
                    checkout ? 'bg-black' : 'bg-[#B1B5C3]',
                    order ? 'bg-green sm:flex items-center justify-center' : ''
                  )}
                >
                  {checkout ? '2' : order ? <Check size={24} /> : '2'}
                </div>
                <p
                  className={cn(
                    `font-semibold`,
                    checkout ? 'text-black' : 'text-[#B1B5C3]',
                    order ? 'text-[#38CB89]' : ''
                  )}
                >
                  {t('checkoutDetail')}
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className='pl-1 sm:basis-4/5 md:basis-1/2  lg:basis-1/3'>
            <div className='p-1'>
              <div className={cn(`flex items-center pb-6`, order ? 'border-black border-b-2' : '')}>
                <div
                  className={cn(
                    `w-10 h-10 rounded-full  text-white text-center leading-10 mr-4`,
                    order ? 'bg-black' : 'bg-[#B1B5C3]'
                  )}
                >
                  3
                </div>
                <p className={cn(`font-semibold`, order ? 'text-black' : 'text-[#B1B5C3]')}>{t('orderComplete')}</p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  )
}

export default TextTitle
