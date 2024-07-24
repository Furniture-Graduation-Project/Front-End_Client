import React, { useState, useEffect } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import IconButton from './icon-button'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className='fixed bottom-16 lg:bottom-24 right-1 sm:right-2 md:right-3 lg:right-5 xl:right-20 z-50'>
      {isVisible && (
        <IconButton
          onClick={scrollToTop}
          className='bg-black text-white hover:bg-gray-700'
          icon={<ArrowUpIcon className='h-6 w-6' />}
        />
      )}
    </div>
  )
}

export default ScrollToTopButton
