import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslate } from '@/hooks/useTranslate'

const FormSchema = z.object({
  yourname: z.string().min(3, {
    message: 'Yourname must be at least 3 characters.'
  }),
  username: z.string().min(9, {
    message: 'Username must be at least 9 characters.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  password: z.string().min(9, {
    message: 'Password must be at least 9 characters.'
  }),
  remember: z.boolean()
})

const SignUp = () => {
  const { t } = useTranslate('signup')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      yourname: '',
      username: '',
      email: '',
      password: '',
      remember: false
    }
  })
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='py-4 px-6 sm:px-12 lg:px-24 xl:px-32 sm:h-full flex flex-col justify-center text-neutral-4 space-y-6'>
      <h1 className='headline-7 sm:headline-6 lg:headline-5 xl:headline-4 text-black'>{t('title', 'Sign Up')}</h1>
      <div className='flex sm:block lg:flex space-x-1 mb-3 sm:mb-6 body-2'>
        <span className='font-normal'>{t('alreadyAccount', 'Already have an account?')}</span>
        <div>
          <Link to='/signin' className='body-2-semi text-green'>
            {t('signin', 'Sign In')}
          </Link>
        </div>
      </div>
      <Form {...form}>
        <FormField
          name='yourname'
          render={({ field }) => (
            <FormItem>
              <Input
                className='text-black flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                placeholder={t('yournamePlaceholder', 'Your name')}
                {...field}
              />
              <FormMessage>{form.formState.errors.yourname?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='email'
          render={({ field }) => (
            <FormItem>
              <Input
                className='text-black flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                placeholder={t('emailPlaceholder', 'Your email address')}
                {...field}
              />
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <Input
                className='text-black flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                placeholder={t('usernamePlaceholder', 'Your username')}
                {...field}
              />
              <FormMessage>{form.formState.errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <Input
                className='flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder', 'Password')}
                {...field}
              />
              <button className='absolute right-3 top-[30%] -translate-y-1/2' onClick={togglePasswordVisibility}>
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />
        <div className='mb-6'>
          <div className='flex leading-none lg:mb-0 space-x-2'>
            <Checkbox className='mt-[1px] sm:mt-[4px]' id='remember' {...form.register('remember')} />
            <label htmlFor='remember' className='caption-2 sm:body-2'>
              {t('privacyPolicy', 'I agree with ')}
              &nbsp;
              <span className='text-black caption-2-semi sm:body-2-semi'>
                {t('privacyPolicyLink', 'Privacy Policy')}
              </span>
              &nbsp;
              {t('andTermsOfUse', ' and ')}
              &nbsp;
              <span className='text-black caption-2-semi sm:body-2-semi'>{t('termsOfUseLink', 'Terms of Use')}</span>
            </label>
          </div>
        </div>
        <Button typeof='submit' variant='auth' size='auth' type='submit'>
          {t('signupButton', 'Sign Up')}
        </Button>
      </Form>
    </div>
  )
}

export default SignUp
