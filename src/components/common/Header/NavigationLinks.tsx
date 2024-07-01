import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import NavigationLink from './NavigationLink'

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
  return (
    <NavigationMenuList className='gap-x-6 text-neutral-4 text-base'>
      <NavigationMenuItem>
        <NavigationLink title='Home' to='/'></NavigationLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationLink title='Shop' to='/shop'></NavigationLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
            {components.map((component, index) => (
              <li key={index}>
                <NavigationLink description={component.description} title={component.title} to={component.to} />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationLink title='Contact' to='/contact'></NavigationLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  )
}

export default NavigationLinks
