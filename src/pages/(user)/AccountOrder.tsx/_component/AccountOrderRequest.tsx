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

const returnRequestSchema = z.object({
  selectedProducts: z
    .array(
      z.object({
        productOptionId: z.string(),
        quantity: z.number().min(0, 'Quantity must be at least 0.')
      })
    )
    .min(1, 'Select at least one product to return.'),
  reason: z.string().min(10, 'Reason must be at least 10 characters long.')
})

type ReturnRequestForm = z.infer<typeof returnRequestSchema>

const AccountOrderRequest = () => {
  const { id } = useParams()
  const { data } = useSingleOrderQuery(id || '')
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
          productOptionId: item.productOptionId?._id || '',
          quantity: 0
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
      alert('Your return request has been submitted!')
    }
  }

  useEffect(() => {
    if (selectedProducts) {
      console.log('Updated selected products:', selectedProducts)
    }
  }, [selectedProducts])
  if (data?.data.returnInfo) {
    return (
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Existing Return Request</h1>
        <div>
          <p>
            <strong>Reason for Return:</strong> {data.data.returnInfo.reason}
          </p>
          <p>
            <strong>Items to Return:</strong>
          </p>
          <ul>
            {data.data.returnInfo.items.map((item: any, index: number) => (
              <li key={index}>
                {item.productId?.name} - {item.quantity} x {item.unitPrice}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Tạo yêu cầu hoàn trả </h1>
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
                    <p>Số lượng mua: {item.quantity}</p>
                    <FormField
                      name={`selectedProducts.${index}.quantity`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>
                            {t('lastName')}
                          </FormLabel>
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
