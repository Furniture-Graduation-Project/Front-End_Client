import { ChevronRight } from 'lucide-react'

const LinkGroup = () => {
  return (
    <nav className='flex items-center space-x-2 text-sm text-muted-foreground mb-8'>
      <a href='#' className='hover:text-primary'>
        Home
      </a>
      <ChevronRight className='h-4 w-4' />
      <a href='#' className='hover:text-primary'>
        Shop
      </a>
      <ChevronRight className='h-4 w-4' />
      <a href='#' className='hover:text-primary'>
        Living Room
      </a>
      <ChevronRight className='h-4 w-4' />
      <span className='text-foreground'>Product</span>
    </nav>
  )
}

export default LinkGroup
