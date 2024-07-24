import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const FeatureSection = () => {
  return (
    <div className='mt-12'>
      <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-0 w-full '>
        <div className=''>
          <video width='1920' autoPlay loop muted>
            <source
              src='https://cb2.scene7.com/is/content/CB2/video/052924_OutdoorDecor_dHP_High_res.mp4'
              type='video/mp4'
            />
          </video>
        </div>
        <div className='bg-[#F3F5F7] flex items-center md:py-16 lg:py-0 p-[32px]'>
          <div className='ml-0 sm:ml-14'>
            <h1 className='font-medium text-[34px] sm:text-[48px] leading-tight mb-3 tracking-wider'>About Us</h1>
            <p className='sm:text-[16px] mb-6 tracking-wider'>
              3legant is a gift & decorations store based in HCMC, <br /> Vietnam. Est since 2019. <br />
              Our customer service is always prepared to <br /> support you 24/7
            </p>
            <div className='underline flex items-center transition duration-500 ease-in-out transform hover:translate-x-2 hover:opacity-70 '>
              <Link className='font-medium' to=''>
                Shop Now
              </Link>
              <ArrowRight className='ml-1 h-4 w-4' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection
