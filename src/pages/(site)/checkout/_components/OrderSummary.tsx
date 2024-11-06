import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { axiosInstance } from '@/config/axios'
import { useTranslate } from '@/hooks/useTranslate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Minus, Plus, TicketPercent } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  coupon: z.string().optional()
})

const OrderSummary = () => {
  const { t } = useTranslate('checkout.order')
  const queryClient = useQueryClient()
  const [amount, setAmount] = useState<number>(0)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axiosInstance.get(`cart/652bc4e5a2f2b8123e9d4567`)
      setAmount(response.data.data.carts.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0))
      return response.data
    }
  })
  const { mutate: increaseQuantity } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.patch(`cart/increase/652bc4e5a2f2b8123e9d4567/${productId}/${productItemId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const { mutate: decreaseQuantity } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.patch(`cart/decrease/652bc4e5a2f2b8123e9d4567/${productId}/${productItemId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coupon: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }
  return (
    <>
      <div className='sticky top-10'>
        <div className='border border-black py-4 px-6 rounded-md'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='text-[28px] font-semibold'>{t('title')}</h1>
            <div className='flex flex-col'>
              {data &&
                data.data.carts.map((item: any, i: number) => (
                  <div key={i}>
                    <div className='flex justify-between py-7'>
                      <div className='flex gap-4'>
                        <img
                          src='https://assets.weimgs.com/weimgs/rk/images/wcm/products/202420/0120/meyer-wooden-drink-tables-18-21-5-o.jpg'
                          alt=''
                          className='w-24 h-28'
                        />
                        <div className='flex flex-col gap-y-2 justify-center'>
                          <h1 className='font-semibold text-[14px]'>{item.productID.name}</h1>
                          <p className='text-[12px] text-[#6C7275]'>
                            {item.productItemID.variants.map((variant: any, id: number) => (
                              <span key={id}>
                                {variant.variant}: {variant.value}
                              </span>
                            ))}
                          </p>
                          <div className='w-20 justify-center flex items-center border border-black rounded-lg py-1.5'>
                            <button
                              onClick={() =>
                                decreaseQuantity({
                                  productId: item.productID._id,
                                  productItemId: item.productItemID._id
                                })
                              }
                            >
                              <Minus className='h-4 w-4' strokeWidth={1} />
                            </button>
                            <span className='mx-3'>{item.quantity}</span>
                            <button
                              onClick={() =>
                                increaseQuantity({
                                  productId: item.productID._id,
                                  productItemId: item.productItemID._id
                                })
                              }
                            >
                              <Plus className='h-4 w-4' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className='text-sm font-semibold mt-2'>{item.productItemID.price}</p>
                    </div>
                    <Separator />
                  </div>
                ))}
            </div>
            <Form {...form}>
              <form className='flex gap-x-3 mt-2' action='' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='coupon'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type='text' {...field} placeholder={t('coupon')} />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <Button type='submit'>{t('button')}</Button>
              </form>
            </Form>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-x-2'>
                <TicketPercent size={24} />
                <p>JenkateMW</p>
              </div>
              <p className='text-[#38CB89] font-semibold'>
                -$25.00 <span className='hidden sm:inline-block'>{t('remove')}</span>
              </p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-x-2'>
                <p>{t('shipping')}</p>
              </div>
              <p className='font-semibold'>{t('free')}</p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-x-2'>
                <p>{t('subtotal')}</p>
              </div>
              <p className='font-semibold'>${amount}.00</p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-x-2'>
                <p className='font-medium text-xl'>{t('total')}</p>
              </div>
              <p className='text-xl font-medium'>${amount}.00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderSummary
