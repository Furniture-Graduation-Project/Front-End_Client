import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/utils/classUtils'
import { NavLink } from 'react-router-dom'

const NavigationLink = (link: { title: string; to: string; description?: string }) => {
  return (
    <NavLink
      to={link.to}
      className={({ isActive, isPending }) => (isPending ? 'text-red' : isActive ? 'text-black' : '')}
    >
      <div
        className={
          link.description
            ? 'block text-[15px] font-semibold select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-opacity-0'
            : cn(navigationMenuTriggerStyle(), 'font-semibold bg-opacity-0')
        }
      >
        <div>{link.title}</div>
        <p className='line-clamp-2 font-normal leading-snug text-muted-foreground text-neutral-5'>{link.description}</p>
      </div>
    </NavLink>
  )
}

export default NavigationLink
