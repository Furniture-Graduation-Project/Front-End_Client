import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import NavigationLink from './NavigationLink'
import { Link } from 'react-router-dom'
import { useMultipleCategoryQuery } from '@/hooks/queries/useCategoryQuery'
import { useTranslate } from '@/hooks/useTranslate'
import { Skeleton } from '@/components/ui/skeleton'

const NavigationLinks = () => {
  const { t } = useTranslate('header.menuHeader')
  const { data, isLoading, error } = useMultipleCategoryQuery()

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className='w-20 h-6' />
        ))}
      </>
    )
  }

  if (error) {
    return <p>Failed to load categories</p>
  }
  return (
    <NavigationMenuList className='gap-x-6 text-neutral-4 text-base z-50 relative'>
      <NavigationMenuItem>
        <NavigationLink title={t('home')} to='/' />
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className='bg-opacity-0'>
          <Link to={'/products'}>{t('product')}</Link>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className='grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {data?.data
              ?.filter((_, index) => index !== data.data.length - 1) // Loại bỏ phần tử cuối
              .map((category) => (
                <li key={category._id}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/products?category=${category._id}`}
                      className='block p-3 rounded-md transition-colors select-none space-y-1 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none no-underline'
                    >
                      <h3 className='text-md font-semibold'>{category.categoryName}</h3>
                      <p className='text-sm leading-snug text-muted-foreground line-clamp-2'>{category.description}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationLink title={t('holiday')} to='/products?category=6760ff41901bf655778b072d' />
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationLink title={t('blog')} to='/blog' />
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationLink title={t('contact')} to='/contact' />
      </NavigationMenuItem>
    </NavigationMenuList>
  )
}

export default NavigationLinks
