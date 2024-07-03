import { CircleUserRound, LogIn, ScanFace } from 'lucide-react'
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

const UserMenu = () => {
  const { t } = useTranslate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound className='hover:cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
