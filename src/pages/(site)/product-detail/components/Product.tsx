import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Heart, Minus, Plus, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
const Product = () => {
  const [selectedColor, setSelectedColor] = useState('black')
  const [quantity, setQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const colors = [
    { id: 'black', name: 'Black', value: 'bg-black' },
    { id: 'gray', name: 'Gray', value: 'bg-gray-400' },
    { id: 'red', name: 'Red', value: 'bg-red' },
    { id: 'white', name: 'White', value: 'bg-white border border-gray-200' }
  ]
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center space-x-2 '>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < 3 ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`} />
            ))}
            <span className='text-sm text-muted-foreground'>(11 Reviews)</span>
          </div>
          <h1 className='text-3xl font-bold'>Tray Table</h1>
          <p className='text-muted-foreground'>
            Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with
            removable tray top, handy for serving snacks.
          </p>
        </div>
      </div>

      <div className='flex items-baseline space-x-4'>
        <span className='text-3xl font-bold'>$199.00</span>
        <span className='text-xl text-muted-foreground line-through'>$400.00</span>
      </div>

      <div className='space-y-2'>
        <p className='text-sm text-muted-foreground'>Offer expires in:</p>
        <div className='flex space-x-4'>
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className='text-center'>
              <div className='bg-[#F3F5F7] px-3 py-2 rounded-lg'>
                <span className='text-2xl font-bold'>{value.toString().padStart(2, '0')}</span>
              </div>
              <span className='text-sm text-muted-foreground capitalize'>{key}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='space-y-4'>
        <div>
          <h3 className='font-medium mb-2'>Measurements</h3>
          <p>17 1/2×20 5/8"</p>
        </div>

        <div>
          <h3 className='font-medium mb-2 flex items-center'>
            Choose Color <ArrowRight className='w-3 h-3 ml-1' />
          </h3>
          <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className='flex space-x-4'>
            {colors.map((color) => (
              <div key={color.id} className='text-center space-y-2'>
                <RadioGroupItem value={color.id} id={color.id} className='peer sr-only' />
                <Label
                  htmlFor={color.id}
                  className='block w-8 h-8 rounded-full cursor-pointer ring-offset-2 peer-data-[state=checked]:ring-2 ring-primary'
                >
                  <span className={`block w-full h-full rounded-full ${color.value}`} />
                </Label>
                <span className='text-sm'>{color.name}</span>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className='flex items-center space-x-4'>
          <div className='flex items-center border rounded-md'>
            <Button variant='ghost' size='icon' onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Minus className='h-4 w-4' />
            </Button>
            <span className='w-12 text-center'>{quantity}</span>
            <Button variant='ghost' size='icon' onClick={() => setQuantity((q) => q + 1)}>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
          <Button className='w-full border-black' variant='outline' size='lg'>
            <Heart className='mr-2 h-4 w-4' />
            Add to Wishlist
          </Button>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <Button className='flex-1 bg-black' size='lg'>
            Add to Cart
          </Button>
        </div>
      </div>

      <Separator />

      <div className='space-y-2'>
        <div className='flex gap-x-20'>
          <span className='text-[#6C7275]'>SKU</span>
          <span>1117</span>
        </div>
        <div className='flex gap-x-10'>
          <span className='text-[#6C7275]'>Category</span>
          <span>Living Room, Bedroom</span>
        </div>
      </div>
    </div>
  )
}

export default Product
