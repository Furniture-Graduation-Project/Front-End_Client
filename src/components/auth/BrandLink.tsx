import { Link } from 'react-router-dom'

const BrandLink = () => {
  return (
    <Link
      to='/'
      className='absolute top-[50px] sm:top-10 -translate-y-1/2 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl'
    >
      3legant.
    </Link>
  )
}

export default BrandLink
