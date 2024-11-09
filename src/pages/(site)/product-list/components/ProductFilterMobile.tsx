import { MoreHorizontal, Trash, X } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const categories = [
  'All Rooms',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Bathroom',
  'Dinning',
  'Outdoor',
  'Office',
  'Kids',
  'Accessories'
]

const priceFilter = ['All Price', 'Under $100', '$100 - $199', '$200 - $299', '$300 - $399', '$400 - $499', '$500+']

export function ComboboxDropdownMenu() {
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [open, setOpen] = useState(false)

  const reset = () => {
    setCategory('')
    setPrice('')
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm'>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Filter label...' autoFocus={true} />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={(value) => {
                            setCategory(value)
                            setOpen(false)
                          }}
                        >
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Price</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Filter label...' autoFocus={true} />
                  <CommandList>
                    <CommandEmpty>No price found.</CommandEmpty>
                    <CommandGroup>
                      {priceFilter.map((price) => (
                        <CommandItem
                          key={price}
                          value={price}
                          onSelect={(value) => {
                            setPrice(value)
                            setOpen(false)
                          }}
                        >
                          {price}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={reset}>
              <Trash className='w-4 h-4 mr-2 text-rose-500' />
              Clear All
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {category && (
        <Badge className='relative mr-2'>
          <button
            onClick={() => setCategory('')}
            className='absolute w-4 h-4 rounded-full bg-white -top-2 -right-2 border text-black flex items-center justify-center'
          >
            <X className='w-2 h-2' />
          </button>
          {category}
        </Badge>
      )}
      {price && (
        <Badge className='relative'>
          <button
            onClick={() => setPrice('')}
            className='absolute w-4 h-4 rounded-full bg-white -top-2 -right-2 border text-black flex items-center justify-center'
          >
            <X className='w-2 h-2' />
          </button>
          {price}
        </Badge>
      )}
    </>
  )
}
