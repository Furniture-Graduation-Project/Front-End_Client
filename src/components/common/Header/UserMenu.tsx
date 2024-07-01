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

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <CircleUserRound className='mr-[12px] hover:cursor-pointer' />
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56'>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <LogIn className='mr-2 h-4 w-4' />
          <Link to='/signin'>Sign In</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ScanFace className='mr-2 h-4 w-4' />
          <Link to='/signup'>Sign Up</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default UserMenu
