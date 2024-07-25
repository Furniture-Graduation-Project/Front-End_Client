import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { useTranslate } from '@/hooks/useTranslate'
import { cn } from '@/utils/classUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { TicketPercent } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  type: z.enum(['free', 'express', 'pickup'], {
    required_error: 'You need to select a notification type.'
  })
})

const CartForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const [selected, setSelected] = useState('')

  const { t } = useTranslate('cart.cartForm')

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
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
                              <RadioGroupItem onClick={() => setSelected('free')} value='free' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('select1')}</FormLabel>
                          </div>
                          <p className='text-right'>$0.00</p>
                        </FormItem>
                        <FormItem
                          className={cn(
                            `flex border items-center justify-between space-y-0 border-black py-3 px-4 rounded-md transition duration-200 ease-in-out transform`,
                            selected === 'express' && 'bg-neutral-2-100'
                          )}
                        >
                          <div className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem onClick={() => setSelected('express')} value='express' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('select2')}</FormLabel>
                          </div>
                          <p className='text-right'>$0.00</p>
                        </FormItem>
                        <FormItem
                          className={cn(
                            `flex border items-center justify-between space-y-0 border-black py-3 px-4 rounded-md transition duration-200 ease-in-out transform`,
                            selected === 'pickup' && 'bg-neutral-2-100'
                          )}
                        >
                          <div className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem onClick={() => setSelected('pickup')} value='pickup' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('select3')}</FormLabel>
                          </div>
                          <p className='text-right'>$0.00</p>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <div className='flex justify-between items-center mt-4 py-3'>
                      <h1>{t('subtotal')}</h1>
                      <h1 className='font-semibold'>$1234</h1>
                    </div>
                    <Separator />
                    <div className='flex justify-between items-center py-3'>
                      <h1 className='text-xl font-semibold'>{t('total')}</h1>
                      <h1 className='text-xl font-semibold'>$1234</h1>
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full py-6 text-[18px]'>
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
