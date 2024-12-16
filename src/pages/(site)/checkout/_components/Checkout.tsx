/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster } from '@/components/ui/toaster'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import useSessionStorage from '@/hooks/useSessionStorage'
import { IOrderItem } from '@/interface/order'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CheckoutFormTest from './CheckoutFormA'
import OrderSummary from './OrderSummary'

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
  const [errorOrder, setErrorOrder] = useState<IOrderItem[]>()
  const [stateErrorOrder, setStateErrorOrder] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)
  const location = useLocation()
  const { mutate, isSuccess, data } = useOrderMutation({ action: 'CHECK' })
  useEffect(() => {
    if (state) {
      setAmount(
        JSON.parse(state)
          .reduce((acc: any, item: any) => acc + item.unitPrice * item.quantity, 0)
          .toFixed(3)
      )
      const itemsCartData: IOrderItem[] = JSON.parse(state).map((item: any) => {
        return {
          productId: item.productId._id,
          productOptionId: item.productOptionId._id,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        }
      })
      mutate(itemsCartData)
      setIsLoading(false)
    }
  }, [state])
  useEffect(() => {
    if (location.pathname !== '/checkout') {
      removeState()
    }
  }, [location])

  useEffect(() => {
    if (isSuccess) {
      setErrorOrder(data.data.data as IOrderItem[])
    }
  }, [isSuccess])

  return (
    <div className='flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-7 gap-x-16 my-20'>
      <motion.div className='lg:col-span-4' initial='hidden' animate='visible' variants={slideInLeft}>
        {/* <CheckoutForm
          amount={amount}
          dataCart={state}
          isLoading={isLoading}
          setErrorOrder={setErrorOrder}
          stateErrorOrder={stateErrorOrder}
        /> */}
        <CheckoutFormTest
          amount={amount}
          dataCart={state}
          isLoading={isLoading}
          setErrorOrder={setErrorOrder}
          stateErrorOrder={stateErrorOrder}
        />
      </motion.div>
      <motion.div className='lg:col-span-3' initial='hidden' animate='visible' variants={slideInRight}>
        <OrderSummary
          amount={amount}
          dataCart={state}
          isLoading={isLoading}
          errorOrder={errorOrder}
          setState={setState}
          setErrorOrder={setErrorOrder}
          setStateErrorOrder={setStateErrorOrder}
        />
      </motion.div>
      <Toaster />
    </div>
  )
}

export default Checkout
