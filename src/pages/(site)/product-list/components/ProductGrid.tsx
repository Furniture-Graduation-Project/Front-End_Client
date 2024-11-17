import { Check, ChevronsUpDown, Columns2, Grid3X3, LayoutGrid } from 'lucide-react'
import { useState } from 'react'

import ProductCard from '@/components/site/ProductCard'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/classUtils'

const sortBy = [
  {
    value: 'price',
    label: 'Price'
  },
  {
    value: 'name',
    label: 'Name'
  },
  {
    value: 'rating',
    label: 'Rating'
  },
  {
    value: 'popularity',
    label: 'Popularity'
  }
]

const ProductGrid = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [productNumber, setProductNumber] = useState(0)

  return (
    <>
      <div className='md:pl-6 flex-col w-full flex-grow'>
        <div className='flex justify-between h-10'>
          <p className='font-semibold text-xl'>Living Room</p>
          <div className='flex space-x-6'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant='ghost' role='combobox' aria-expanded={open}>
                  {value ? sortBy.find((sort) => sort.value === value)?.label : 'Sort By'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput placeholder='Search sort...' />
                  <CommandList>
                    <CommandEmpty>No sort found.</CommandEmpty>
                    <CommandGroup>
                      {sortBy.map((sort) => (
                        <CommandItem
                          key={sort.value}
                          value={sort.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', value === sort.value ? 'opacity-100' : 'opacity-0')} />
                          {sort.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className='pt-1 hidden md:block'>
              <button
                onClick={() => setProductNumber(4)}
                className='px-1.5 py-1 border rounded-s-sm hover:bg-[#E8ECEF] transform duration-200'
              >
                <Grid3X3 className='w-5 h-5' />
              </button>
              <button
                onClick={() => setProductNumber(3)}
                className='px-1.5 py-1 border border-l-0 hover:bg-[#E8ECEF] transform duration-200'
              >
                <LayoutGrid className='w-5 h-5' />
              </button>
              <button
                onClick={() => setProductNumber(2)}
                className='px-1.5 py-1 border border-l-0 hover:bg-[#E8ECEF] transform duration-200'
              >
                <Columns2 className='w-5 h-5' />
              </button>
              <button
                onClick={() => setProductNumber(1)}
                className='px-1.5 py-1 border rounded-e-sm border-l-0 hover:bg-[#E8ECEF] transform duration-200'
              >
                <Columns2 className='rotate-90 w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            `grid gap-6 mt-10`,
            productNumber && `grid-cols-${productNumber}`,
            !productNumber && `xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 `
          )}
        >
          {Array.from({ length: 16 }, (_, i) => (
            <ProductCard height='349px' width='262px' key={i} />
          ))}
        </div>
        <div className='flex justify-center'>
          <button className='px-10 border border-black rounded-full py-2 mt-20 hover:bg-neutral-700 hover:text-white transform duration-200'>
            Show more
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductGrid
