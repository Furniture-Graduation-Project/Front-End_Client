import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTranslate } from '@/hooks/useTranslate';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/config/axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CartHeader = ({ mobile }: { mobile: boolean }) => {
  const { t } = useTranslate('header.cartHeader');
  const queryClient = useQueryClient();
  const { data: cartData, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axiosInstance.get('cart/652bc4e5a2f2b8123e9d4567');
      return response.data;
    },
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.delete(`cart/${productId}/${productItemId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const { mutate: increaseQuantity } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.patch(`cart/increase/652bc4e5a2f2b8123e9d4567/${productId}/${productItemId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const { mutate: decreaseQuantity } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.patch(`cart/decrease/652bc4e5a2f2b8123e9d4567/${productId}/${productItemId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const calculateTotal = () =>
    cartData?.data.carts.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleIncreaseQuantity = (item: any) => {
    if (item.quantity >= item.productItemID.stock) {
      alert('Số lượng hàng không thể lớn hơn hàng tồn kho!');
    } else {
      increaseQuantity({ productId: item.productID._id, productItemId: item.productItemID._id });
    }
  };

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity > 1) {
      decreaseQuantity({ productId: item.productID._id, productItemId: item.productItemID._id });
    }
  };

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
          <div className='rounded-full bg-black text-white w-[20px] h-[20px] text-center leading-[20px] ml-1'>
            {cartData?.data.carts.length || 0}
          </div>

          <SheetContent side='right' className='w-screen max-w-md fixed flex flex-col justify-between bg-white rounded-lg'>
            <div className='flex-1 overflow-y-auto no-scrollbar'>
              <h1 className='headline-6 font-medium text-[#121212]'>{t('cart')}</h1>
              <div className='mt-8'>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-neuborder-neutral-3'>
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : isError ? (
                      <div>Error loading cart</div>
                    ) : (
                      cartData.data.carts.map((item: any) => (
                        <li
                          key={item.productItemID._id}
                          className={`flex py-6 ${item.productItemID.stock === 0 ? 'opacity-50' : ''}`}
                        >
                          <div className='h-24 w-24 flex-shrink-0 rounded-md border border-neutral-3'>
                            <img
                              src='https://assets.weimgs.com/weimgs/rk/images/wcm/products/202420/0120/meyer-wooden-drink-tables-18-21-5-o.jpg'
                              alt={item.productID._id}
                              className='h-full w-full object-cover object-center'
                            />
                          </div>

                          <div className='ml-4 flex flex-1 flex-col'>
                            <div>
                              <div className='flex justify-between caption-1-semi text-neutral-7'>
                                <h3>
                                  <a href={item.productID.href}>{item.productID.name}</a>
                                </h3>
                                <p className='ml-4 text-[#121212]'>${item.price.toFixed(2)}</p>
                              </div>
                              <div className='flex flex-1 justify-between items-center mt-1'>
                                <p className='text-[12px] text-[#6C7275]'>
                                  {item.productItemID.variants.map((variant: any, id: number) => (
                                    <span key={id}>
                                      {variant.variant}: {variant.value}
                                    </span>
                                  ))}
                                </p>
                                <button
                                  type='button'
                                  onClick={() => removeItem({ productId: item.productID._id, productItemId: item.productItemID._id })}
                                  disabled={item.productItemID.stock === 0}
                                >
                                  <X className='text-neutral-4 w-[14px] h-[14px]' strokeWidth={2} />
                                </button>
                              </div>
                            </div>
                            <div className='flex flex-1 items-end justify-between text-[12px]'>
                              <div className='flex items-center border border-black rounded-lg py-1.5 px-2 mt-2'>
                                <button onClick={() => handleDecreaseQuantity(item)} disabled={item.productItemID.stock === 0}>
                                  <Minus className='h-4 w-4' strokeWidth={1} />
                                </button>
                                <span className='mx-3'>{item.quantity}</span>
                                <button onClick={() => handleIncreaseQuantity(item)} disabled={item.productItemID.stock === 0}>
                                  <Plus className='h-4 w-4' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className='border-b border-neutral-3 p-4'>
              <div className='flex justify-between text-neutral-7'>
                <p className='body-2'>{t('subtotal')}</p>
                <p className='body-2-semi'>${calculateTotal()}</p>
              </div>
            </div>

            <div className='p-4 border-neutral-3'>
              <div className='flex justify-between headline-7 text-neutral-7'>
                <p>{t('total')}</p>
                <p>${calculateTotal()}</p>
              </div>

              <div className='mt-6'>
                <a
                  href='#'
                  className='flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 button-m text-white shadow-sm hover:bg-neutral-7'
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
  );
};

export default CartHeader;
