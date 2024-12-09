/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useTranslate } from '@/hooks/useTranslate'
import { IOrderItem } from '@/interface/order'
import { formatCurrency } from '@/utils/formatCurrency'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX, TicketPercent } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  coupon: z.string().optional()
})
const OrderSummary = ({
  amount,
  dataCart,
  isLoading,
  errorOrder,
  setState,
  setErrorOrder,
  setStateErrorOrder
}: {
  amount: number
  dataCart: any
  isLoading: boolean
  errorOrder: any
  setState: (value: any) => void
  setErrorOrder: (value: any) => void
  setStateErrorOrder: (value: boolean) => void
}) => {
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
  const getErrorOrder = (obj1: any, obj2: IOrderItem) => {
    if (obj1.productId._id !== obj2.productId) {
      setStateErrorOrder(true)
      return t('product_not_available')
    }
    if (obj1.productId.status !== 'available') {
      setStateErrorOrder(true)
      return t('product_not_available')
    }
    if (obj1.productOptionId._id !== obj2.productOptionId) {
      setStateErrorOrder(true)
      return t('product_not_available')
    }
    if (obj1.quantity > obj2.quantity) {
      setStateErrorOrder(true)
      return t('insufficient_quantity')
    }
    if (obj1.unitPrice !== obj2.unitPrice) {
      setStateErrorOrder(true)
      return t('price_changed')
    }
    return false
  }

  const handleRemoveItem = (index: number) => {
    const newStateOrder = JSON.parse(dataCart).filter((_item: any, i: number) => i !== index)
    const newErrorOrder = errorOrder.filter((_item: any, i: number) => i !== index)
    setErrorOrder(newErrorOrder)
    setState(JSON.stringify(newStateOrder))
    for (let index = 0; index < dataCart.length; index++) {
      const check = getErrorOrder(newStateOrder[index], newErrorOrder[index])
      if (check) {
        return
      }
      setStateErrorOrder(false)
    }
  }
  const hanldeUpdatePrice = (i: number) => {
    const newStateOrder = JSON.parse(dataCart).map((item: any, index: number) => {
      if (index === i) {
        console.log(item)

        return {
          ...item,
          unitPrice: errorOrder[i].unitPrice
        }
      }
      return item
    })
    setState(JSON.stringify(newStateOrder))
  }
  return (
    <div className='sticky top-32'>
      <div className='border border-black py-4 px-6 rounded-md'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='text-[28px] font-semibold'>{t('title')}</h1>
          <div className='flex flex-col gap-5'>
            {isLoading || !dataCart || !errorOrder ? (
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
              JSON.parse(dataCart).map((item: any, i: number) => {
                const checkError = getErrorOrder(item, errorOrder[i])
                return (
                  <div key={i} className='relative'>
                    <div
                      className={`w-full h-full absolute top-0 left-0 bg-neutral-4/50 rounded-sm flex-col gap-y-3 justify-center items-center ${checkError ? 'flex' : 'hidden'}`}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            onClick={() => handleRemoveItem(i)}
                            className='bg-neutral-1 flex gap-2 items-center px-3 py-2 rounded-sm'
                          >
                            {checkError}

                            <CircleX />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t('remove_product')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        onClick={() => hanldeUpdatePrice(i)}
                        className={item.unitPrice !== errorOrder[i].unitPrice ? 'block' : 'hidden'}
                      >
                        {t('update_price')}
                      </Button>
                    </div>
                    <div className='flex justify-between py-6 px-3'>
                      <div className='flex gap-4'>
                        <img src={item.productOptionId.image} alt={item.productOptionId.sku} className='w-24 h-28' />
                        <div className='flex flex-col gap-y-2 justify-center'>
                          <h1 className='font-semibold text-[14px]'>{item.productId.name}</h1>
                          <div className='text-[12px] text-[#6C7275] flex flex-col gap-1'>
                            {item.productOptionId.variants.map((variant: any, id: number) => (
                              <span key={id}>
                                {variant.variant}: {variant.value}
                              </span>
                            ))}
                          </div>
                          <div className='inline-flex'>
                            <p className='text-[12px]'>
                              {t('quantity')} :<span className='mx-3'>{item.quantity}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className='text-sm font-semibold mt-2'>{formatCurrency(item.unitPrice)}</p>
                    </div>
                    <Separator />
                  </div>
                )
              })
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
            <p className='font-semibold'>{formatCurrency(amount)}</p>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-x-2'>
              <p className='font-medium text-xl'>{t('total')}</p>
            </div>
            <p className='text-xl font-medium'>{formatCurrency(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
