import { XCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Container from '@/components/Container'
import { useNavigate } from 'react-router-dom'
import { useTranslate } from '@/hooks/useTranslate'

export default function Failed() {
  const navigate = useNavigate()
  const { t } = useTranslate('failed')
  return (
    <Container className='flex justify-center items-center h-96'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className='bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full'
      >
        <div className='bg-red-500 p-4 flex items-center'>
          <XCircle className='text-black mr-2' size={24} />
          <h2 className='text-black text-xl font-bold'>{t('title')}</h2>
        </div>
        <div className='px-6 pb-4'>
          <p className='text-gray-700 text-base'>{t('description')}</p>
        </div>
        <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
          <Button onClick={() => navigate('/signin')}>{t('button')}</Button>
        </div>
      </motion.div>
    </Container>
  )
}
