import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  message: z.string().min(1)
})

type ContactFormValue = z.infer<typeof formSchema>

const FormContact = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = async (data: ContactFormValue) => {
    try {
      setLoading(true)
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-10 mb-20'>
      <div className='lg:grid lg:grid-cols-2 gap-y-8 gap-x-8 flex flex-col-reverse'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Your Name' />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Your Email' />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea className='h-[140px]' {...field} placeholder='Your Message' />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <Button type='submit' className='mt-4 sm:px-0 px-8' disabled={loading}>
              Send Message
            </Button>
          </form>
        </Form>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.9366278699079!2d105.74659993861327!3d21.0377567709379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1719283092673!5m2!1svi!2s'
          width='lg:600 '
          height='400'
          loading='lazy'
          className='rounded-lg w-full'
        ></iframe>
      </div>
    </div>
  )
}

export default FormContact
