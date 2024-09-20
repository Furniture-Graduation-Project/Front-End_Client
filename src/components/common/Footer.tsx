import { Facebook, Instagram, Youtube } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../Container'
import BrandLink from './Header/_component/BrandLink'
import { useTranslate } from '@/hooks/useTranslate'

const Footer = () => {
  const { t } = useTranslate('footer')

  return (
    <div className='flex sm:h-[250px] h-auto bg-neutral-6 sm:bg-neutral-7 text-neutral-1 p-5 sm:p-0'>
      <Container className='flex flex-col justify-center'>
        {/* Top Section */}
        <div className='flex sm:justify-between sm:flex-row flex-col items-center caption-1'>
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='border-b border-b-neutral-4 pb-3 sm:p-0 sm:border-none sm:w-[124px] sm:h-[24px] sm:pr-10'>
              <BrandLink color={false} />
            </div>
            <p className='text-center sm:text-left md:pl-10 my-5 sm:my-0 md:border-l md:border-l-neutral-4'>
              {t('brand')}
            </p>
          </div>
          <div className='flex sm:flex-row flex-col items-center'>
            <NavLink className='sm:mr-10 sm:mb-0 mb-5' to='/'>
              {t('home')}
            </NavLink>
            <NavLink className='sm:mr-10 sm:mb-0 mb-5' to='/shop'>
              {t('shop')}
            </NavLink>
            <NavLink className='sm:mr-10 sm:mb-0 mb-5' to='/product'>
              {t('product')}
            </NavLink>
            <NavLink className='sm:mr-10 sm:mb-0 mb-5' to='/blog'>
              {t('blog')}
            </NavLink>
            <NavLink to='/contact'>{t('contactUs')}</NavLink>
          </div>
        </div>
        <div className='flex justify-center items-center flex-col-reverse sm:flex-row sm:justify-between text-[12px] pt-3 border-t border-t-neutral-4 mt-[40px]'>
          <div className='flex sm:mr-6 items-center mt-5 sm:mt-0 space-x-7'>
            <p className='text-[12px] text-neutral-3'>{t('copyright')}</p>
            <Link className='sm:block hidden' to='/privacy-policy'>
              {t('privacyPolicy')}
            </Link>
            <Link className='sm:block hidden' to='/terms-of-use'>
              {t('termsOfUse')}
            </Link>
          </div>
          <div className='sm:hidden block mt-5 space-y-3'>
            <Link className='mr-6' to='/privacy-policy'>
              {t('privacyPolicy')}
            </Link>
            <Link className='' to='/terms-of-use'>
              {t('termsOfUse')}
            </Link>
          </div>
          <div className='flex mt-5 sm:mt-08 space-x-5'>
            <Instagram />
            <Facebook />
            <Youtube />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
