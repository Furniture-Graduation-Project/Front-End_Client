import BrandLink from '../common/BrandLink'

const AuthImage = () => {
  return (
    <div className='relative min-h-[350px] font-medium text-body-2 sm:text-lg lg:text-xl overflow-hidden flex justify-center items-center'>
      <video width='1920' autoPlay loop muted>
        <source src='https://cb2.scene7.com/is/content/CB2/video/Goop_HP_Dinnerware_Video.mp4' type='video/mp4' />
      </video>
      <div className='absolute top-[50px] sm:top-10 -translate-y-1/2 left-1/2 transform -translate-x-1/2'>
        <BrandLink color={true} />
      </div>
    </div>
  )
}

export default AuthImage
