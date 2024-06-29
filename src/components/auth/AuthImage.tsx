import { Auth } from '@/assets'
import BrandLink from './BrandLink'

const AuthImage = () => {
  return (
    <div className='relative font-medium text-body-2 sm:text-lg lg:text-xl overflow-hidden flex justify-center items-center'>
      <img className='w-full h-[55vh] sm:h-full object-cover' src={Auth} alt='' />
      <BrandLink />
    </div>
  )
}

export default AuthImage
