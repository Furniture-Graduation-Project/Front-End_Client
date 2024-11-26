import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useTranslate } from '@/hooks/useTranslate'
import { IApiResponse } from '@/interface/apiRespose'
import { ICart } from '@/interface/cart'
import { cn } from '@/utils/classUtils'
import { formatCurrency } from '@/utils/formatCurrency'
import { zodResolver } from '@hookform/resolvers/zod'
import { TicketPercent } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

const FormSchema = z.object({
  type: z.enum(['free', 'express', 'pickup'], {
    required_error: 'You need to select a notification type.'
  })
})

const CartForm = ({ amount, cartData }: { amount: number; cartData: IApiResponse<ICart> }) => {
  const [state, setState] = useSessionStorage('stateOrder', null)
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'free'
    }
  })
  const [selected, setSelected] = useState('')
  const { t } = useTranslate('cart.cartForm')
  function onSubmit() {
    if (cartData && cartData.data && cartData.data.carts && cartData.data.carts.length > 0) {
      setState(JSON.stringify(cartData.data.carts))
      console.log(state)
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
    <>
      <div className='lg:sticky lg:top-28'>
        <div className=''>
          <h1 className='text-xl font-medium'>{t('coupon')}</h1>
          <p className='text-[#6C7275]'>{t('couponText')}</p>
          <form action='' className='mt-4'>
            <div className='flex py-2 px-6  border border-[#6C7275] justify-between rounded-sm w-full'>
              <div className='flex'>
                <TicketPercent className='mr-2 text-[#6C7275]' size={24} />
                <input type='text' className='focus:outline-none w-24 sm:w-auto' placeholder={t('couponPlaceholder')} />
              </div>
              <button className='font-medium' type='submit'>
                {t('action')}
              </button>
            </div>
          </form>
        </div>
        <div className='p-6 border rounded-md border-black mt-4'>
          <h1 className='mb-4 text-xl font-medium'>{t('title')}</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col'>
                        <FormItem
                          className={cn(
                            `flex border items-center justify-between space-y-0 border-black py-3 px-4 rounded-md transition duration-200 ease-in-out transform`,
                            selected === 'free' && 'bg-neutral-2-100'
                          )}
                        >
                          <div className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem disabled onClick={() => setSelected('free')} value='free' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('select1')}</FormLabel>
                          </div>
                          <p className='text-right'>{formatCurrency(0)}</p>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <div className='flex justify-between items-center mt-4 py-3'>
                      <h1>{t('subtotal')}</h1>
                      <h1 className='font-semibold'>{formatCurrency(amount)}</h1>
                    </div>
                    <Separator />
                    <div className='flex justify-between items-center py-3'>
                      <h1 className='text-xl font-semibold'>{t('total')}</h1>
                      <h1 className='text-xl font-semibold'>{formatCurrency(amount)}</h1>
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full py-6 text-[18px]' disabled={!cartData?.data?.carts}>
                {t('checkout')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CartForm
