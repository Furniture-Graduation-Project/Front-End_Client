import { motion } from 'framer-motion'
import CheckoutForm from './CheckoutForm'
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
  return (
    <div className='flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-7 gap-x-16 my-20'>
      <motion.div className='lg:col-span-4' initial='hidden' animate='visible' variants={slideInLeft}>
        <CheckoutForm />
      </motion.div>
      <motion.div className='lg:col-span-3' initial='hidden' animate='visible' variants={slideInRight}>
        <OrderSummary />
      </motion.div>
    </div>
  )
}

export default Checkout
