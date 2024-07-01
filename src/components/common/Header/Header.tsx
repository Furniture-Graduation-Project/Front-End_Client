import { useState } from 'react'
import { Search } from 'lucide-react'
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import BrandLink from '../BrandLink'
import NotificationBar from './NotificationBar'
import MenuHeader from './MenuHeader'
import CartHeader from './CartHeader'
import UserMenu from './UserMenu'
import NavigationLinks from './NavigationLinks'

const Header = () => {
  const [search, setSearch] = useState(false)

  return (
    <>
      <NotificationBar />
      <div className='w-auto mx-auto container'>
        <header className='bg-white'>
          <nav className='mx-auto flex items-center justify-between py-6 ' aria-label='Global'>
            <div className='flex lg:flex-1 items-center '>
              <MenuHeader />
              <BrandLink color />
            </div>
            <CartHeader mobile />
            <NavigationMenu className='hidden lg:flex lg:gap-x-12'>
              <NavigationLinks />
            </NavigationMenu>
            <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:items-center'>
              <Search className='mr-[20px] hover:cursor-pointer' onClick={() => setSearch(true)} />
              <CommandDialog open={search} onOpenChange={setSearch}>
                <CommandInput placeholder='Type a command or search...' />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                </CommandList>
              </CommandDialog>
              <UserMenu />
              <CartHeader mobile={false} />
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Header
