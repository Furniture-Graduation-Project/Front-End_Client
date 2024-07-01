import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Facebook, Heart, Instagram, Menu, Search, ShoppingBag, Youtube } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from 'react-router-dom'
import BrandLink from '../BrandLink'

const MenuHeader = () => {
  return (
    <header className='z-30 flex h-14 items-center bg-background sm:h-auto sm:border-0'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='ghost' className='lg:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side='left'
          className='w-screen max-w-md fixed flex flex-col justify-between bg-white px-6 py-6 rounded-lg'
        >
          <div className=''>
            <div className='flex items-center justify-between'>
              <BrandLink color></BrandLink>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6'>
                <div className='space-y-2 py-6 '>
                  <div className='flex items-center border px-3.5 py-2 rounded-lg'>
                    <Search strokeWidth={1} />
                    <input
                      id='search'
                      name='search'
                      type='text'
                      className='w-auto flex-auto rounded-md border-0 pl-2 caption-1 sm:leading-6 focus:outline-none'
                      placeholder='Search...'
                    />
                  </div>
                  <Link to='#' className='-mx-3 block px-3 py-2 text-base button-xs text-neutral-7 hover:bg-neutral-2'>
                    Home
                  </Link>
                  <div className='border-b border-neutral-3'></div>
                  <Link to='#' className='-mx-3 block px-3 py-2 text-base button-xs text-neutral-7 hover:bg-neutral-2'>
                    Shop
                  </Link>
                  <div className='border-b border-neutral-3'></div>
                  <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1 '>
                      <AccordionTrigger className='hover:no-underline '>Products</AccordionTrigger>
                      <AccordionContent className='pl-3 pt-5 button-xs border-b border-neutral-3'>
                        <Link to=''>All Products</Link>
                      </AccordionContent>
                      <AccordionContent className='pl-3 pt-5 button-xs'>
                        <Link to=''>Product 1</Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Link to='#' className='-mx-3 block px-3 py-2 text-base button-xs text-neutral-7 hover:bg-neutral-2'>
                    Contact Us
                  </Link>
                  <div className='border-b border-neutral-3'></div>
                </div>
              </div>
            </div>
          </div>

          <div className=''>
            <div className='mt-6 flow-root'>
              <div className='-my-6'>
                <div className='py-6 flex justify-between items-center'>
                  <Link to='#' className='-mx-3 block px-3 py-2 text-base button-xs text-neutral-4 hover:bg-neutral-2'>
                    Cart
                  </Link>
                  <div className='flex items-center'>
                    <ShoppingBag className='mr-[6px] w-[18px]' />
                    <div className='rounded-full bg-black text-white w-[20px] h-[20px] text-center leading-[20px]'>
                      2
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-b border-neutral-3 mt-1'></div>
              <div className='-my-6 '>
                <div className='mt-1 py-6 flex justify-between items-center'>
                  <Link to='#' className='-mx-3 block px-3 py-2 text-base button-xs text-neutral-4 hover:bg-neutral-2'>
                    Wishlist
                  </Link>
                  <div className='flex items-center'>
                    <Heart className='mr-[6px] w-[18px]' />
                    <div className='rounded-full bg-black text-white w-[20px] h-[20px] text-center leading-[20px]'>
                      2
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-b border-neutral-3 mt-1'></div>
              <button className='mx-auto bg-black w-full mt-5 h-[52px] rounded-lg text-white button-m'>Sign In</button>
              <div className='flex mt-4 space-x-4 *:w-5 *:h-5'>
                <Instagram />
                <Facebook />
                <Youtube />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MenuHeader
