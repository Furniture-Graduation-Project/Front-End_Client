import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import BrandLink from './_component/BrandLink'
import MenuHeader from './_component/MenuHeader'
import CartHeader from './_component/CartHeader'
import UserMenu from './_component/UserMenu'
import LanguageMenu from './_component/LanguageMenu'
import { motion, useScroll, useTransform } from 'framer-motion'
import NavigationLinks from './_component/NavigationLinks'

const Header = () => {
  const [search, setSearch] = useState(false)
  const { scrollY } = useScroll()
  const initialValue = 70
  const finalValue = 95
  const thresholdY = 40
  const speed = 1
  const scrollDistance = (initialValue - finalValue) / speed
  const scaleOutput = useTransform(scrollY, [0, thresholdY], [0.9, 1])
  const startY = 0
  const endY = startY + scrollDistance
  const scrollOutput = useTransform(scrollY, [startY, endY, endY], [initialValue, finalValue, finalValue], {
    clamp: false
  })

  const [isPastThreshold, setIsPastThreshold] = useState(false)

  useEffect(() => scrollY.onChange((latest) => setIsPastThreshold(latest > thresholdY)), [])
  return (
    <motion.div style={{ height: scrollOutput }}>
      <motion.div
        className='z-50 w-full top-0 sm:top-1 transition-all duration-500 ease-in-out'
        style={{ scale: scaleOutput }}
        animate={{
          position: isPastThreshold ? 'fixed' : 'relative'
        }}
      >
        <div className='w-auto mx-auto sm:container'>
          <header className={`bg-white sm:rounded-full ${isPastThreshold && 'rounded-0 shadow-2xl'}`}>
            <nav
              className='mx-auto flex items-center justify-between px-3 sm:px-4 py-1 sm:py-2 space-x-4'
              aria-label='Global'
            >
              <div className='flex lg:flex-1 items-center '>
                <MenuHeader />
                <BrandLink color />
              </div>
              <CartHeader mobile />
              <NavigationMenu className='hidden lg:flex lg:gap-x-12'>
                <NavigationLinks />
              </NavigationMenu>
              <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:items-center space-x-5 button-xs'>
                <Search className='hover:cursor-pointer' onClick={() => setSearch(true)} />
                <CommandDialog open={search} onOpenChange={setSearch}>
                  <CommandInput placeholder='Type a command or search...' />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                  </CommandList>
                </CommandDialog>
                <LanguageMenu></LanguageMenu>
                <UserMenu />
                <CartHeader mobile={false} />
              </div>
            </nav>
          </header>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Header
