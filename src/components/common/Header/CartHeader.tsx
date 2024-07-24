import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTranslate } from '@/hooks/useTranslate'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const cart = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'red',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
  }
]
const CartHeader = ({ mobile }: { mobile: boolean }) => {
  const { t } = useTranslate('header.cartHeader')
  const [count, setCount] = useState(1)
  const setPlus = () => {
    setCount(count + 1)
  }
  const setMinus = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  return (
    <div className={`items-center ${mobile ? 'lg:hidden' : 'hidden lg:flex'}`}>
      <div className='z-30 flex h-14 items-center bg-background sm:h-auto sm:border-0'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' variant='ghost' className='hover:bg-inherit w-auto'>
              <ShoppingBag />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <div className='rounded-full bg-black text-white w-[20px] h-[20px] text-center leading-[20px] ml-1'>2</div>

          <SheetContent
            side='right'
            className='w-screen max-w-md fixed flex flex-col justify-between bg-white rounded-lg'
          >
            <div className='flex-1 overflow-y-auto no-scrollbar'>
              <h1 className='headline-6 font-medium text-[#121212]'>{t('cart')}</h1>
              <div className='mt-8'>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-neuborder-neutral-3'>
                    {cart.map((item) => (
                      <li key={item.id} className='flex py-6 '>
                        <div className='h-24 w-24 flex-shrink-0  rounded-md border border-neutral-3'>
                          <img
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between caption-1-semi text-neutral-7'>
                              <h3>
                                <a href={item.href}>{item.name}</a>
                              </h3>
                              <p className='ml-4 text-[#121212]'>{item.price}</p>
                            </div>
                            <div className='flex flex-1 justify-between items-center mt-1'>
                              <p className='mt-1 caption-2 text-gray-500'>
                                {t('color')}: {t(item.color)}
                              </p>
                              <div className='flex'>
                                <button type='button' className='font-medium '>
                                  <X className='text-neutral-4 w-[14px] h-[14px]' strokeWidth={2} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-[12px]'>
                            <div className='flex items-center border border-black rounded-lg py-1.5 px-2 mt-2'>
                              <button>
                                <Minus className='h-4 w-4' strokeWidth={1} onClick={() => setMinus()} />
                              </button>
                              <span className='mx-3'>{count}</span>
                              <button onClick={() => setPlus()}>
                                <Plus className='h-4 w-4' strokeWidth={1} onClick={() => setPlus()} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='border-b border-neutral-3'>
              <div className='flex justify-between text-neutral-7'>
                <p className='body-2'>{t('subtotal')}</p>
                <p className='body-2-semi'>$262.00</p>
              </div>
            </div>

            <div className=' border-neutral-3'>
              <div className='flex justify-between headline-7 text-neutral-7'>
                <p>{t('total')}</p>
                <p>$262.00</p>
              </div>

              <div className='mt-6'>
                <a
                  href='#'
                  className='flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 buuton-m text-white shadow-sm hover:bg-neutral-7'
                >
                  {t('checkout')}
                </a>
              </div>
              <div className='mt-6 flex justify-center text-center caption-1-semi text-neutral-4 space-x-3'>
                <Link to='' className='text-black hover:text-neutral-7 underline'>
                  {t('viewCart')}
                </Link>
                <span>{t('or')}</span>
                <SheetTrigger asChild>
                  <button className='text-black hover:text-neutral-7'>
                    {t('continue')}
                    <span aria-hidden='true'> &rarr;</span>
                  </button>
                </SheetTrigger>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default CartHeader
