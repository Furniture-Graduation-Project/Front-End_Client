import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, DollarSign } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/classUtils'
import { useTranslate } from '@/hooks/useTranslate'

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().min(1),
  street: z.string(),
  country: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  payment: z.enum(['credit', 'paypal', '']),
  cardNumber: z.string(),
  expirationDate: z.string(),
  cvc: z.string()
})

const CheckoutForm = () => {
  const { t } = useTranslate('checkout.form')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      street: '',
      country: '',
      city: '',
      state: '',
      zip: '',
      payment: '',
      cardNumber: '',
      expirationDate: '',
      cvc: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }
  return (
    <>
      <Form {...form}>
        <form action='' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='gap-y-6 flex flex-col'>
            <div className='px-6 py-10 border rounded-md flex flex-col gap-y-6 border-black'>
              <h1 className='font-medium text-xl'>{t('title1')}</h1>
              <div className='grid grid-cols-2 gap-x-6'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(`uppercase text-[#6C7275] font-bold text-[12px]`)}>
                        {t('firstName')}
                      </FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder={t('firstName')} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('lastName')}</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder={t('lastName')} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('phone')}</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} placeholder={t('phone')} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('email')}</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} placeholder={t('emailPlaceholder')} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className='px-6 py-10 border border-black rounded-md flex flex-col gap-y-6'>
              <h1 className='font-medium text-xl'>{t('title2')}</h1>
              <FormField
                control={form.control}
                name='street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('street')}</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} placeholder={t('street')} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('country')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className='placeholder-gray-400' placeholder='Country' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='VietNam'>Việt Nam</SelectItem>
                        <SelectItem value='USA'>USA</SelectItem>
                        <SelectItem value='Thailand'>Thái Lan</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('city')}</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} placeholder={t('city')} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div className='grid grid-cols-2 gap-x-6'>
                <FormField
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('state')}</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder={t('state')} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name='zip'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('zip')}</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder={t('zip')} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className='flex gap-x-3 items-center'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {t('checkbox')}
                </label>
              </div>
            </div>
            <div className='px-6 py-10 border border-black rounded-md flex flex-col gap-y-6'>
              <h1 className='font-medium text-xl'>{t('title3')}</h1>
              <FormField
                control={form.control}
                name='payment'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col'>
                        <FormItem
                          className={`flex border items-center justify-between space-y-0 border-black py-3 px-4 rounded-md`}
                        >
                          <div className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='credit' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('paymentMethod1')}</FormLabel>
                          </div>

                          <p className='text-right'>
                            <CreditCard size={24} strokeWidth={1.2} />
                          </p>
                        </FormItem>
                        <FormItem className='flex border items-center justify-between space-y-0 border-black py-3 px-4 rounded-md'>
                          <div className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='paypal' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('paymentMethod2')}</FormLabel>
                          </div>
                          <p className='text-right'>
                            <DollarSign size={24} strokeWidth={1.3} />
                          </p>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name='cardNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('cardNumber')}</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} placeholder={t('cardNumberPlaceholder')} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div className='grid grid-cols-2 gap-x-6'>
                <FormField
                  control={form.control}
                  name='expirationDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('date')}</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} placeholder={t('date')} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name='cvc'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('cvc')}</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} placeholder={t('cvcPlaceholder')} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
            <Button variant={'default'} className='bg-black py-6' type='submit'>
              {t('submit')}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CheckoutForm
