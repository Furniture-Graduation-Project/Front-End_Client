import { Auth } from '@/assets'
import BrandLink from '../common/BrandLink'

const AuthImage = () => {
  return (
    <div className='relative min-h-[350px] font-medium text-body-2 sm:text-lg lg:text-xl overflow-hidden flex justify-center items-center'>
      <img className='w-full h-full object-cover' src={Auth} alt='' />
      <div className='absolute top-[50px] sm:top-10 -translate-y-1/2 left-1/2 transform -translate-x-1/2'>
        <BrandLink color />
      </div>
    </div>
  )
}

export default AuthImage
