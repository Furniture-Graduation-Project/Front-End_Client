import React from 'react'
import { motion } from 'framer-motion'
import AuthImage from '@/components/auth/AuthImage'
interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='w-full flex items-center justify-center overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-fit pb-5 sm:h-screen sm:pb-0 w-full'>
        <AuthImage />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout
