import { ScrollArea } from '@/components/ui/scroll-area'
import { SlidersHorizontal } from 'lucide-react'

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

const ProductFilter = () => {
  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex'>
        <SlidersHorizontal className='w-6 h-6 mr-2' />
        <p className='font-semibold text-xl'>Filter</p>
      </div>
      <div className='flex flex-col space-y-3'>
        <p className='font-semibold uppercase'>Categories</p>
        <ScrollArea>
          <ul className='flex flex-col space-y-2'>
            {categories.map((category, index) => (
              <li key={index} className='text-sm'>
                {category}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}

export default ProductFilter
