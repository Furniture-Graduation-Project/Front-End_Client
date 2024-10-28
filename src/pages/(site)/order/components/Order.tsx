import { Separator } from '@/components/ui/separator'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

const Order = () => {
  return (
    <div className='my-20 p-4 sm:py-20 sm:px-24 shadow-lg rounded-md md:w-[738px] w-auto mx-auto'>
      <h1 className='text-base sm:text-3xl font-semibold text-[#6C7275] text-center'>Thank you! 🎉</h1>
      <div className='flex flex-col gap-y-10 justify-center items-center mt-4'>
        <h1 className='text-[40px] font-medium text-center'>Your order has been received</h1>
        <div className=''>
          <Carousel
            opts={{
              align: 'start'
            }}
            className='w-full max-w-sm'
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className='sm:basis-1/2 md:basis-1/3 '>
                  <div className='p-3 relative'>
                    <div className=''>
                      <img
                        src='https://assets.weimgs.com/weimgs/rk/images/wcm/products/202420/0120/meyer-wooden-drink-tables-18-21-5-o.jpg'
                        alt='img'
                        className='rounded-md'
                      />
                      <div className='w-8 px-[11px] py-1 flex justify-center items-center bg-black text-white rounded-full top-0 right-0 absolute'>
                        2
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
            <p className='font-semibold text-[#6C7275] text-[14px]'>Order Code:</p>
            <p className='mt-2 font-semibold text-[14px]'>#0123_45678</p>
            <Separator className='mt-4' />
          </div>
          <div className=''>
            <p className='font-semibold text-[#6C7275] text-[14px]'>Date:</p>
            <p className='mt-2 font-semibold text-[14px]'>October 19, 2023</p>
            <Separator className='mt-4' />
          </div>
          <div className=''>
            <p className='font-semibold text-[#6C7275] text-[14px]'>Total:</p>
            <p className='mt-2 font-semibold text-[14px]'>$1,345.00</p>
            <Separator className='mt-4' />
          </div>
          <div className=''>
            <p className='font-semibold text-[#6C7275] text-[14px]'>Payment method:</p>
            <p className='mt-2 font-semibold text-[14px]'>Credit Card</p>
            <Separator className='mt-4' />
          </div>
        </div>
        <div className='hidden sm:flex items-center justify-center w-auto sm:w-[548px] gap-x-8'>
          <div className='flex flex-col items-start gap-y-5 *:text-[#6C7275] *:text-sm *:font-semibold'>
            <p>Order code:</p>
            <p>Date:</p>
            <p>Total:</p>
            <p>Payment method:</p>
          </div>
          <div className='flex flex-col items-start gap-y-5 *:text-sm *:font-semibold'>
            <p>#0123_45678</p>
            <p>October 19, 2023</p>
            <p>$1,345.00</p>
            <p>Credit Card</p>
          </div>
        </div>
        <Button className='px-11 h-[52px] font-medium text-base rounded-full'>Purchase history</Button>
      </div>
    </div>
  )
}

export default Order
