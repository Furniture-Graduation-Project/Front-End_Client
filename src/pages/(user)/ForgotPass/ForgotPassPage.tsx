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
import { useAuthContext } from '@/context/AuthContext'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string()
})

interface IForgotPass {
  socialMediaAccount?: boolean
}

const ForgotPassPage = ({ socialMediaAccount }: IForgotPass) => {
  const { user } = useAuthContext()
  const [open, setOpen] = useState(false)

  const { t } = useTranslate('account.forgotPassword')

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

  useEffect(() => {
    if (user) {
      form.setValue('email', user?.email ?? '')
    }
  }, [user, form])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type='button' className='float-left p-0 text-[#4BA9FE]' variant={'link'} onClick={() => setOpen(!open)}>
          {socialMediaAccount ? t('title2') : t('title')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('subTitle')}</DialogTitle>
          <DialogDescription className='py-3'>{t('description')}</DialogDescription>
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
                      <Input placeholder='Email' type='email' {...field} disabled={user ? true : false} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>{t('submit')}</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPassPage
