import Container from '@/components/Container'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { useEffect, useState } from 'react'
import BrandLink from '../BrandLink'
import CartHeader from './CartHeader'
import LanguageMenu from './LanguageMenu'
import MenuHeader from './MenuHeader'
import NavigationLinks from './NavigationLinks'
import NotificationBar from './NotificationBar'
import UserMenu from './UserMenu'

const Header = () => {
  // const [search, setSearch] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {showNotification && <NotificationBar setShow={setShowNotification} />}
      <header
        className={`bg-white transition-all duration-300 ease-in-out transform ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-lg z-50 backdrop-blur-md bg-opacity-85' : 'relative z-30'
        }`}
      >
        <Container className='lg:px-0 px-8'>
          <nav className='mx-auto flex items-center justify-between py-4 lg:py-6' aria-label='Global'>
            <div className='flex lg:flex-1 items-center'>
              <MenuHeader />
              <BrandLink />
            </div>
            <div className='flex items-center justify-center gap-x-4'>
              <UserMenu mobile />
              <CartHeader mobile />
            </div>
            <NavigationMenu className='hidden lg:flex lg:gap-x-12 '>
              <NavigationLinks />
            </NavigationMenu>
            <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:items-center space-x-5'>
              {/* <Search className='hover:cursor-pointer' onClick={() => setSearch(true)} />
              <CommandDialog open={search} onOpenChange={setSearch}>
                <CommandInput placeholder={t('type')} />
                <CommandList>
                  <CommandEmpty>{t('result')}</CommandEmpty>
                </CommandList>
              </CommandDialog> */}
              <LanguageMenu />
              <UserMenu mobile={false} />
              <CartHeader mobile={false} />
            </div>
          </nav>
        </Container>
      </header>
    </>
  )
}

export default Header
