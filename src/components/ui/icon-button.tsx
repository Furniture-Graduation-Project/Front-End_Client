import { cn } from '@/utils/classUtils'
import { MouseEventHandler } from 'react'

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  icon: React.ReactElement
  className?: string
}
const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full flex items-center justify-center bg-white border shadow-md p-2 transform translate-y-10 transition-all duration-500 ease-in-out hover:scale-110',
        className
      )}
    >
      {icon}
    </button>
  )
}

export default IconButton
