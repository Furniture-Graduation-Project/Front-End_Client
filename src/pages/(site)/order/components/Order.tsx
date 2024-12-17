/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from '@/components/ui/separator'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'
import { useTranslate } from '@/hooks/useTranslate'
import { IOrderItem } from '@/interface/order'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import { generatePDF } from '@/utils/pdfGenerator'

const Order = ({ data, isLoading, isError }: any) => {
  const { t } = useTranslate('order')
  const { language } = useLanguage()

  const handleDownload = () => {
    if (data && data.data && data.data.items) {
      generatePDF(data, language)
    }
  }

  if (isLoading) {
    return (
      <div className='my-20 p-4 sm:py-20 sm:px-24 shadow-lg rounded-md md:w-[738px] w-auto mx-auto'>
        <Skeleton className='h-8 w-[200px] mx-auto mb-8' />
        <div className='flex flex-col gap-y-10 justify-center items-center mt-4'>
          <Skeleton className='h-12 w-[300px]' />
          <Skeleton className='h-64 w-full max-w-sm' />
          <div className='sm:hidden flex flex-col w-full px-3 gap-y-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='space-y-2'>
                <Skeleton className='h-4 w-[120px]' />
                <Skeleton className='h-4 w-[200px]' />
                <Separator className='mt-4' />
              </div>
            ))}
          </div>
          <div className='hidden sm:flex items-center justify-center w-auto sm:w-[548px] gap-x-8'>
            <div className='flex flex-col items-start gap-y-5'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-4 w-[120px]' />
              ))}
            </div>
            <div className='flex flex-col items-start gap-y-5'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-4 w-[200px]' />
              ))}
            </div>
          </div>
          <Skeleton className='h-[52px] w-[200px] rounded-full' />
        </div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className='my-20 p-4 sm:py-20 sm:px-24 shadow-lg rounded-md md:w-[738px] w-auto mx-auto'>
        <p className='text-center text-red-500'>{t('failedToLoad')}</p>
      </div>
    )
  }
  return (
    <div className='relative z-10 my-20 p-4 sm:py-20 sm:px-24 shadow-lg rounded-md md:w-[738px] w-auto mx-auto'>
      <h1 className='text-base sm:text-3xl font-semibold text-[#6C7275] text-center'>{t('thankYou')}</h1>
      <div className='flex flex-col gap-y-10 justify-center items-center mt-4'>
        <h1 className='text-[40px] font-medium text-center'>{t('orderReceived')}</h1>
        <div className=''>
          <Carousel
            opts={{
              align: 'start'
            }}
            className='w-full max-w-sm'
          >
            <CarouselContent>
              {data?.data.items?.map((item: IOrderItem, index: number) => (
                <CarouselItem key={index} className='sm:basis-1/2 md:basis-1/3 '>
                  <div className='p-3 relative'>
                    <div className=''>
                      <img
                        src='https://assets.weimgs.com/weimgs/rk/images/wcm/products/202420/0120/meyer-wooden-drink-tables-18-21-5-o.jpg'
                        alt='img'
                        className='rounded-md'
                      />
                      <div className='w-8 px-[11px] py-1 flex justify-center items-center bg-black text-white rounded-full top-0 right-0 absolute'>
                        {item.quantity}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className='sm:hidden flex flex-col w-full px-3 gap-y-4'>
          <div className=''>
            <p className='font-semibold text-[#6C7275] text-[14px]'>{t('orderCode')}</p>
            <p className='mt-2 font-semibold text-[14px] uppercase'>{data?.data.code}</p>
            <Separator className='mt-4' />
          </div>
          <div className=''>
            <p className='font-semibold text-[#6C7275] text-[14px]'>{t('date')}</p>
            <p className='mt-2 font-semibold text-[14px]'>
              {data?.data.payment?.paymentDate && new Date(data.data.payment.paymentDate).toLocaleDateString()}
            </p>
            <Separator className='mt-4' />
          </div>
          <div className=''>
            <p className='font-semibold text-[#6C7275] text-[14px]'>{t('total')}</p>
            <p className='mt-2 font-semibold text-[14px]'>
              {data?.data.totalPrice} <span>VND</span>
            </p>
            <Separator className='mt-4' />
          </div>
          <div className=''>
            <p className='font-semibold text-[#6C7275] text-[14px]'>{t('paymentMethod')}</p>
            <p className='mt-2 font-semibold text-[14px]'>
              {data?.data.payment?.paymentMethod == 'credit_card'
                ? 'Thanh trước khi nhân hàng'
                : data?.data.payment?.paymentMethod == 'cash_on_delivery'
                  ? 'Thanh toán khi nhận hàng'
                  : '#Trống'}
            </p>
            <Separator className='mt-4' />
          </div>
        </div>
        <div className='hidden sm:flex items-center justify-center w-auto sm:w-[548px] gap-x-8'>
          <div className='flex flex-col items-start gap-y-5 *:text-[#6C7275] *:text-sm *:font-semibold'>
            <p>{t('orderCode')}</p>
            <p>{t('date')}</p>
            <p>{t('total')}</p>
            <p>{t('paymentMethod')}</p>
          </div>
          <div className='flex flex-col items-start gap-y-5 *:text-sm *:font-semibold'>
            <p className='uppercase'>{data?.data.code}</p>
            <p>{data?.data.payment?.paymentDate && new Date(data.data.payment.paymentDate).toLocaleDateString()}</p>
            <p>
              {data?.data.totalPrice} <span>VND</span>
            </p>
            <p>
              {data?.data.payment?.paymentMethod == 'credit_card'
                ? 'Thanh trước khi nhân hàng'
                : data?.data.payment?.paymentMethod == 'cash_on_delivery'
                  ? 'Thanh toán khi nhân hàng'
                  : '#Trống'}
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <Link to={'/account/order/' + data?.data._id}>
            <Button>{t('purchaseHistory')}</Button>
          </Link>
          <Button onClick={handleDownload}>{t('Invoice')}</Button>
        </div>
      </div>
    </div>
  )
}

export default Order
