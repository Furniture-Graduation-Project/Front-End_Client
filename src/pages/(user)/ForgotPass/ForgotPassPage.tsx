import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string()
})

const ForgotPassPage = () => {
  const [open, setOpen] = useState(false)
  const { mutate } = useAccountMutation({ action: 'SEND_OTP' })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      mutate({ ...values, _id: '', password: '' })
      form.reset()
      setOpen(false)
    } catch (error) {
      console.log(error)
      setOpen(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type='button' className='float-left p-0 text-[#4BA9FE]' variant={'link'} onClick={() => setOpen(!open)}>
          Bạn quên mật khẩu ư ?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn quên mật khẩu ?</DialogTitle>
          <DialogDescription className='py-3'>
            Đừng lo lắng, chúng tôi sẽ giúp bạn khôi phục mật khẩu của mình
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit(onSubmit)(e)
              }}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' type='email' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPassPage
