import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import * as z from 'zod'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { useToast } from '@/hooks/use-toast'
import { useTranslate } from '@/hooks/useTranslate'

const AccountOrderAddress = ({ order }: any) => {
  const { mutate, isSuccess } = useOrderMutation({ action: 'UPDATE' })
  const { t } = useTranslate('account.order.address')
  const { toast } = useToast()
  const [isDialogOpen, setDialogOpen] = useState(false)

  const AddressSchema = z.object({
    orderName: z.string().min(1, {
      message: t('validation.orderNameRequired')
    }),
    orderPhone: z
      .string()
      .regex(/^\d{10,11}$/, {
        message: t('validation.orderPhoneInvalid')
      })
      .min(1, {
        message: t('validation.orderPhoneRequired')
      }),
    orderAddress: z.string().min(1, {
      message: t('validation.orderAddressRequired')
    })
  })
  type AddressFormData = z.infer<typeof AddressSchema>
  const form = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      orderName: '',
      orderPhone: '',
      orderAddress: ''
    }
  })

  const onSubmit = (data: AddressFormData) => {
    const newAddress = {
      _id: order.data._id,
      orderName: data.orderName,
      orderPhone: data.orderPhone,
      orderAddress: data.orderAddress
    }
    mutate(newAddress)
  }

  useEffect(() => {
    if (order?.data) {
      form.reset({
        orderName: order.data.orderName || '',
        orderPhone: order.data.orderPhone || '',
        orderAddress: order.data.orderAddress || ''
      })
    }
  }, [order, form])

  useEffect(() => {
    if (isSuccess) {
      setDialogOpen(false)
      toast({
        title: t('successTitle'),
        description: t('successDescription'),
        variant: 'success'
      })
    }
  }, [isSuccess, toast])

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-bold'>{t('addressTitle')}</h2>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div className='flex items-center gap-4 cursor-pointer'>
              <div className='text-lg font-semibold'>
                <MapPin />
              </div>
              <div>
                <h3 className='font-bold'>{order?.data.orderName}</h3>
                <p className='text-sm text-gray-600'>
                  {order?.data.orderPhone} - {order?.data.orderAddress}
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{t('editAddressTitle')}</DialogTitle>
              <DialogDescription>{t('editAddressDescription')}</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
                <FormField
                  control={form.control}
                  name='orderName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('orderNameLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('orderNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='orderPhone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('orderPhoneLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('orderPhonePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='orderAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('orderAddressLabel')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('orderAddressPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    disabled={
                      order?.data.status != 'confirmed' &&
                      order?.data.status != 'pending' &&
                      order?.data.status != 'cancelled'
                    }
                    type='submit'
                  >
                    {t('saveButton')}
                  </Button>
                  <Button variant='secondary' onClick={() => setDialogOpen(false)} type='button'>
                    {t('cancelButton')}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default AccountOrderAddress
