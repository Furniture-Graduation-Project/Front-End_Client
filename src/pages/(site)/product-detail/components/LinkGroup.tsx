import { useTranslate } from '@/hooks/useTranslate'
import { ChevronRight } from 'lucide-react'

const LinkGroup = () => {
  const { t } = useTranslate('productDetail')
  return (
    <nav className='flex items-center space-x-2 text-[10px] sm:text-base text-muted-foreground mb-8'>
      <a href='#' className='hover:text-primary whitespace-nowrap'>
        {t('Home')}
      </a>
      <ChevronRight className='h-4 w-4' />
      <a href='#' className='hover:text-primary whitespace-nowrap'>
        {t('Shop')}
      </a>
      <ChevronRight className='h-4 w-4' />
      <a href='#' className='hover:text-primary whitespace-nowrap'>
        {t('Living Room')}
      </a>
      <ChevronRight className='h-4 w-4' />
      <span className='text-foreground whitespace-nowrap'>{t('Product')}</span>
    </nav>
  )
}

export default LinkGroup
