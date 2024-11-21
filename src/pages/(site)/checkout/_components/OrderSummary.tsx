import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useTranslate } from '@/hooks/useTranslate'
import { zodResolver } from '@hookform/resolvers/zod'
import { TicketPercent } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  coupon: z.string().optional()
})

const OrderSummary = ({ amount, dataCart, isLoading }: { amount: number; dataCart: any; isLoading: boolean }) => {
  const { t } = useTranslate('checkout.order')
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
    <div className='sticky top-10'>
      <div className='border border-black py-4 px-6 rounded-md'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='text-[28px] font-semibold'>{t('title')}</h1>
          <div className='flex flex-col'>
            {isLoading || !dataCart ? (
              <div className='flex justify-between py-7'>
                <div className='flex gap-4'>
                  <Skeleton className='w-24 h-28' />
                  <div className='flex flex-col gap-y-2 justify-center'>
                    <Skeleton className='w-32 h-5' />
                    <Skeleton className='w-20 h-4' />
                    <Skeleton className='w-16 h-6' />
                  </div>
                </div>
                <Skeleton className='w-12 h-5' />
              </div>
            ) : (
              JSON.parse(dataCart).map((item: any, i: number) => (
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
                        <div className='inline-flex'>
                          <p className='text-[12px]'>
                            {t('quantity')} :<span className='mx-3'>{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className='text-sm font-semibold mt-2'>{item.productItemID.price}</p>
                  </div>
                  <Separator />
                </div>
              ))
            )}
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
              <p>Không có</p>
            </div>
            <p className='text-[#38CB89] font-semibold'>
              -0% <span className='hidden sm:inline-block'>{t('remove')}</span>
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
            <p className='font-semibold'>{amount} Vnd</p>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-x-2'>
              <p className='font-medium text-xl'>{t('total')}</p>
            </div>
            <p className='text-xl font-medium'>{amount} Vnd</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
