import { useTranslate } from '@/hooks/useTranslate'
import { ChevronRight } from 'lucide-react'

const LinkGroup = () => {
  const { t } = useTranslate('productDetail')
  return (
    <nav className='flex items-center space-x-2 text-sm text-muted-foreground mb-8'>
      <a href='#' className='hover:text-primary'>
        {t('Home')}
      </a>
      <ChevronRight className='h-4 w-4' />
      <a href='#' className='hover:text-primary'>
        {t('Shop')}
      </a>
      <ChevronRight className='h-4 w-4' />
      <a href='#' className='hover:text-primary'>
        {t('Living Room')}
      </a>
      <ChevronRight className='h-4 w-4' />
      <span className='text-foreground'>{t('Product')}</span>
    </nav>
  )
}

export default LinkGroup
