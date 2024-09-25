import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface AvatarAccountProps {
  src: string
  className?: string
  children?: React.ReactNode
}

const AvatarAccount = ({ src, className, children }: AvatarAccountProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt='avatar' className='object-cover' />
      <AvatarFallback>AVA</AvatarFallback>
      {children}
    </Avatar>
  )
}

export default AvatarAccount
