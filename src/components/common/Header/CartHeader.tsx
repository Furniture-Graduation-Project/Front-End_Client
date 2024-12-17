import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTranslate } from '@/hooks/useTranslate'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCartMutation } from '@/hooks/mutations/useCartMutation'
import { useCartQuery } from '@/hooks/queries/useCartQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useToast } from '@/hooks/use-toast'
import { formatCurrency } from '@/utils/formatCurrency'

const CartHeader = ({ mobile }: { mobile: boolean }) => {
  const { user } = useAuthContext()
  const { t } = useTranslate('header.cartHeader')
  const queryClient = useQueryClient()
  const [amount, setAmount] = useState(0)
  const [state, setState] = useSessionStorage('stateOrder', null)
  const { data: cartData, isLoading, isError } = useCartQuery(user?._id as string)
  const { mutate: deleteItem } = useCartMutation('REMOVE')
  const { mutate: increaseQuantity } = useCartMutation('INCREASE')
  const { mutate: decreaseQuantity } = useCartMutation('DECREASE')
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (cartData && cartData.data && cartData.data.carts) {
      setAmount(
        cartData.data.carts.reduce((acc: any, item: any) => {
          if (item.productOptionId.stock - item.productOptionId.outStock > 0) {
            return acc + item.productOptionId.price * item.quantity
          }
          return acc
        }, 0)
      )
    }
  }, [cartData, state])

  const handleIncreaseQuantity = (item: any) => {
    if (item.quantity >= item.productOptionId.stock - item.productOptionId.outStock) {
      toast({
        title: t('stockLimit'),
        variant: 'default'
      })
      return
    }
    if (user) {
      increaseQuantity(
        { productId: item.productId._id, productOptionId: item.productOptionId._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
          }
        }
      )
    }
  }

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity <= 1) {
      toast({
        title: t('Giới hạn số lượng'),
        description: t('Không thể giảm số lượng xuống dưới 1.'),
        variant: 'default',
      })
      return
    }

    if (user) {
      decreaseQuantity(
        { productId: item.productId._id, productOptionId: item.productOptionId._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
          },
          onError: (error) => {
            toast({
              title: t('decreaseError'),
              description: error.message,
              variant: 'default'
            })
          }
        }
      )
    }
  }

  const handleDeleteItem = (item: any) => {
    if (user) {
      deleteItem(
        { productId: item.productId._id, productOptionId: item.productOptionId._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
          },
          onError: (error) => {
            toast({
              title: t('deleteError'),
              description: error.message,
              variant: 'default'
            })
          }
        }
      )
    }
  }

  function onSubmit() {
    if (cartData && cartData.data && cartData.data.carts && cartData.data.carts.length > 0) {
      const stateOrder = cartData.data.carts
        .filter((item: any) => {
          return item.productId.status == 'available' && item.productOptionId.stock - item.productOptionId.outStock > 0
        })
        .map((item: any) => ({
          ...item,
          unitPrice: item.productOptionId.price
        }))
      if (!stateOrder || stateOrder.length <= 0) {
        toast({
          title: t('pleaseAddProduct'),
          description: t('cartMustHaveProduct'),
          variant: 'default'
        })
        return
      }
      setState(JSON.stringify(stateOrder))
      navigate('/checkout')
    } else {
      toast({
        title: t('pleaseAddProduct'),
        description: t('cartMustHaveProduct'),
        variant: 'default'
      })
    }
  }

  return (
    <div className={`items-center ${mobile ? 'lg:hidden' : 'hidden lg:flex'}`}>
      <div className='z-30 flex h-14 items-center bg-background sm:h-auto sm:border-0'>
        <Sheet>
          <SheetTrigger asChild>
            <div className='relative cursor-pointer'>
              <ShoppingBag />
              <div className='absolute -top-[50%] right-[-50%] rounded-full bg-black text-white w-[20px] h-[20px] text-center leading-[20px] ml-1'>
                {cartData?.data ? cartData?.data.carts.length : 0}
              </div>
            </div>
          </SheetTrigger>
          <SheetContent
            side='right'
            className='w-screen max-w-md fixed flex flex-col justify-between bg-white rounded-lg'
          >
            <div className='flex-1 overflow-y-auto no-scrollbar'>
              <h1 className='headline-6 font-medium text-[#121212]'>{t('cart')}</h1>
              <div className='mt-8'>
                <div className='flow-root'>
                  <ul role='list' className=' -my-6 divide-y divide-neuborder-neutral-3'>
                    {isLoading ? (
                      <div>{t('loading')}</div>
                    ) : isError ? (
                      <div>{t('cartError')}</div>
                    ) : cartData?.data?.carts?.length > 0 ? (
                      cartData.data.carts.map((item: any) => (
                        <li key={item.productOptionId._id} className={`flex my-6 py-2 relative `}>
                          <div
                            className={`absolute w-full h-full items-center justify-center ${item.productOptionId.stock - item.productOptionId.outStock === 0 || item.productId.status !== 'available' ? 'bg-slate-50/70 flex' : 'hidden'}`}
                          >
                            <Button
                              type='button'
                              onClick={() => handleDeleteItem(item)}
                              disabled={item.productOptionId.stock === 0}
                              className='flex items-center gap-3'
                            >
                              <X className='text-neutral-4 w-[14px] h-[14px]' strokeWidth={2} /> Loại bỏ
                            </Button>
                          </div>
                          <div className='h-24 w-24 flex-shrink-0 rounded-md border border-neutral-3'>
                            <img
                              src={item.productOptionId.image}
                              alt={item.productId.name}
                              className='h-full w-full object-cover object-center'
                            />
                          </div>

                          <div className='ml-4 flex flex-1 flex-col'>
                            <div>
                              <div className='flex justify-between caption-1-semi text-neutral-7'>
                                <h3>
                                  <a href={item.productId.href}>{item.productId.name}</a>
                                </h3>
                                <p className='ml-4 text-[#121212]'>{formatCurrency(item.productOptionId.price)}</p>
                              </div>
                              <div className='flex flex-1 justify-between items-center mt-1'>
                                <p className='text-[12px] text-[#6C7275]'>
                                  {item.productOptionId.variants.map((variant: any, id: number) => (
                                    <span key={id}>
                                      {variant.variant}: {variant.value}
                                    </span>
                                  ))}
                                </p>
                                <button
                                  type='button'
                                  onClick={() => handleDeleteItem(item)}
                                  disabled={item.productOptionId.stock === 0}
                                >
                                  <X className='text-neutral-4 w-[14px] h-[14px]' strokeWidth={2} />
                                </button>
                              </div>
                              <div>
                                <p className='text-[12px] text-[#6C7275]'>
                                  {item.productOptionId.stock === 0
                                    ? t('out_of_stock')
                                    : t('stock_quantity') +
                                      (item.productOptionId.stock - item.productOptionId.outStock)}
                                </p>
                              </div>
                            </div>
                            <div className='flex flex-1 items-end justify-between text-[12px]'>
                              <div className='flex items-center border border-black rounded-lg py-1.5 px-2 mt-2'>
                                <button
                                  onClick={() => handleDecreaseQuantity(item)}
                                  disabled={item.productOptionId.stock === 0}
                                >
                                  <Minus className='h-4 w-4' strokeWidth={1} />
                                </button>
                                <span className='mx-3'>{item.quantity}</span>
                                <button
                                  onClick={() => handleIncreaseQuantity(item)}
                                  disabled={item.productOptionId.stock === 0}
                                >
                                  <Plus className='h-4 w-4' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div>{t('noProductInCart')}</div>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className='border-b border-neutral-3 p-4'>
              <div className='flex justify-between text-neutral-7'>
                <p className='body-2'>{t('subtotal')}</p>
                <p className='body-2-semi'>{formatCurrency(amount)}</p>
              </div>
            </div>

            <div className='p-4 border-neutral-3'>
              <div className='flex justify-between headline-7 text-neutral-7'>
                <p>{t('total')}</p>
                <p>{formatCurrency(amount)}</p>
              </div>

              <div className='mt-6'>
                <Button onClick={onSubmit} className='w-full bg-black text-white hover:bg-neutral-7'>
                  {t('checkout')}
                </Button>
              </div>

              <div className='mt-6 flex justify-center text-center caption-1-semi text-neutral-4 space-x-3'>
                <Link to='/cart' className='text-black hover:text-neutral-7 underline'>
                  {t('viewCart')}
                </Link>
                <span>{t('or')}</span>
                <Link to='/' className='text-black hover:text-neutral-7 underline'>
                  {t('continue')}
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default CartHeader
