import { useTranslate } from '@/hooks/useTranslate'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const LinkGroup = () => {
  const { t } = useTranslate('productDetail')
  return (
    <nav className='flex items-center space-x-2 text-sm text-muted-foreground mb-8'>
      <Link to='/' className='hover:text-primary'>
        {t('Home')}
      </Link>
      <ChevronRight className='h-4 w-4' />
      <Link to='/products' className='hover:text-primary'>
        {t('Shop')}
      </Link>
      <ChevronRight className='h-4 w-4' />
      <Link to='' className='hover:text-primary'>
        {t('Living Room')}
      </Link>
      <ChevronRight className='h-4 w-4' />
      <span className='text-foreground'>{t('Product')}</span>
    </nav>
  )
}

export default LinkGroup
