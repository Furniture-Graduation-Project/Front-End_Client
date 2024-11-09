import { motion } from 'framer-motion'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { useTranslate } from '@/hooks/useTranslate'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useLocation, useNavigate } from 'react-router-dom'

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
}

const Checkout = () => {
  const { t } = useTranslate('checkout.toast')
  const [state, setState, removeState] = useSessionStorage('stateOrder', null)
  const [amount, setAmount] = useState<number>(0)
  const { toast } = useToast()
  const location = useLocation()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axiosInstance.get(`cart/652bc4e5a2f2b8123e9d4567`)
      console.log(response.data.data.carts)
      setState(response.data.data.carts)
      setAmount(response.data.data.carts.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0))
      return response.data
    }
  })
  useEffect(() => {
    if (isError) {
      const date = new Date()
      toast({
        title: t('errorTitle'),
        description: date.toDateString(),
        action: (
          <ToastAction onClick={() => refetch()} altText={t('retryAltText')}>
            {t('retryAction')}
          </ToastAction>
        )
      })
    }
  }, [data, isError])
  useEffect(() => {
    return () => {
      removeState()
    }
  }, [location])
  return (
    <div className='flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-7 gap-x-16 my-20'>
      <motion.div className='lg:col-span-4' initial='hidden' animate='visible' variants={slideInLeft}>
        <CheckoutForm amount={amount} dataCart={state} />
      </motion.div>
      <motion.div className='lg:col-span-3' initial='hidden' animate='visible' variants={slideInRight}>
        <OrderSummary amount={amount} dataCart={state} isLoading={isLoading} />
      </motion.div>
      <Toaster />
    </div>
  )
}

export default Checkout
