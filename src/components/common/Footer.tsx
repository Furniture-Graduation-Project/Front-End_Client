import { Facebook, Instagram, Youtube } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../Container'
import { LogoFooter } from '@/assets'

const Footer = () => {
  return (
    <>
      <div className='flex sm:h-[250px] h-auto bg-neutral-6 sm:bg-neutral-7 text-neutral-1 p-10 sm:p-0'>
        <Container className='flex flex-col justify-center'>
          <div className='flex sm:justify-between sm:flex-row flex-col items-center caption-1'>
            <div className='flex flex-col sm:flex-row items-center'>
              <div className='border-b border-b-neutral-4 pb-3 sm:p-0 sm:border-none'>
                <img src={LogoFooter} className='sm:w-[124px] sm:h-[24px] sm:pr-10 ' alt='' />
              </div>
              <p className='text-center sm:text-left md:pl-10 my-5 sm:my-0 md:border-l md:border-l-neutral-4'>
                Gift & Decoration Store
              </p>
            </div>
            <div className='*:transform flex sm:flex-row flex-col items-center'>
              <NavLink className={'sm:mr-10 sm:mb-0 mb-5'} to={''}>
                Home
              </NavLink>
              <NavLink className={'sm:mr-10 sm:mb-0 mb-5'} to={''}>
                Shop
              </NavLink>
              <NavLink className={'sm:mr-10 sm:mb-0 mb-5'} to={''}>
                Product
              </NavLink>
              <NavLink className={'sm:mr-10 sm:mb-0 mb-5'} to={''}>
                Blog
              </NavLink>
              <NavLink to={''}>Contact Us</NavLink>
            </div>
          </div>
          <div className='flex justify-center items-center flex-col-reverse sm:flex-row sm:justify-between pt-3 border-t border-t-neutral-4 mt-[40px]'>
            <div className='flex sm:*:mr-6 items-center mt-5 sm:mt-0'>
              <p className='text-[12px] text-neutral-3'>Copyright © 2023 3legant. All rights reserved</p>
              <Link className='sm:block hidden' to={''}>
                Privacy Policy
              </Link>
              <Link className='sm:block hidden' to={''}>
                Terms of Use
              </Link>
            </div>
            <div className='sm:hidden block mt-5'>
              <Link className='mr-6' to={''}>
                Privacy Policy
              </Link>
              <Link className='' to={''}>
                Terms of Use
              </Link>
            </div>
            <div className='flex mt-5 sm:mt-0'>
              <Instagram className='mr-5' />
              <Facebook className='mr-5' />
              <Youtube className='mr-0' />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Footer
