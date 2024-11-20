import { motion } from 'framer-motion'
import CartForm from './CartForm'
import CartTable from './CartTable'
import { useState } from 'react'
import { useCartQuery } from '@/hooks/queries/useCartQuery'
import { useAuthContext } from '@/context/AuthContext'

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
}

const Cart = () => {
  const { user } = useAuthContext()
  const { data, isLoading, isError } = useCartQuery(user?._id || '')
  const [amount, setAmount] = useState<number>(0)
  return (
    <div className='my-20'>
      <div className='lg:grid lg:grid-cols-5 xl:grid-cols-3 gap-x-16'>
        <motion.div className='xl:col-span-2 lg:col-span-3' initial='hidden' animate='visible' variants={slideInLeft}>
          <CartTable setAmount={setAmount} cartData={data} isLoading={isLoading} isError={isError} />
        </motion.div>
        <motion.div
          className='mt-6 lg:mt-0 xl:col-span-1 lg:col-span-2'
          initial='hidden'
          animate='visible'
          variants={slideInRight}
        >
          <CartForm amount={amount} cartData={data} />
        </motion.div>
      </div>
    </div>
  )
}

export default Cart
