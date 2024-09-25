import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import NavigationLink from './NavigationLink'
import { useTranslate } from '@/hooks/useTranslate'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/classUtils'

const components = [
  {
    title: 'Alert Dialog',
    to: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.'
  },
  {
    title: 'Hover Card',
    to: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.'
  },
  {
    title: 'Progress',
    to: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
  },
  {
    title: 'Scroll-area',
    to: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.'
  },
  {
    title: 'Tabs',
    to: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
  },
  {
    title: 'Tooltip',
    to: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
  }
]

const NavigationLinks = () => {
  const { t } = useTranslate('header.menuHeader')

  return (
    <NavigationMenuList className='gap-x-6 text-neutral-4 text-base z-50 relative '>
      <NavigationMenuItem>
        <NavigationLink title={t('home')} to='/'></NavigationLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className='bg-opacity-0'>{t('product')}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
            {components.map((component, index) => (
              <li key={index}>
                <NavigationMenuLink className='hover:bg-neutral-100' asChild>
                  <Link
                    to={component.to}
                    className={cn(
                      'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors  hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                    )}
                  >
                    <div className='text-sm font-medium leading-none'>{component.title}</div>
                    <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{component.description}</p>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationLink title={t('about')} to='/about'></NavigationLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationLink title={t('contact')} to='/contact'></NavigationLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  )
}

export default NavigationLinks
