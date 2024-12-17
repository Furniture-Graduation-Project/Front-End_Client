import AvatarAccount from '@/components/auth/AvatarAccount'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuthContext } from '@/context/AuthContext'
import { useTranslate } from '@/hooks/useTranslate'
import { CircleUserRound, Heart, KeyRound, LogIn, LogOut, ScanFace, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
  const { t } = useTranslate()
  const { user } = useAuthContext()

  return (
    <DropdownMenu modal={false}>
      {user?.avatar && (
        <>
          <DropdownMenuTrigger asChild>
            <Button variant={'null'} size={'icon'}>
              <AvatarAccount src={user?.avatar || ''} className='w-7 h-7' />
            </Button>
          </DropdownMenuTrigger>
        </>
      )}
      {!user?.avatar && (
        <>
          <DropdownMenuTrigger asChild>
            <CircleUserRound className='w-7 h-7 cursor-pointer' />
          </DropdownMenuTrigger>
        </>
      )}
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
              <Link to='/account/wishlist'>{t('header.userMenu.wishlist')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <KeyRound className='mr-2 h-4 w-4' />
              <Link to='/account/change-password'>{t('header.userMenu.changePassword')}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <Link to='/logout'>{t('header.userMenu.signOut')}</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
