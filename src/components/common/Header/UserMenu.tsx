import { CircleUserRound, Heart, KeyRound, LogIn, LogOut, ScanFace, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { useTranslate } from '@/hooks/useTranslate'
import { useAuthContext } from '@/context/AuthContext'

const UserMenu = () => {
  const { t } = useTranslate()
  const { user } = useAuthContext()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <CircleUserRound className='hover:cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {!user && (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LogIn className='mr-2 h-4 w-4' />
              <Link to='/signin'>{t('header.userMenu.signIn')}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ScanFace className='mr-2 h-4 w-4' />
              <Link to='/signup'>{t('header.userMenu.signUp')}</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {user && (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <Link to='/account'>{t('header.userMenu.profile')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart className='mr-2 h-4 w-4' />
              <Link to='/profile/wishlist'>{t('header.userMenu.wishlist')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <KeyRound className='mr-2 h-4 w-4' />
              <Link to='/profile/change-password'>{t('header.userMenu.changePassword')}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <Link to='/signout'>{t('header.userMenu.signOut')}</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
