import { LogoBlack } from '@/assets'
import { useTranslate } from '@/hooks/useTranslate'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const PaymentSuccess = ({ success }: { success: boolean }) => {
  const { t } = useTranslate('payment')

  return (
    <AnimatePresence>
      {success && (
        <div className='absolute w-full h-full bg-white top-0 left-0 flex items-center justify-center'>
          <motion.img
            className='absolute top-3 left-3'
            src={LogoBlack}
            alt='logo'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }} 
            transition={{ duration: 1 }}
          />
          <div className='text-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <CheckCircle stroke='green' strokeWidth={3} className='text-green-500 w-20 h-20 mx-auto' />
            </motion.div>
            <motion.h1
              className='text-3xl font-bold text-green mt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('paymentSuccess.successMessage')}
            </motion.h1>
            <motion.p
              className='text-gray-600 mt-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t('paymentSuccess.thankYouMessage')}
            </motion.p>
            <motion.div
              className='mt-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <button
                className='px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition'
                onClick={() => {
                  window.location.href = '/'
                }}
              >
                {t('paymentSuccess.backToHome')}
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PaymentSuccess
