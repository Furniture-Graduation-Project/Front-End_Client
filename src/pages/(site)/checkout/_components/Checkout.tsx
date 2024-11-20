import { motion } from 'framer-motion'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useLocation } from 'react-router-dom'

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
}

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState, removeState] = useSessionStorage('stateOrder', null)
  const [amount, setAmount] = useState<number>(0)
  const location = useLocation()
  useEffect(() => {
    if (state) {
      setAmount(JSON.parse(state).reduce((acc: any, item: any) => acc + item.price * item.quantity, 0))
      setIsLoading(false)
    }
  }, [state])
  useEffect(() => {
    if (location.pathname !== '/checkout') {
      removeState()
    }
  }, [location])

  return (
    <div className='flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-7 gap-x-16 my-20'>
      <motion.div className='lg:col-span-4' initial='hidden' animate='visible' variants={slideInLeft}>
        <CheckoutForm amount={amount} dataCart={state} isLoading={isLoading} />
      </motion.div>
      <motion.div className='lg:col-span-3' initial='hidden' animate='visible' variants={slideInRight}>
        <OrderSummary amount={amount} dataCart={state} isLoading={isLoading} />
      </motion.div>
      <Toaster />
    </div>
  )
}

export default Checkout
