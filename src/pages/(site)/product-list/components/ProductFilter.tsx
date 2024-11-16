import { Checkbox } from '@/components/ui/checkbox.tsx'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Columns2, SlidersHorizontal } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ComboboxDropdownMenu } from './ProductFilterMobile'

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

const ProductFilter = () => {
  return (
    <div className='flex flex-col w-full md:w-[262px] my-2 md:my-0'>
      <div className='sticky top-32'>
        <div className='flex justify-between items-center md:mb-8'>
          <div className='flex items-center'>
            <SlidersHorizontal className='w-6 h-6 mr-2' />
            <p className='font-semibold text-xl'>Filter</p>
            <div className='md:hidden flex items-center'>
              <ComboboxDropdownMenu />
            </div>
          </div>
          <div className='md:hidden block'>
            <button className='px-[11px] py-2 border hover:bg-[#E8ECEF] transform duration-200'>
              <Columns2 className='w-5 h-5' />
            </button>
            <button className='px-[11px] py-2 border rounded-e-sm border-l-0 hover:bg-[#E8ECEF] transform duration-200'>
              <Columns2 className='rotate-90 w-5 h-5' />
            </button>
          </div>
        </div>
        <div className='md:flex flex-col space-y-3 mb-8 hidden'>
          <p className='font-semibold uppercase'>Categories</p>
          <ScrollArea className='h-36'>
            <ul className='flex flex-col space-y-2'>
              {categories.map((category, index) => (
                <NavLink
                  to={''}
                  key={index}
                  className='text-sm font-semibold text-[#807E7E] hover:text-black hover:underline transform duration-200'
                >
                  {category}
                </NavLink>
              ))}
            </ul>
          </ScrollArea>
        </div>
        <div className='md:flex hidden flex-col space-y-4'>
          <p className='text-base font-semibold uppercase'>Price</p>
          {priceFilter.map((price, index) => (
            <div key={index} className='flex'>
              <label
                htmlFor={`checkbox-${index}`}
                className='text-sm font-semibold text-[#6C7275] hover:text-black transform duration-200 hover:cursor-pointer'
              >
                {price}
              </label>
              <Checkbox id={`checkbox-${index}`} className='ml-auto w-4 h-4 rounded mr-2' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
