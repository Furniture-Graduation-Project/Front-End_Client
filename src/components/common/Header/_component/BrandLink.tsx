import { LogoBlack, LogoWhite } from '@/assets'
import { Link } from 'react-router-dom'

const BrandLink = ({ color }: { color: boolean }) => {
  return (
    <Link to='/' className='flex -m-1.5 p-1.5'>
      <span className='sr-only'>Logo Website</span>
      <img className='h-8 w-auto' src={color ? LogoWhite : LogoBlack} alt='Logo' />
    </Link>
  )
}

export default BrandLink
