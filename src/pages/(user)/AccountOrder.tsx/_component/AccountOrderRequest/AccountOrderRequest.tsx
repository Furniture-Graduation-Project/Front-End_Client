import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useSingleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useTranslate } from '@/hooks/useTranslate'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { Skeleton } from '@/components/ui/skeleton'
import AccountOrderRequestInfo from './AccountOrderRequestInfo'
import useContactMutation from '@/hooks/mutations/useContactMutation'
import { IContact } from '@/interface/contact'
import { useAuthContext } from '@/context/AuthContext'
const returnRequestSchema = z.object({
  selectedProducts: z
    .array(
      z.object({
        productId: z.string(),
        productOptionId: z.string(),
        quantity: z.number().min(0, 'Quantity must be at least 0.'),
        unitPrice: z.number().min(0, 'UnitPrice must be at least 0.')
      })
    )
    .min(1, 'Select at least one product to return.'),
  reason: z.string().min(10, 'Reason must be at least 10 characters long.')
})

type ReturnRequestForm = z.infer<typeof returnRequestSchema>

const AccountOrderRequest = () => {
  const { user } = useAuthContext()
  const { id } = useParams()
  const { data, isLoading } = useSingleOrderQuery(id || '')
  const { mutate: sendMail } = useContactMutation()
  const { t } = useTranslate('account.order.request')
  const { mutate } = useOrderMutation({ action: 'UPDATE' })

  const form = useForm<ReturnRequestForm>({
    resolver: zodResolver(returnRequestSchema),
    defaultValues: {
      selectedProducts: [],
      reason: ''
    }
  })

  const selectedProducts = form.watch('selectedProducts')

  useEffect(() => {
    if (data?.data?.items) {
      form.reset({
        selectedProducts: data.data.items.map((item: any) => ({
          productId: item.productId?._id || '',
          productOptionId: item.productOptionId?._id || '',
          quantity: 0,
          unitPrice: item.unitPrice
        })),
        reason: ''
      })
    }
  }, [data, form])

  const onSubmit = (dataForm: ReturnRequestForm) => {
    if (data?.data._id) {
      console.log('Form data submitted:', data)
      const returnData = dataForm.selectedProducts.filter((item) => item.quantity > 0 && item.productOptionId)
      console.log('Return Request Data: ', returnData)
      mutate({
        _id: data?.data._id,
        returnInfo: {
          reason: dataForm.reason,
          items: returnData
        }
      })
      const newContact: IContact = {
        email: import.meta.env.VITE_EMAIL_NAME,
        subject: 'Yêu cầu hoàn đơn hàng từ khách hàng : ' + user?.name,
        text:
          'Email khách hàng : ' +
          user?.email +
          '\n' +
          'Số điên thoại khách hàng : ' +
          user?.phone +
          '\n' +
          'Lý do hoàn đơn : ' +
          dataForm.reason +
          'Mã đơn hàng : ' +
          data.data._id
      }
      sendMail(newContact)
      alert('Your return request has been submitted!')
    }
  }

  useEffect(() => {
    if (selectedProducts) {
      console.log('Updated selected products:', selectedProducts)
    }
  }, [selectedProducts])
  if (isLoading) {
    return (
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>
          <Skeleton className='h-6 w-48' />
        </h1>
        <div className='space-y-4'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='flex items-center space-x-4'>
              <Skeleton className='w-24 h-24' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (data?.data.returnInfo && data?.data.returnInfo?.items.length > 0) {
    return <AccountOrderRequestInfo data={data} />
  }
  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Tạo yêu cầu hoàn trả </h1>
      <p className='mb-4'>Yêu cầu hoàn trả sẽ chỉ được thực hiện tối đa sau 7 ngày kể từ ngày giao hàng</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            {data?.data.items && data.data.items.length > 0 ? (
              data.data.items.map((item: any, index: number) => (
                <div key={index} className='flex items-center'>
                  <img
                    src={item.productOptionId?.image || ''}
                    alt={item.productId?.name}
                    className='w-24 h-24 object-cover'
                  />
                  <div className='ml-4'>
                    <h3>Tên sản phẩm: {item.productId?.name}</h3>
                    <div className='text-[12px] text-[#6C7275]'>
                      {item.productOptionId?.variants &&
                        item.productOptionId.variants.map((variant: any, id: number) => (
                          <h4 className='whitespace-nowrap' key={id}>
                            {variant.variant}: {variant.value}
                          </h4>
                        ))}
                    </div>
                    <p>Số lượng mua: {item.quantity}</p>
                    <FormField
                      name={`selectedProducts.${index}.quantity`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              min={0}
                              max={item.quantity}
                              type='number'
                              {...field}
                              value={field.value || 0}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value))
                              }}
                              placeholder={t('Số lượng')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>{t('emptyOrder')}</p>
            )}
          </div>

          <FormField
            name='reason'
            control={form.control}
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Reason for Return</FormLabel>
                <FormControl>
                  <Textarea placeholder='Enter your reason for returning these products...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-6 w-full'>
            Submit Return Request
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AccountOrderRequest
