import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  password: z.string().min(9, {
    message: 'Password must be at least 9 characters.'
  })
})

export default function SignIn() {
  const { onSubmit: handleSubmit, isPending } = useAccountMutation({
    action: 'SIGNIN'
  })

  const { t } = useTranslate('signin')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    handleSubmit(data)
  }

  return (
    <div className='py-4 px-6 sm:px-12 lg:px-24 xl:px-32 sm:h-full flex flex-col justify-center text-neutral-4 space-y-6'>
      <h1 className='headline-7 sm:headline-6 lg:headline-5 xl:headline-4 text-black'>{t('title', 'Sign In')}</h1>
      <div className='flex sm:block lg:flex space-x-1 mb-3 sm:mb-6 body-2'>
        <span className='font-normal'>{t('noAccount', "Don't have an account yet?")}</span>
        <div>
          <Link to='/signup' className='body-2-semi text-green'>
            {t('signup', 'Sign Up')}
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            name='email'
            render={({ field }) => (
              <FormItem>
                <Input
                  disabled={isPending}
                  className='text-black flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                  placeholder={t('emailPlaceholder', 'Email address')}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                <Input
                  disabled={isPending}
                  className='flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('passwordPlaceholder', 'Password')}
                  {...field}
                />
                <button
                  type='button'
                  className='absolute right-3 top-[30%] -translate-y-1/2'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between sm:block lg:flex items-center mb-6 '>
            <div className='flex items-center lg:mb-0 space-x-2'>
              <Checkbox id='remember' />
              <label htmlFor='remember' className='body-2'>
                {t('remember', 'Remember me')}
              </label>
            </div>
            <a href='forgot' className='body-2-semi text-black'>
              {t('forgotPassword', 'Forgot password?')}
            </a>
          </div>
          <Button disabled={isPending} typeof='submit' type='submit' className='w-full'>
            {t('signinButton', 'Sign In')}
          </Button>
        </form>
      </Form>

      <div className='flex flex-col space-y-4'>
        <Button
          variant='outline'
          className='w-full flex items-center justify-center space-x-2'
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
          }}
        >
          <img src='/public/google-logo.webp' alt='logo-auth' className='w-5 h-5' />
          <span>{t('googleSignIn', 'Sign in with Google')}</span>
        </Button>

        <Button
          variant='outline'
          className='w-full flex items-center justify-center space-x-2'
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`
          }}
        >
          <img src='/public/logo-fb.svg' alt='logo-auth' className='w-5 h-5' />
          <span>{t('facebookSignIn', 'Sign in with Facebook')}</span>
        </Button>
      </div>
    </div>
  )
}
