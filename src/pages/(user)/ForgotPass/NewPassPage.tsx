import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { IUser } from '@/interface/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const formSchema = z
  .object({
    newPassword: z.string().min(9),
    confirmPassword: z.string().min(9)
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword === data.confirmPassword
      }
      return true
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword']
    }
  )

export default function NewPassPage() {
  const { mutate } = useAccountMutation({ action: 'CHANGE_PASS' })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const user: IUser = {
        _id: '',
        password: values.newPassword,
        ...values
      }
      mutate(user)
      toast.success('Password changed successfully!')
    } catch (error) {
      toast.error('Failed to change password!')
      console.error(error)
    }
  }

  return (
    <div className='py-4 px-6 sm:px-12 lg:px-24 xl:px-32 sm:h-full flex flex-col justify-center space-y-6'>
      <h2 className='font-bold text-3xl'>Thay đổi mật khẩu</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 '>
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Placeholder' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Placeholder' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
