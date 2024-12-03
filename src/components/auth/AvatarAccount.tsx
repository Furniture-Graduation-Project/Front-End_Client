import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface AvatarAccountProps {
  src: string
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

const AvatarAccount = ({ src, className, children, onClick }: AvatarAccountProps) => {
  return (
    <Avatar onClick={onClick} className={className}>
      <AvatarImage src={src} alt='avatar' className='object-cover' />
      <AvatarFallback>AVA</AvatarFallback>
      {children}
    </Avatar>
  )
}

export default AvatarAccount
